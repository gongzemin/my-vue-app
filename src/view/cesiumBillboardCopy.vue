<template>
  <div>
    <div id="cesiumContainer" ref="cesiumContainer"></div>
    <div id="controls">
      <button @click="addBillboard">添加点位</button>
      <button @click="removeBillboard">清除点位</button>
      <button @click="toggleBillboardVisibility">显示/隐藏点位</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as Cesium from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'
const cesiumContainer = ref(null)
let viewer
let billboards
const addedBillboards = []

const imageUrl = '/yxkj.png'
const defaultAccessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzZmM4MWYwYS0xOWM3LTQ0ZWEtYTUzNC1mMWI3ODAyODA1ZmYiLCJpZCI6NDQ2OTEsImlhdCI6MTYxNDI0NDk1OX0.5wce5JelLgCOVQ513YI9QtLDuqTA_L9Y0u_s2oFkWR4'

function initCesium() {
  viewer = new Cesium.Viewer(cesiumContainer.value, {
    geocoder: false,
    homeButton: false,
    sceneModePicker: false,
    baseLayerPicker: false,
    navigationHelpButton: false,
    animation: false,
    timeline: false,
    fullscreenButton: false,
    vrButton: false,
    selectionIndicator: false,
    maximumRenderTimeChange: Infinity, // 无操作时自动渲染帧率，设为数字会消耗性能，Infinity为无操作不渲染
    shadows: false, // 是否显示光照投射的阴影
    // targetFrameRate: 10, // 帧率
    shouldAnimate: false,
    requestRenderMode: true,
    cesiumLogo: false,
    // sceneMode: Cesium.SceneMode.SCENE3D,
    // terrainExaggeration: 3,
    infoBox: false,
  })
}

// 增加点位
const addBillboard = (visibility = true) => {
  for (let i = 0; i < 50; i++) {
    const longitude = 113.5 + Math.random() * 5
    const latitude = 24.5 + Math.random() * 5.5
    const billboard = billboards.add({
      position: Cesium.Cartesian3.fromDegrees(longitude, latitude),
      image: imageUrl,
      scale: 1.0,
      show: visibility,
      id: {
        data: {
          name: '点位' + i,
          description: ' 🐷 🐷.',
        },
      },
    })
    addedBillboards.push(billboard)
  }
  viewer.scene.requestRender()
}

// 清除点位
const removeBillboard = () => {
  if (addedBillboards.length > 0) {
    for (const billboard of addedBillboards) {
      billboards.remove(billboard)
    }
    addedBillboards.length = 0 // Clear the array after removing all billboards
  } else {
    alert('No billboards to remove!')
  }
  viewer.scene.requestRender()
}

// 显示/隐藏点位
function toggleBillboardVisibility() {
  if (!addedBillboards.length) {
    addBillboard(false)
  }
  for (const billboard of addedBillboards) {
    billboard.show = !billboard.show
  }
  viewer.scene.requestRender()
}

// 点击事件
function addCesiumEvent() {
  viewer.screenSpaceEventHandler.setInputAction(function anyname(movement) {
    const pickedObject = viewer.scene.pick(movement.position)
    if (
      Cesium.defined(pickedObject) &&
      pickedObject.primitive instanceof Cesium.Billboard
    ) {
      const billboard = pickedObject.primitive
      let { data } = billboard.id
      alert('点击点位: ' + data.name + data.description)
      // Perform any action you want with the clicked billboard
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
}

onMounted(() => {
  Cesium.Ion.defaultAccessToken = defaultAccessToken
  initCesium()
  viewer.cesiumWidget.creditContainer.style.display = 'none'
  billboards = viewer.scene.primitives.add(new Cesium.BillboardCollection())
  addCesiumEvent()
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(118.0, 27.0, 1750000.0),
  })
})
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
