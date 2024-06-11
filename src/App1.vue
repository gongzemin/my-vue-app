<template>
  <n-radio-group name="left-size" style="margin-bottom: 12px">
    <n-radio-button value="small"> Small </n-radio-button>
    <n-radio-button value="Medium"> Medium </n-radio-button>
    <n-radio-button value="Large"> Large </n-radio-button>
  </n-radio-group>
  <n-form> ref="formRef" inline :label-width="80" </n-form>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
interface DataType {
  name: string
  age: string
}

function getDataById(ID: string): DataType
function getDataById(ID: string[]): DataType[]
function getDataById(ID: string | string[]): DataType | DataType[] {
  let data: DataType | DataType[]

  if (Array.isArray(ID)) {
    data = ID.map(id => ({
      name: `Name ${id}`,
      age: `Age ${id}`,
    }))
  } else {
    data = {
      name: 'Name',
      age: 'Age',
    }
  }

  return data
}

const userData = ref<DataType[]>()
userData.value = getDataById(['韩振芳', '小明'])
const userData1 = ref<DataType>()
userData1.value = getDataById('韩振芳')

getDataById(1)
</script>
