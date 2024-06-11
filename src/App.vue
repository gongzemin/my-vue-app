<template>
  <!-- 11111111111
  <n-select v-model:value="value" :options="options" :label="customLabel" /> -->
  <router-view />
</template>

<script lang="ts">
import { NSelect } from 'naive-ui'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {
    NSelect,
  },
  setup() {
    const value = ref(null)
    const options = [
      {
        label1: "Everybody's Got Something to Hide Except Me and My Monkey",
        value: 'song0',
        disabled: true,
      },
      {
        label1: 'Drive My Car',
        value: 'song1',
      },
    ]

    const customLabel = option => {
      console.log('ssss', option)
      return option.label // Example: Converts label to uppercase
    }

    const customValue = option => {
      return option.value // Example: Uses the value property of the option as value
    }

    return {
      value,
      options,
      customLabel,
      customValue,
    }
  },
})
</script>
<style>
.map-pop-statiscal {
  width: 136px;
  height: 100px;
  background: transparent;
  /* background-image: url('@/assets/img/home/map_pop_bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%; */
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  background: rgba(38,70,117,0.9);
border-radius: 16px;
border: 8px solid;
border-image: linear-gradient(225deg, rgba(31, 206, 255, 1), rgba(75, 149, 255, 0), rgba(83, 219, 255, 1)) 8 8;
}
</style>