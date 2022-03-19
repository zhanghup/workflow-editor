<template>
  <Panel direct="left" title="组件">
    <Step></Step>
  </Panel>
</template>
<script lang="ts">
import {defineComponent} from 'vue'
import Panel from "../components/panel"
import Step from "./steps"
import zpx from "zpx";


export default defineComponent({
  components: {Panel, Step},
  props: {},
  setup(props) {
    return {}
  }
})
</script>
<style lang="less" scoped>

</style>