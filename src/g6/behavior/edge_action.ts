import G6, {INode, IShape, IEdge, Edge} from '@antv/g6';
import {Events, GraphBehavior, GraphMode, ElementType, cttrs} from "../../lib/types";
import zpx from "zpx";
import {getGraph, showAllAnchorIn} from "../actions";
import {ref} from "vue";

interface ISourceEdge {
    node: INode
    anchor: IShape
}

let sourceEdge = ref<ISourceEdge | null>()
let sourceEdgeInfo = ref<IShape | null>()

// Custom a type of Behavior
G6.registerBehavior(GraphBehavior.edgeAction, {
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
        switch (shape.get(cttrs.BType)) {
            case ElementType.anchorInPoint:
                break
            case ElementType.anchorOutPoint:
                if (!sourceEdge.value) {
                    zpx.emit(Events.GraphModeChange, GraphMode.edgeAdd)
                    let node = zpx.val(e, "item") as INode

                    let uuid = ""
                    if (node._cfg?.group) {
                        uuid = node._cfg?.group.get(cttrs.UUID)
                    }
                    showAllAnchorIn(e, uuid, true)
                    sourceEdge.value = {
                        node,
                        anchor: shape,
                    }
                }
                break
        }
    },
    onMousemove(e: any) {
        if (sourceEdge.value == null) {
            return
        }

        if (sourceEdgeInfo.value == null) {
            let graph = getGraph(e)
            if (!graph) {
                return
            }

            sourceEdgeInfo.value = graph.getGroup().addShape("path", {
                attrs: {
                    endArrow: true,
                    path: [
                        ['M', 0, 0],
                        ['L', 0, 0],
                    ],
                    lineDash: [3, 3],
                    stroke: '#aaa',
                    lineWidth: 2,
                    lineAppendWidth: 5,
                },
                sx: e.x,
                sy: e.y,
                name: 'path-shape',
            })
        }

        let sx = sourceEdgeInfo.value?.get("sx")
        let sy = sourceEdgeInfo.value?.get("sy")

        const rn = 4
        let rx = 0
        let ry = 0
        if (e.x - sx != 0) {
            rx = e.x - sx > 0 ? -rn : rn
        }
        if (e.y - sy != 0) {
            ry = e.y - sy > 0 ? -rn : rn
        }

        const start = ["M", sx, sy]
        const end = ["L", e.x + rx, e.y + ry]

        sourceEdgeInfo.value.attr({
            path: [start, end]
        })

    },
    onMouseup(e: any) {
        if (sourceEdgeInfo.value) {
            sourceEdgeInfo.value?.remove()
            sourceEdgeInfo.value = null
        }

        showAllAnchorIn(e, "", false)

        zpx.emit(Events.GraphModeChange, GraphMode.default)

        if (sourceEdge.value == null) {
            return
        }

        let shape = zpx.val(e, "target") as IShape
        if (shape.get(cttrs.BType) != ElementType.anchorInPoint) {
            sourceEdge.value = null
            return
        }

        let source = sourceEdge.value.node as INode
        let target = zpx.val(e, "item") as INode
        zpx.emit(Events.EdgeAdd, {
            type: ElementType.edge,
            source: source._cfg?.model?.id,
            target: target._cfg?.model?.id,
        })

        sourceEdge.value = null
    }
});


