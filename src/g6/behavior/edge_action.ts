import G6, {INode, IShape, IEdge} from '@antv/g6';
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

/*
// 响应状态变化
    setState(name, value, item) {
        if (!item) {
            return
        }
        if (typeof value == "string") {
            return
        }
        const group = item.getContainer();
        const shape = group.get('children')[0];
        if (name === 'active') {
            if (value) {
                shape.attr('stroke', 'steelblue');
            } else {
                shape.attr('stroke', '#333');
            }
        }
        if (name === 'selected') {
            if (value) {
                shape.attr('lineWidth', 3);
            } else {
                shape.attr('lineWidth', 1);
            }
        }
    },
 */

interface ICurrent {
    id: string
    attrs: Record<string, any>
}

const current = ref<ICurrent | null>(null)

// Custom a type of Behavior
G6.registerBehavior(GraphBehavior.edgeAction, {
    currentXY: [0, 0],
    getEvents() {
        return {
            "edge:click": "edgeClick",
            "edge:mouseenter": "edgeMouseEnter",
            "edge:mouseleave": "edgeMouseLeave",
            "node:mousedown": "onMousedown",
            'mousemove': 'onMousemove',
            'mouseup': 'onMouseup',
        };
    },
    edgeClick(e: any) {
        let edge = e.item as IEdge
        if (edge.get(cttrs.BType) != ElementType.typeEdge) {
            return
        }
        let uuid = edge.get(cttrs.UUID) as string

        let shape = e.shape as IShape

    },
    edgeMouseEnter(e: any) {
        let edge = e.item as IEdge
        if (edge.get(cttrs.BType) != ElementType.typeEdge) {
            return
        }
        let uuid = edge.get(cttrs.UUID) as string

        let shape = e.target as IShape
        current.value = {
            id: uuid,
            attrs: shape.attr()
        }

        shape.attr({
            stroke: "red",
            lineWidth: 5,
        })
    },
    edgeMouseLeave(e: any) {
        let edge = e.item as IEdge
        if (edge.get(cttrs.BType) != ElementType.typeEdge) {
            return
        }

        let shape = e.target as IShape
        if (current.value) {
            shape.attr(current.value.attrs)
        }
        current.value = null
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


