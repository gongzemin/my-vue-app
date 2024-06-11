<template>
  <div>
    <div id="cesiumContainer" ref="cesiumContainer"></div>
    <div id="controls">
      <button @click="addBillboard('a')">Add Billboard A</button>
      <button @click="addBillboard('b')">Add Billboard B</button>
      <button @click="removeBillboard('a')">Remove Billboard A</button>
      <button @click="removeBillboard('b')">Remove Billboard B</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as Cesium from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'

const cesiumContainer = ref(null)
let viewer
let billboards
const billboardMap = new Map([
  ['a', []],
  ['b', []],
])

const imageUrlMap = new Map([
  ['a', '/yxkj.png'],
  ['b', '/1.png'],
])

const defaultAccessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzZmM4MWYwYS0xOWM3LTQ0ZWEtYTUzNC1mMWI3ODAyODA1ZmYiLCJpZCI6NDQ2OTEsImlhdCI6MTYxNDI0NDk1OX0.5wce5JelLgCOVQ513YI9QtLDuqTA_L9Y0u_s2oFkWR4'

onMounted(() => {
  Cesium.Ion.defaultAccessToken = defaultAccessToken
  viewer = new Cesium.Viewer(cesiumContainer.value, {
    requestRenderMode: true, // Enable request render mode
    maximumRenderTimeChange: Infinity, // Only render on changes
  })
  billboards = new Cesium.BillboardCollection()
  viewer.scene.primitives.add(billboards)

  // Optional: fly to the initial location
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(-90.0, 40.0, 5000000.0),
  })
})

const addBillboard = type => {
  const addedBillboards = billboardMap.get(type)
  const imageUrl = imageUrlMap.get(type)

  for (let i = 0; i < 10; i++) {
    const longitude = -120.0 + Math.random() * 60.0
    const latitude = 30.0 + Math.random() * 20.0
    const billboard = billboards.add({
      position: Cesium.Cartesian3.fromDegrees(longitude, latitude),
      image: imageUrl,
      scale: 1.0,
    })
    addedBillboards.push(billboard)
  }
  viewer.scene.requestRender() // Request render after adding billboards
}

const removeBillboard = type => {
  const addedBillboards = billboardMap.get(type)

  if (addedBillboards.length > 0) {
    for (let i = 0; i < addedBillboards.length; i++) {
      const billboard = addedBillboards[i]
      billboards.remove(billboard)
    }
    viewer.scene.requestRender() // Request render after removing billboards
  } else {
    alert(`No billboards of type ${type.toUpperCase()} to remove!`)
  }
}
</script>

<style scoped>
@import url('https://cesium.com/downloads/cesiumjs/releases/1.85/Build/Cesium/Widgets/widgets.css');
html,
body,
#cesiumContainer {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
#controls {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
  background: rgba(255, 255, 255, 0.8);
  padding: 10px;
  border-radius: 5px;
}
button {
  margin: 5px;
  padding: 10px;
}
</style>
