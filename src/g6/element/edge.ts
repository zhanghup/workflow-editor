import G6, {IShape, INode, IPoint} from '@antv/g6';
import {ModelConfig} from "@antv/g6-core/lib/types";
import {IGroup} from "@antv/g-base";
import {ElementType, cttrs} from "../../lib/types";
import zpx from "zpx";

G6.registerEdge(ElementType.edge, {
    // draw: function (cfg, group) {
    //     if (!cfg || !group || !cfg.startPoint || !cfg.endPoint) {
    //         return {} as any
    //     }
    //
    //     const startPoint = cfg.startPoint;
    //     const endPoint = cfg.endPoint;
    //
    //     const stroke = (cfg.style && cfg.style.stroke) || this.options.style.stroke;
    //     const startArrow = (cfg.style && cfg.style.startArrow) || undefined;
    //     const endArrow = (cfg.style && cfg.style.endArrow) || undefined;
    //
    //     const keyShape = group.addShape('path', {
    //         attrs: {
    //             path: [
    //                 ['M', startPoint.x, startPoint.y],
    //                 ['L', endPoint.x / 3 + (2 / 3) * startPoint.x, startPoint.y],
    //                 ['L', endPoint.x / 3 + (2 / 3) * startPoint.x, endPoint.y],
    //                 ['L', endPoint.x, endPoint.y],
    //             ],
    //             stroke,
    //             lineWidth: 1,
    //             startArrow,
    //             endArrow,
    //         },
    //         className: 'edge-shape',
    //         name: 'edge-shape',
    //     });
    //     return keyShape;
    // },
    getPathPoints: (cfg: ModelConfig) => {
        return cfg
    }
}, "polyline")

