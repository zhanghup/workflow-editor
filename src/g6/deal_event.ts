import {IGroup} from "@antv/g-base";
import zpx from "zpx";
import {CustomAttr, ShapeType} from "../lib/types";
import {IShape} from "@antv/g6";

export function getCanvas(target: any): any {
    let parent = target.getParent()
    if (!parent) {
        return target
    }
    return getCanvas(parent)
}

export function findAllGroup(groups: IGroup[]): IGroup[] {
    if (!groups || groups.length == 0) {
        return []
    }

    let result: IGroup[] = []

    for (let o of groups) {
        result.push(o)
        result.push(...findAllGroup(o.cfg.children || []))
    }
    return result
}

export function showAllAnchorIn(e: any, show: boolean) {
    let canvas = getCanvas(e.target)
    let groups = findAllGroup(zpx.val(canvas, "cfg.children") || []) as IGroup[]
    for (let group of groups) {
        if (group.get(CustomAttr.BType) != ShapeType.CustomGroup) {
            continue
        }

        let children = group.getChildren() as IShape[]
        for (let shape of children) {
            // 要消失，那就所有锚点都消息
            if (!show && [ShapeType.AnchorOutPoint, ShapeType.AnchorInPoint].indexOf(shape.get(CustomAttr.BType)) > -1) {
                shape.hide()
                continue
            }

            // 只显示接入点
            if (show && shape.get(CustomAttr.BType) == ShapeType.AnchorInPoint) {
                shape.show()
            }
        }
    }
}