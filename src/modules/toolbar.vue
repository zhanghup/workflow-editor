<template>
<!--  <div class="z-toolbar">-->
  <!--    <div class="z-body" ref="toolbar"></div>-->
  <!--  </div>-->
</template>
<script lang="ts">
import {defineComponent, ref, watch} from "vue";
import G6 from "@antv/g6";
import zpx from "zpx"
import {Events} from "../lib/types";

export default defineComponent({
  setup() {
    // let toolbar = ref()
    // watch(toolbar, (v: HTMLDivElement) => {
    //   const plugin = new G6.ToolBar({
    //     container: v,
    //   });
    //
    //   zpx.emit(Events.PluginToolbarRegister, plugin)
    // })
    //
    // return {
    //   toolbar
    // }

  }
})
</script>
<style lang="less" scoped>
.z-toolbar {
  height: 34px;

  .z-body {
    height: 100%;
  }
}
</style>