<script setup lang="ts">
import { onMounted } from 'vue'
// The URL on your server where CesiumJS's static files are hosted.
// window.CESIUM_BASE_URL = '/'

// import {
//   Cartesian3,
//   createOsmBuildingsAsync,
//   Ion,
//   Math as CesiumMath,
//   Terrain,
//   Viewer,
// } from 'cesium'
// import * as Cesium from 'cesium'
// import 'cesium/Build/Cesium/Widgets/widgets.css'
import * as Cesium from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'

// Cesium.Ion.defaultAccessToken =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzZmM4MWYwYS0xOWM3LTQ0ZWEtYTUzNC1mMWI3ODAyODA1ZmYiLCJpZCI6NDQ2OTEsImlhdCI6MTYxNDI0NDk1OX0.5wce5JelLgCOVQ513YI9QtLDuqTA_L9Y0u_s2oFkWR4'

// // Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
// const viewer = new Viewer('cesiumContainer', {
//   terrain: Terrain.fromWorldTerrain(),
// })

function loadGaodeMap() {
  // 添加高德影像图
  let imgLayer = new Cesium.UrlTemplateImageryProvider({
    url: 'https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
    layer: 'imgLayer',
    minimumLevel: 3,
    maximumLevel: 18,
  })
  viewer.imageryLayers.addImageryProvider(imgLayer)

  // 影像注记
  let annoLayer = new Cesium.UrlTemplateImageryProvider({
    url: 'http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8',
    layer: 'annoLayer',
    style: 'default',
    //format: "image/jpeg",
    //tileMatrixSetID: "GoogleMapsCompatible"
  })
  viewer.imageryLayers.addImageryProvider(annoLayer)
}

