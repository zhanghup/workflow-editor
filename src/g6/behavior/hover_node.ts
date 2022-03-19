import G6, {IItemBase, IShape, G6Event} from '@antv/g6';
import {Events, GraphBehavior, GraphMode, ShapeType, NodeEvent, CustomAttr} from "../../lib/types";
import zpx from "zpx";
import {IGroup} from "@antv/g-base";

// Custom a type of Behavior
G6.registerBehavior(GraphBehavior.HoverNode, {
    currentXY: [0, 0],
    getEvents() {
        return {
            [G6Event.NODE_MOUSEENTER]: "onMouseenter",
            [G6Event.NODE_MOUSEOUT]: "onMouseout",
        };
    },
    onMouseenter(e: any) {
        AnchorVisible(e, true)
    },

    onMouseout(e: any) {
        AnchorVisible(e, false)
    },
});


function AnchorVisible(e: any, show: boolean) {
    let {item} = e
    if (!item) {
        return
    }

    if (!show && e.toShape) {
        return
    }

    let group = zpx.val(item, "_cfg.group") as IGroup

    if (group.get(CustomAttr.BType) != ShapeType.CustomGroup) {
        return;
    }

    let shapes = zpx.val(group, "cfg.children") || []
    let anchors = shapes.filter((r: IShape) => r.get(CustomAttr.BType) == ShapeType.AnchorOutPoint) as IShape[]
    for (let o of anchors) {
        if (show) {
            o.show()
        } else {
            o.hide()
        }
    }
}