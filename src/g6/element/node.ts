import G6, {IShape} from '@antv/g6';
import {ModelConfig} from "@antv/g6-core/lib/types";
import {IGroup} from "@antv/g-base";
import {Item, INode} from "@antv/g6-core/lib/types";
import {ShapeType, CustomAttr} from "../../lib/types";
import zpx from "zpx";

const defaultShapeAttr = {
    stroke: '#CED4D9',
    fill: '#FFFFFF',
    shadowOffsetX: 0,
    shadowOffsetY: 4,
    shadowBlur: 10,
    shadowColor: 'rgba(13, 26, 38, 0.08)',
    lineWidth: 1,
    radius: 4,
    strokeOpacity: .7,
}

const defaults = {
    getAnchorPoints(cfg?: ModelConfig) {
        if (!cfg) {
            return
        }

        let ins = (cfg.inPoints || []) as number[][]
        let outs = (cfg.outPoints || []) as number[][]

        return [...ins, ...outs]
    }
}

interface ICustomAttr {
    width: number
    height: number
    cursor?: string
}

type addShape = (attr: ICustomAttr) => IShape[]
type addMainShape = (attr: ICustomAttr) => IShape

G6.registerNode('step-start', {
        ...defaults,
        drawShape: function (cfg, group) {
            if (!group) {
                return {} as any
            }
            return defaultStep(group, cfg, function (attr) {
                let width = attr.width * 0.4
                let height = attr.height * 0.4
                let w = height / 2 * 1.732

                return [group.addShape('polygon', {
                    attrs: {
                        fill: '#FA8C16',
                        width,
                        height,
                        points: [
                            [-w * (1 / 3), -height / 2],
                            [w * (2 / 3), 0],
                            [-w * (1 / 3), height / 2],
                        ],
                        cursor: "move"
                    },
                    draggable: true,
                })]
            })
        },
    }, "single-node"
);

G6.registerNode('step-end', {
        ...defaults,
        drawShape: function (cfg, group) {
            if (!group) {
                return {} as any
            }

            return defaultStep(group, cfg, function (attr) {
                let width = attr.width * 0.35
                let height = attr.height * 0.35

                return [group.addShape('rect', {
                    attrs: {
                        fill: '#FA8C16',
                        width,
                        height,
                        x: -width / 2,
                        y: -height / 2,
                        cursor: "move"
                    },
                    draggable: true,
                })]
            })
        },
    }, "single-node"
);

G6.registerNode('flow-task', {
        ...defaults,
        drawShape: function (cfg, group) {
            if (!group) {
                return {} as any
            }
            return defaultFlow(group, cfg, () => {
                return []
            })
        },
    }, "single-node"
);

G6.registerNode('flow-user', {
        ...defaults,
        drawShape: function (cfg, group) {
            if (!group) {
                return {} as any
            }
            return defaultFlow(group, cfg, () => {
                return []
            })
        },
    }, "single-node"
);

G6.registerNode('gateway-parallel', {
        ...defaults,
        drawShape: function (cfg, group) {
            if (!group) {
                return {} as any
            }
            return defaultGateway(group, cfg, function (attr) {
                let width1 = attr.width * 0.45
                let height1 = 2
                let width2 = 2
                let height2 = attr.height * 0.45

                return [
                    group.addShape('rect', {
                        attrs: {
                            fill: '#13C2C2',
                            width: width1,
                            height: height1,
                            x: attr.width / 2 - width1 / 2,
                            y: attr.height / 2 - height1 / 2,
                            cursor: "move"
                        },
                        draggable: true,
                    }),
                    group.addShape('rect', {
                        attrs: {
                            fill: '#13C2C2',
                            width: width2,
                            height: height2,
                            x: attr.width / 2 - width2 / 2,
                            y: attr.height / 2 - height2 / 2,
                            cursor: "move"
                        },
                        draggable: true,
                    })
                ]
            })
        },
    }, "single-node"
);

G6.registerNode('gateway-mutex', {
        ...defaults,
        drawShape: function (cfg, group) {
            if (!group) {
                return {} as any
            }
            return defaultGateway(group, cfg, function (attr) {
                let width = attr.width
                let height = attr.height
                let centerX = width / 2
                let centerY = height / 2

                let x = 1.5

                let w = width * 0.35
                let h = height * 0.35

                return [group.addShape('polygon', {
                    attrs: {
                        fill: '#13C2C2',
                        points: [
                            [centerX - x, centerY],
                            [centerX - w / 2, centerY - h / 2 + x],
                            [centerX - w / 2 + x, centerY - h / 2],
                            [centerX, centerY - x],
                            [centerX + w / 2 - x, centerY - h / 2],
                            [centerX + w / 2, centerY - h / 2 + x],
                            [centerX + x, centerY],
                            [centerX + w / 2, centerY + h / 2 - x],
                            [centerX + w / 2 - x, centerY + h / 2],
                            [centerX, centerY + x],
                            [centerX - w / 2 + x, centerY + h / 2],
                            [centerX - w / 2, centerY + h / 2 - x],
                        ],
                        cursor: "move"
                    },
                    draggable: true,
                })]
            })
        },
    }, "single-node"
);


