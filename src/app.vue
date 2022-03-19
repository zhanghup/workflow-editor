<template>
  <div class="workflow-editor">
    <Toolbar/>
    <div class="wcontent">
      <Left></Left>
      <div ref="container" class="container"></div>
      <Right></Right>
    </div>
  </div>
</template>
<script lang="ts">
import {defineComponent} from "vue";
import Toolbar from "./modules/toolbar.vue"
import Left from "./modules/left.vue"
import Right from "./modules/right.vue"
import InitGraph from "./graph"
import DoEvent from "./lib/event"
import "./g6"

export default defineComponent({
  name: "WorkflowEditor",
  components: {Toolbar, Left, Right},
  props: {},
  setup(props) {
    let {container, graph} = InitGraph()
    DoEvent(graph)

    return {
      container, graph,
    }
  }
})


</script>

<style lang="less" scoped>
.workflow-editor {
  display: flex;
  height: 100%;
  flex-direction: column;

  .wcontent {
    display: flex;
    flex-grow: 1;
    z-index: 1;

    .container {
      flex-grow: 1;
    }
  }

}

</style>