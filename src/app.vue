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
import {ElConfigProvider} from 'element-plus'
import {defineComponent} from "vue";
import Toolbar from "./modules/toolbar.vue"
import Left from "./modules/left.vue"
import Right from "./modules/right.vue"
import InitGraph from "./index"
import DoEvent from "./lib/event"
import "./g6"
import zpx from "zpx";

export default defineComponent({
  name: "WorkflowEditor",
  components: {ElConfigProvider, Toolbar, Left, Right},
  props: {},
  setup(props) {
    let {container, graph} = InitGraph()
    DoEvent(graph as any)

    return {
      container,
    }
  }
})


</script>

<style lang="less">
.workflow-editor {
  display: flex;
  height: 100%;
  flex-direction: column;
  font-size: 14px;
}
</style>
<style lang="less" scoped>
.workflow-editor {
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