function defaultStep(group: IGroup, cfg?: ModelConfig, fn?: addShape) {
    return defaultNode(group, "#FA8C16", function (attrs) {
        return group.addShape('circle', {
            attrs: {
                ...defaultShapeAttr,
                ...attrs,
                fill: '#FEF7E8',
                stroke: '#FA8C16',
                r: attrs.width / 2,
            },
            draggable: true,
        });
    }, cfg, fn, true)


}

function defaultFlow(group: IGroup, cfg?: ModelConfig, fn?: addShape) {
    return defaultNode(group, '#1890FF', function (attrs) {
        return group.addShape('rect', {
            attrs: {
                ...defaultShapeAttr,
                ...attrs,
                fill: '#E7F7FE',
                stroke: '#1890FF',
            },
            draggable: true,
        });
    }, cfg, fn)
}

function defaultGateway(group: IGroup, cfg?: ModelConfig, fn?: addShape) {
    return defaultNode(group, '#13C2C2', function (attrs) {
        let w = attrs.width
        let h = attrs.height
        return group.addShape('polygon', {
            attrs: {
                ...defaultShapeAttr,
                ...attrs,
                fill: '#E8FEFA',
                stroke: '#13C2C2',
                points: [
                    [0, w / 2],
                    [h / 2, w],
                    [h, w / 2],
                    [h / 2, 0],
                ],
            },
            draggable: true,
        });
    }, cfg, fn)

}

function defaultNode(group: IGroup, anchorColor: string, fn: addMainShape, cfg?: ModelConfig, fns?: addShape, anchorOffset?: boolean): IShape {
    let uuid = zpx.uuid()
    group.set(CustomAttr.BType, ShapeType.CustomGroup)
    group.set(CustomAttr.UUID, uuid)

    let attrs = getStyle(cfg)
    let shapes = [fn(attrs)]
    if (fns) {
        shapes.push(...fns(attrs))
    }

    for (let o of shapes) {
        o.set(CustomAttr.BType, ShapeType.CustomShape)
        o.set(CustomAttr.UUID, uuid)
    }

    let anchors = defaultAnchor(group, attrs, cfg, anchorColor, anchorOffset)
    for (let o of anchors) {
        o.set(CustomAttr.UUID, uuid)
    }
    group.sort()
    return shapes[0]
}


function defaultAnchor(group: IGroup, attr: ICustomAttr, cfg?: ModelConfig, color: string = "#1890ff", offset = false): IShape[] {
    if (!cfg) {
        return []
    }

    // 此处必须有偏移 不然drag-node错位
    const offsetX = offset ? -attr.width / 2 : 0
    const offsetY = offset ? -attr.height / 2 : 0

    let shapes: IShape[] = []

    if (cfg.inPoints) {
        let inPoints = cfg.inPoints as number[][]

        for (let i = 0; i < inPoints.length; i++) {
            let x = attr.width * inPoints[i][0];
            let y = attr.height * inPoints[i][1];

            let s = group.addShape("circle", {
                attrs: {
                    x: x + offsetX,
                    y: y + offsetY,
                    r: 4,
                    fill: color,
                    cursor: "crosshair",
                },
                visible: false,
            })
            s.set(CustomAttr.BType, ShapeType.AnchorInPoint)
            shapes.push(s)
        }
    }

    if (cfg.outPoints) {
        let outPoints = cfg.outPoints as number[][]
        for (let i = 0; i < outPoints.length; i++) {
            let x = attr.width * outPoints[i][0];
            let y = attr.height * outPoints[i][1];

            let s = group.addShape("circle", {
                attrs: {
                    x: x + offsetX,
                    y: y + offsetY,
                    r: 4,
                    fill: "#fff",
                    stroke: color,
                    cursor: "crosshair",
                },
                visible: false,
            })
            s.set(CustomAttr.BType, ShapeType.AnchorOutPoint)
            shapes.push(s)
        }
    }

    return shapes
}


function getStyle(cfg?: ModelConfig): ICustomAttr {
    let width = 64
    let height = 64


    if (cfg) {
        if (typeof cfg.size == 'number') {
            width = cfg.size
            height = cfg.size
        } else if (cfg.size instanceof Array) {
            if (cfg.size.length == 1) {
                width = cfg.size[0]
                height = cfg.size[0]
            } else if (cfg.size.length > 1) {
                width = cfg.size[0]
                height = cfg.size[1]
            }
        }
    }

    return {width, height, cursor: "move"}
}

