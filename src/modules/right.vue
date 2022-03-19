<template>
  <Panel direct="right" title="属性">
    <div class="z-right">
      <div class="z-content">

      </div>
      <Panel class="z-mini-canvas" title="导航器">
        <Minimap class="z-minimap"/>
      </Panel>
    </div>
  </Panel>
</template>
<script lang="ts">
import {defineComponent} from 'vue'
import Panel from "../components/panel"
import Minimap from "./minimap.vue"


export default defineComponent({
  components: {Panel, Minimap},
  props: {},
  setup(props) {
    return {}
  }
})

</script>
<style lang="less" scoped>
.z-right {
  display: flex;
  flex-direction: column;
  height: 100%;

  .z-content {
    flex-grow: 1;
  }

  .z-mini-canvas {
    height: 250px;
  }
}
</style>