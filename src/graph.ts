import G6, {Graph} from "@antv/g6";
import {ref, watch} from "vue";
import {GraphBehavior, GraphMode, NodeEvent} from "./lib/types";
import {stepAttr} from "./g6/element/node_types";

export default function InitGraph() {
    let container = ref<HTMLDivElement>()
    let graph = ref<Graph | null>()


    watch(container, (v) => {
        if (!v) {
            return
        }
        graph.value = init(v)

    })

    return {
        container, graph
    }
}

function init(container: HTMLDivElement) {
    let graph = new G6.Graph({
        container: container,
        height: container.clientHeight - 4,
        width: container.clientWidth - 4,
        modes: {
            [GraphMode.Default]: [
                "drag-canvas",
                'drag-node',
                "zoom-canvas",
                "hover-node",
                GraphBehavior.AddEdge,
                GraphBehavior.HoverNode,
            ],
            [GraphMode.EditEdge]: [GraphBehavior.AddEdge]
        },
        layout: {
            type: 'radial',
            unitRadius: 50,
            center: [500, 300],
        },

        defaultNode: {
            type: 'flow',
            labelCfg: {},
            linkPoints: {
                top: true,
                right: true,
                bottom: true,
                left: true,
            },
        },
        defaultEdge: {
            type: 'polyline',
            size: 1,
            color: '#b7b3b3',
            style: {
                endArrow: {
                    path: 'M 0,0 L 8,4 L 8,-4 Z',
                    fill: '#989090',
                },
                radius: 20,
            },
        },
        fitView: true,
    });

    setTimeout(() => {
        graph.add("node", {...stepAttr("step-start"), x: 100, y: 100})
        graph.add("node", {...stepAttr("step-end"), x: 300, y: 100})
        graph.add("node", {...stepAttr("flow-task"), x: 500, y: 100})
        graph.add("node", {...stepAttr("flow-user"), x: 100, y: 300})
        graph.add("node", {...stepAttr("gateway-mutex"), x: 300, y: 300})
        graph.add("node", {...stepAttr("gateway-parallel"), x: 500, y: 300})
    }, 1000)

    graph.render()
    return graph
}
