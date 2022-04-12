<template>
  <div class="z-minimap" ref="minimap"></div>
</template>

<script lang="ts">
import {defineComponent, ref, watch} from 'vue'
import zpx from "zpx";


export default defineComponent({
  components: {},
  props: {},
  setup(props) {
    let minimap = ref()
    watch(minimap, v => {
      Init(v)
    })

    return {minimap}
  }
})

function Init(minimap: any) {
  let w = minimap.clientWidth
  let h = minimap.clientHeight
}
</script>

<style scoped>
.z-minimap {
  height: 100%;
}
</style>