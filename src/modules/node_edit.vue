<template>
  <Panel v-if="!!node" class="z-info" :title="info.name">
    <template #title-action>
      <el-button class="button" type="text" @click="NodeDelete">删除</el-button>
    </template>
  </Panel>
</template>

<script lang="ts" setup>
import Panel from "../components/panel"
import zpx from "zpx";
import {VEvents} from "../lib/types";
import {IEdge, INode} from "@antv/g6";
import {ref, watch} from "vue";

const node = ref<INode | null>()
const info = ref<any>({})

zpx.on(VEvents.NodeEdit, (v: INode | null) => {
  node.value = v
  if (!v) {
    info.value = {}
  }

  info.value = {
    name: zpx.val(v, "_cfg.model.name")
  }
})


function NodeDelete() {
  if (!node.value) {
    return
  }
  let obj = node.value

  for (let o of obj.getEdges() || []) {
    o.getContainer().remove(true)
    obj.removeEdge(o)
  }
  obj.getContainer().remove(true)
  node.value = null
}

</script>

<style lang="less" scoped>
.z-info {
}
</style>