<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as Cesium from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'

let viewer
let billboardsAdded = ref(false)
const imageUrl = '/yxkj.png'
let addedBillboards = []
let billboards
const cesiumContainer = ref(null)
function initCesium() {
  // Initialize a new Cesium Viewer with customized options
  viewer = new Cesium.Viewer('cesiumContainer', {
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
  billboards = new Cesium.BillboardCollection()
  viewer.scene.primitives.add(billboards)
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(-90.0, 40.0, 5000000.0),
  })
}

function addMarkByPrimitive() {
  // Create a BillboardCollection
  const billboards = new Cesium.BillboardCollection()

  // URL to the shared image
  const imageUrl = '/yxkj.png'

  console.log('Billboard')
  console.time()
  for (let i = 0; i < 10; i++) {
    const longitude = -120.0 + Math.random() * 60.0
    const latitude = 30.0 + Math.random() * 20.0

    billboards.add({
      position: Cesium.Cartesian3.fromDegrees(longitude, latitude),
      image: imageUrl,
      scale: 1.0,
      id: i, // Assign an id to each billboard for easy identification
      //   info: 'This is billboard ' + i,
    })
  }
  console.log('addMarkByPrimitive')
  console.timeEnd()

  viewer.scene.primitives.add(billboards)

  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(-90.0, 40.0, 5000000.0),
  })

  viewer.screenSpaceEventHandler.setInputAction(function onClick(movement) {
    const pickedObject = viewer.scene.pick(movement.position)
    if (
      Cesium.defined(pickedObject) &&
      pickedObject.primitive instanceof Cesium.Billboard
    ) {
      const billboard = pickedObject.primitive
      alert('Clicked billboard with id: ' + billboard.id)
      // Perform any action you want with the clicked billboard
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
}

function addMarkerByEntities() {
  const billboards = new Cesium.BillboardCollection()

  // URL to the shared image
  const imageUrl = '/yxkj.png'

  console.time('Billboard')
  console.time()
  for (let i = 0; i < 10; i++) {
    const longitude = -120.0 + Math.random() * 60.0
    const latitude = 30.0 + Math.random() * 20.0

    viewer.entities.add({
      id: 'billboard-' + i,
      position: Cesium.Cartesian3.fromDegrees(longitude, latitude),
      billboard: {
        image: imageUrl,
        scale: 1.0,
      },
    })
  }
  console.log('addMarkerByEntities')
  console.timeEnd()

  // Add click event listener
  viewer.screenSpaceEventHandler.setInputAction(function onClick(movement) {
    const pickedObject = viewer.scene.pick(movement.position)
    if (Cesium.defined(pickedObject) && pickedObject.id) {
      const entity = pickedObject.id
      alert('Clicked billboard with id: ' + entity.id)
      // Perform any action you want with the clicked entity
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(-90.0, 40.0, 5000000.0),
  })
}
// Track added billboards

let billboardList = []

const toggleBillboards = () => {
  console.log('billboardsAdded.value', billboardsAdded.value)
  // viewer.scene.primitives.remove(billboards)
  if (true) {
    // Add 100 billboards
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
    viewer.scene.requestRender()

    billboardsAdded.value = true
  }
  // else {
  //   // Remove 100 billboards
  //   console.log(addedBillboards, 'hxidaduo')
  //   // while (addedBillboards.length > 0) {
  //   //   for (const billboard of addedBillboards) {
  //   //     billboards.remove(billboard)
  //   //   }
  //   // }
  //   // // billboards.destroy()
  //   // // viewer.scene.primitives.remove(billboards)
  //   // // billboards = new Cesium.BillboardCollection()
  //   // // addedBillboards = []
  //   // billboardsAdded.value = false
  // }
  // Enable continuous rendering to reflect dynamic changes (optional)
  // viewer.scene.requestRenderMode = true
}

const removeBillboards = () => {
  if (addedBillboards.length > 0) {
    for (const billboard of addedBillboards) {
      billboards.remove(billboard)
    }
    addedBillboards.length = 0
    // const billboard = addedBillboards.pop()
  } else {
    alert('No billboards to remove!')
  }
  viewer.scene.requestRender()
}

onMounted(() => {
  Cesium.Ion.defaultAccessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3ZGRiMjUzZS1jZWNlLTRjMDYtODU5Mi05MjNiZDRjOGUwNTIiLCJpZCI6NDMxMDUsImlhdCI6MTY0NjI3MDQ2M30.ZH81WWILiz6RytEPHTdeRV-_Au5QuYN6JzJ8LsNqzLw'

  initCesium()
  // viewer = new Cesium.Viewer('cesiumContainer')
  // billboards = new Cesium.BillboardCollection()
  // viewer.scene.primitives.add(billboards)
  viewer.cesiumWidget.creditContainer.style.display = 'none'

  // const collection = new Cesium.PrimitiveCollection()
  // addMarkByPrimitive()
  // addMarkerByEntities()
})
</script>

<template>
  <div>
    <div id="cesiumContainer" ref="cesiumContainer"></div>
    <button id="toggleBillboards" @click="toggleBillboards()">
      Add Billboards
    </button>
    <button id="toggleBillboards" @click="removeBillboards()">
      remove Billboards
    </button>
  </div>
</template>
<style scoped>
#cesiumContainer {
  width: 1200px;
  height: 700px;
}
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
  background: rgba(38, 70, 117, 0.9);
  border-radius: 16px;
  border: 8px solid;
  border-image: linear-gradient(
      225deg,
      rgba(31, 206, 255, 1),
      rgba(75, 149, 255, 0),
      rgba(83, 219, 255, 1)
    )
    8 8;
}
</style>
