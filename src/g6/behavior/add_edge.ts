import G6, {IItemBase, IShape, G6Event, IEdge} from '@antv/g6';
import {Events, GraphBehavior, GraphMode, ShapeType, NodeEvent, CustomAttr} from "../../lib/types";
import zpx from "zpx";
import {showAllAnchorIn} from "../deal_event";
import {ref} from "vue";

interface ISourceEdge {
    node: IItemBase
    anchor: IShape
}

let sourceEdge = ref<ISourceEdge | null>()
let sourceEdgeInfo = ref<IEdge | null>()

// Custom a type of Behavior
G6.registerBehavior(GraphBehavior.AddEdge, {
    currentXY: [0, 0],
    getEvents() {
        return {
            "node:mousedown": "onMousedown",
            'mousemove': 'onMousemove',
            'mouseup': 'onMouseup',
        };
    },
    onMousedown(e: any) {
        if (!e.target) {
            return
        }
        let shape = zpx.val(e, "target") as IShape
        switch (shape.get(CustomAttr.BType)) {
            case ShapeType.AnchorInPoint:
                break
            case ShapeType.AnchorOutPoint:
                if (!sourceEdge.value) {
                    zpx.emit(Events.GraphModeChange, GraphMode.EditEdge)

                    showAllAnchorIn(e, true)
                    sourceEdge.value = {
                        node: zpx.val(e, "item"),
                        anchor: shape,
                    }
                    // sourceEdgeInfo.value =
                }
                break
        }
    },
    beforeDrag(e: any) {

    },
    onMousemove(e: any) {

    },
    onMouseup(e: any) {
        showAllAnchorIn(e, false)
        zpx.emit(Events.GraphModeChange, GraphMode.Default)

        if (sourceEdge.value == null) {
            return
        }

        let shape = zpx.val(e, "target") as IShape
        if (shape.get(CustomAttr.BType) != ShapeType.AnchorInPoint) {
            sourceEdge.value = null
            return
        }

        let source = sourceEdge.value.node as IItemBase
        let target = zpx.val(e, "item") as IItemBase
        zpx.emit(Events.EdgeAdd, {
            source: source._cfg?.model?.id,
            target: target._cfg?.model?.id,
        })

        sourceEdge.value = null
    }
});


