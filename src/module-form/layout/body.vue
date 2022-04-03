<template>
  <div class="z-form-body">
    <div class="z-form-body-1">
      <el-form ref="compForm" class="z-form-wrap z-form-preview" :label-width="base.labelWidth+'px'"
               :label-position="base.labelType">
        <VueDraggableNext
            v-model="localData" tag="transition-group" :animation="200" group="description"
            @start="dragStart" @end="dragEnd"
        >
          <el-form-item :key="idx" v-for="(item,idx) in localData" :id="idx" @click="currentChange(item)"
                        :class="[item.active?'z-active':'']"
                        class="z-form-item" :label="item.label" :prop="item.prop" :rules="item.rules">
            <el-input v-model="item.value" v-if="item.type === CompType.String" type="text" :clearable="item.clearable"
                      :placeholder="item.placeholder"/>
            <el-input v-model="item.value" v-else-if="item.type === CompType.Password" type="password"
                      :clearable="item.clearable"
                      :placeholder="item.placeholder"/>
            <el-input v-model="item.value" v-else-if="item.type === CompType.Textarea" type="textarea"
                      :clearable="item.clearable"
                      :placeholder="item.placeholder"/>
            <el-input v-model="item.value" v-else-if="item.type === CompType.Number" type="number"
                      :clearable="item.clearable"
                      :placeholder="item.placeholder"/>
            <el-input-number v-model="item.value" v-else-if="item.type === CompType.Snumber"
                             :clearable="item.clearable"/>
            <el-select v-model="item.value" v-else-if="item.type === CompType.Select" style="width: 100%;"
                       :clearable="item.clearable"
                       :placeholder="item.placeholder">
              <el-option v-for="o in item.options" :label="o.label" :value="o.value"></el-option>
            </el-select>
            <el-radio-group v-model="item.value" v-else-if="item.type === CompType.Radio">
              <el-radio v-for="o in item.options" :label="o.value">{{ o.label }}</el-radio>
            </el-radio-group>
            <el-checkbox-group v-model="item.value" v-else-if="item.type === CompType.Checkbox">
              <el-checkbox v-for="o in item.options" :label="o.value">{{ o.label }}</el-checkbox>
            </el-checkbox-group>
            <el-switch v-model="item.value" v-else-if="item.type === CompType.Switch" :active-text="item.ext.trueLabel"
                       :inactive-text="item.ext.falseLabel"/>
            <el-slider v-model="item.value" v-else-if="item.type === CompType.Slider" :show-tooltip="false"/>
            <el-date-picker v-model="item.value" v-else-if="item.type === CompType.Date" type="date"
                            :placeholder="item.placeholder"/>
            <el-date-picker v-model="item.value" v-else-if="item.type === CompType.Dates" type="daterange"
                            range-separator="-"
                            :start-placeholder="item.placeholder" :end-placeholder="item.placeholder"/>
            <el-time-select v-model="item.value" v-else-if="item.type === CompType.Time" start="00:00" step="00:10"
                            end="23:59" :placeholder="item.placeholder" :clearable="item.clearable"/>
            <el-rate v-model="item.value" v-else-if="item.type === CompType.Rate" size="large"/>
          </el-form-item>
        </VueDraggableNext>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType, Ref, ref, SetupContext, toRef, watch} from "vue";
import {ComponentItem, CompType} from "./events";
import {VueDraggableNext} from 'vue-draggable-next'


export default defineComponent({
  components: {VueDraggableNext},
  props: {
    base: {type: Object, default: () => ({})},
    data: {type: Array as PropType<ComponentItem[]>, default: () => ([])},
    current: {type: Object, default: () => ({})},
  },
  emits: ["current", "change"],
  setup(props: any, ctx: SetupContext) {
    let localData = ref<ComponentItem[]>([])

    watch(toRef(props, "data"), v => {
      localData.value = v
    }, {immediate: true, deep: true})


    return {
      ...drag(props, ctx, localData),
      ...change(props, ctx),
      CompType, localData,
    }
  }
})


function drag(props: any, ctx: SetupContext, list: Ref<ComponentItem[]>) {
  return {
    dragStart: (e: any) => {
      let paths = e.path as HTMLElement[]
      let flag = false

      for (let o of paths) {
        if (o.classList.contains("z-form-wrap")) {
          o.classList.remove("z-form-preview")
          o.classList.add("z-form-move")
          flag = true
          break
        }
      }
      if (!flag) {
        return
      }

      let div = e.item as HTMLDivElement
      list.value.forEach(v => {
        v.active = false
      })
      div.classList.add("z-move")
    },
    dragEnd: (e: any) => {
      let paths = e.path as HTMLElement[]
      let flag = false

      for (let o of paths) {
        if (o.classList.contains("z-form-wrap")) {
          o.classList.remove("z-form-move")
          o.classList.add("z-form-preview")
          flag = true
          break
        }
      }
      if (!flag) {
        return
      }

      let div = e.item as HTMLDivElement
      ctx.emit("change", list.value)
      let idx = e.newIndex
      change(props, ctx).currentChange(list.value[idx])
      div.classList.remove("z-move")
    },
  }
}

function change(props: any, ctx: SetupContext) {
  return {
    currentChange: (item: ComponentItem | null) => {
      ctx.emit("current", item)
    },

  }
}

</script>

<style lang="less" scoped>
.z-form-body {
  height: 100%;
  position: relative;

  .z-form-body-1{
    overflow-y: auto;
    position: absolute;
    height: 100%;
    width: 100%;
  }

  .z-form-item {
    margin-bottom: 0;
    padding: 18px;
    cursor: pointer;

  }

  .z-form-preview {
    .z-form-item {
      &:hover {
        background-color: #dde0ff;
      }

      &.z-active {
        background-color: #dde0ff;
      }
    }
  }

  .z-form-move {
    .z-form-item {
      &.z-move {
        background-color: #dde0ff;
        box-shadow: 4px 4px 4px #ddd;
        cursor: move;
        position: relative;
        z-index: 1000;

        ::v-deep(*) {
          cursor: move;
        }

      }
    }
  }

}


</style>