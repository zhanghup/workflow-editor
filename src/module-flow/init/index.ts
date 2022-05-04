import "./register"
import {Ref, SetupContext} from "vue";
import graph from "./graph";
import {StepNode} from "../type";
import {Graph, INode} from "@antv/g6";

export default function (props: any, ctx: SetupContext) {

    let container = graph(props, ctx)

    return {
        ...container,
        OnAdd: OnAdd(container.graph as Ref<Graph>)
    };
}

function OnAdd(g: Ref<Graph>) {
    return (e: DragEvent, item: StepNode) => {
        if (g.value) {
            let point = g.value.getPointByClient(e.x, e.y)

            let node = g.value.addItem("node", {
                ...point,
                type: item.type,
                config: item
            }) as INode;
        }
    }
}