onMounted(() => {
  // const viewer = new Cesium.Viewer('cesiumContainer', {
  //   imageryProvider: new Cesium.UrlTemplateImageryProvider({
  //     url: 'https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_en&size=1&scl=1&style=8&x={x}&y={y}&z={z}',
  //     subdomains: ['1', '2', '3', '4'],
  //   }),
  //   baseLayerPicker: false,
  //   geocoder: false,
  // })
  //   const viewer = new Cesium.Viewer('cesiumContainer', {
  //     imageryProvider: new Cesium.UrlTemplateImageryProvider({
  //       url: 'https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_en&size=1&scl=1&style=8&x={x}&y={y}&z={z}',
  //       subdomains: ['1', '2', '3', '4'],
  //     }),
  //     baseLayerPicker: false,
  //     geocoder: false,
  //   })

  //   viewer.camera.setView({
  //     destination: Cesium.Cartesian3.fromDegrees(116.397128, 39.916527, 10000),
  //   })
  // viewer = new Cesium.Viewer('cesiumContainer', {
  //   animation: false,
  //   timeline: false,
  //   // imageryProvider: false, // Disable default base layer
  //   baseLayerPicker: false, // 是否显示图层选择控件
  //   sceneModePicker: false,
  //   // scene: {
  //   // 	center: { lat: 22.538155, lng: 113.946599, alt: 1179575, heading: 346, pitch: -60 }
  //   // }
  // })

  Cesium.Ion.defaultAccessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3ZGRiMjUzZS1jZWNlLTRjMDYtODU5Mi05MjNiZDRjOGUwNTIiLCJpZCI6NDMxMDUsImlhdCI6MTY0NjI3MDQ2M30.ZH81WWILiz6RytEPHTdeRV-_Au5QuYN6JzJ8LsNqzLw'
  var map = new Cesium.Viewer('cesiumContainer', {
    infoBox: false,
    baseLayerPicker: false, // 是否显示图层选择器
    selectionIndicator: false,
    animation: false, // 是否创建动画小器件，左下角仪表
    geocoder: false, // 是否显示geocoder小器件，右上角查询按钮
    homeButton: false, // 是否显示Home按钮
    sceneModePicker: false, // 是否显示3D/2D选择器
    timeline: false, // 是否显示时间轴
    navigationHelpButton: false, // 是否显示右上角的帮助按钮
    fullscreenButton: false, // 右下角的全屏按钮
    shouldAnimate: true,
    orderIndependentTranslucency: false,
    contextOptions: {
      webgl: {
        alpha: true,
      },
    },
    // 添加基础地图
    // imageryProvider: new Cesium.UrlTemplateImageryProvider({
    //   url: 'https://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', //高德地图(卫片)
    //   minimumLevel: 1,
    //   maximumLevel: 18,
    // }),
  })
  // 在基础地图上添加地图
    var imaglyser = new Cesium.ImageryLayer(
      new Cesium.UrlTemplateImageryProvider({
        url: 'https://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', // 纯地标图(地名)
        minimumLevel: 1,
        maximumLevel: 18,
      })
    )
    map.imageryLayers.add(imaglyser)
  map.camera.flyTo({
    // 地图定位到指定位置
    destination: Cesium.Cartesian3.fromDegrees(
      116.48653672087,
      23.690416508705,
      10000
    ), // 相机位置 不是地图位置
    // 相机的姿态
    orientation: {
      heading: Cesium.Math.toRadians(0.0), // 朝向
      pitch: Cesium.Math.toRadians(-90), // 俯视角 默认-90 垂直向下
      roll: 0.0,
    },
    duration: 0,
  })

  //   var viewer = new Cesium.Viewer('cesiumContainer', {
  //     imageryProvider: new Cesium.SingleTileImageryProvider({
  //       url: 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==',
  //     }),
  //     baseLayerPicker: false,
  //     animation: false,
  //     fullscreenButton: false,
  //     vrButton: false,
  //     geocoder: false,
  //     homeButton: false,
  //     infoBox: false,
  //     sceneModePicker: false,
  //     selectionIndicator: false,
  //     timeline: false,
  //     navigationHelpButton: false,
  //     navigationInstructionsInitiallyVisible: false,
  //     scene3DOnly: true,
  //     shouldAnimate: false,
  //     skyBox: false,
  //   })
  //   // 隐藏版权信息
  //   viewer.cesiumWidget.creditContainer.style.display = 'none'
  //   var layer = new Cesium.UrlTemplateImageryProvider({
  //     url: 'http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',

  //     minimumLevel: 4,

  //     maximumLevel: 18,
  //   })

  //   viewer.imageryLayers.addImageryProvider(layer)

  // style 6-影像 7-矢量 8-标注
  //   var aMapProvider = new Cesium.UrlTemplateImageryProvider({
  //     url: 'https://webst0{s}.is.autonavi.com/appmaptile?style=7&x={x}&y={y}&z={z}&lang=zh_cn&size=1',
  //     subdomains: ['1', '2', '3', '4'], // 如果有多个子域名用于负载均衡，可以在这里指定
  //     tilingScheme: new Cesium.WebMercatorTilingScheme(),
  //     maximumLevel: 18, // 根据高德地图的实际最大层级设置
  //   })

  //   viewer.imageryLayers.addImageryProvider(aMapProvider)
  //   loadGaodeMap()
})

// // Fly the camera to San Francisco at the given longitude, latitude, and height.
// viewer.camera.flyTo({
//   destination: Cartesian3.fromDegrees(-122.4175, 37.655, 400),
//   orientation: {
//     heading: CesiumMath.toRadians(0.0),
//     pitch: CesiumMath.toRadians(-15.0),
//   },
// })

// // Add Cesium OSM Buildings, a global 3D buildings layer.
// const buildingTileset = await createOsmBuildingsAsync()
// viewer.scene.primitives.add(buildingTileset)

// // Add the Gaode tile layer to the viewer
// viewer.imageryLayers.addImageryProvider(gaodeTileProvider)
</script>
<template>
  <div id="cesiumContainer"></div>
</template>
<style scoped>
#cesiumContainer {
  width: 1200px;
  height: 700px;
}
</style>
