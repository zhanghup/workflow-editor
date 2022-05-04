import G6 from "@antv/g6";
import {Item, ModelConfig} from "@antv/g6-core/lib/types";
import {IGroup, IShape} from "@antv/g-base";
import {StepNode} from "../type";


G6.registerNode("c-image", {
    setState(name?: string, value?: string | boolean, item?: Item) {
        // if (name == "selected" && value !== undefined) {
        // }
        // console.log(name, value, item)
    },

    draw: (cfg?: ModelConfig, group?: IGroup) => {
        if (!cfg || !group) {
            return {} as IShape
        }

        switch ((cfg.config as StepNode).imgType) {
            case "rect":
                return drawRect(cfg, group)
            case "circle":
                return drawCircle(cfg, group)
            case "diamond":
                return drawDiamond(cfg, group)
        }
    }
})

function drawRect(cfg: ModelConfig, group: IGroup) {
    let config = cfg.config as StepNode

    group.addShape('image', {
        attrs: {
            x: -config.width / 2,
            y: -config.height / 2,
            width: config.width,
            height: config.height,
            img: config.img,
        },
        name: 'image-shape',
    });

    return group.addShape('rect', {
        attrs: {
            x: -config.width / 2,
            y: -config.height / 2,
            width: config.width,
            height: config.height,
        },
        name: 'rect-shape',
    });
}

function drawCircle(cfg: ModelConfig, group: IGroup) {
    let config = cfg.config as StepNode

    group.addShape('image', {
        attrs: {
            x: -config.width / 2,
            y: -config.height / 2,
            width: config.width,
            height: config.height,
            img: config.img,
        },
        name: 'image-shape',
    });

    return group.addShape('circle', {
        attrs: {
            r: config.width / 2,
        },
        name: 'circle-shape',
    });
}

function drawDiamond(cfg: ModelConfig, group: IGroup) {
    let config = cfg.config as StepNode

    group.addShape('image', {
        attrs: {
            x: -config.width / 2,
            y: -config.height / 2,
            width: config.width,
            height: config.height,
            img: config.img,
        },
        name: 'image-shape',
    });

    return group.addShape('polygon', {
        attrs: {
            x: -config.width / 2,
            y: -config.height / 2,
            points: [
                [0, -config.height / 2],
                [config.width / 2, 0],
                [0, config.height / 2],
                [-config.width / 2, 0],
            ],
        },
        name: 'polygon-shape',
    });
}