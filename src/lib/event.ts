import {ref, Ref, watch} from "vue";
import G6, {Graph} from "@antv/g6";
import {PluginBase} from "@antv/g6-plugin"
import zpx from "zpx";
import {Events, GraphMode} from "./types";
import {ModelConfig} from "@antv/g6-core/lib/types";
import {IGroup} from "@antv/g-base";


export default function DoEvent(graph: Ref<Graph | null>) {
    let pluginGrid = ref<PluginBase>(new G6.Grid())
    let pluginMinimap = ref<PluginBase | null>()
    let pluginToolbar = ref<PluginBase | null>()
    let pluginSnapLine = ref<PluginBase>(new G6.SnapLine({itemAlignType: true}))

    // 小地图插件注册
    zpx.on(Events.PluginMinimapRegister, (v: PluginBase) => {
        pluginMinimap.value = v
    })
    // 工具栏插件注册
    zpx.on(Events.PluginToolbarRegister, (v: PluginBase) => {
        pluginToolbar.value = v
    })

    // 刷新画板
    zpx.on(Events.DataRefresh, () => {
        if (!graph.value) {
            return
        }
        graph.value.refresh()
    })

    // 添加元素
    zpx.on(Events.NodeAdd, (v: ModelConfig) => {
        if (!graph.value) {
            return
        }
        graph.value.add("node", v)
    })
    // 添加元素
    zpx.on(Events.NodeAddPx, (v: ModelConfig) => {
        if (!graph.value) return

        let {x, y} = v
        let point = graph.value.getPointByClient(x as number, y as number)
        v.x = point.x
        v.y = point.y
        graph.value.add("node", v)
    })

    // 添加线条
    zpx.on(Events.EdgeAdd, (v: ModelConfig) => {
        if (!graph.value) {
            return
        }
        graph.value.add("edge", v)
    })

    // 切换模式
    zpx.on(Events.GraphModeChange, (v: GraphMode) => {
        if (!graph.value) {
            return
        }
        graph.value.setMode(v)
    })

    watch(graph, (v) => {
        if (!v) {
            return
        }
        v.addPlugin(pluginGrid.value as PluginBase)
        v.addPlugin(pluginSnapLine.value as PluginBase)
        if (pluginMinimap.value) {
            v.addPlugin(pluginMinimap.value as PluginBase)
        }
        if (pluginToolbar.value) {
            v.addPlugin(pluginToolbar.value as PluginBase)
        }
    })
}