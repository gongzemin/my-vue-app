<script setup lang="ts">
import { onMounted } from 'vue'
import * as Cesium from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'

let viewer
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
}

function loadGaode() {
  const gaodeLayer = new Cesium.ImageryLayer(
    new Cesium.UrlTemplateImageryProvider({
      url: 'https://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', // 纯地标图(地名)
      minimumLevel: 1,
      maximumLevel: 18,
    })
  )
  viewer.imageryLayers.add(gaodeLayer)
}
const areaList = [
  {
    name: '宝安区',
    coordinates: [113.82906293776698, 22.641963754038105],
    death: 12,
    lastDeath: 20,
    value: 12,
    dead: 11,
    lastValue: 18,
    lastDead: 13,
  },
  {
    name: '龙岗区',
    coordinates: [114.2154164, 22.7026201],
    death: 14,
    lastDeath: 16,
    value: 11,
    dead: 8,
    lastValue: 19,
    lastDead: 14,
  },
  {
    name: '龙华区',
    coordinates: [114.01094418908818, 22.66344694691329],
    death: 2,
    lastDeath: 5,
    value: 9,
    dead: 9,
    lastValue: 5,
    lastDead: 5,
  },
  {
    name: '福田区',
    coordinates: [114.0214734474097, 22.5243793141975],
    death: 1,
    lastDeath: 6,
    value: 10,
    dead: 4,
    lastValue: 9,
    lastDead: 9,
  },
  {
    name: '深汕合作区',
    coordinates: [115.00775602658149, 22.835888214260354],
    death: 5,
    lastDeath: 4,
    value: 3,
    dead: 1,
    lastValue: 8,
    lastDead: 3,
  },
  {
    name: '光明区',
    coordinates: [113.894048, 22.73001307],
    death: 1,
    lastDeath: 5,
    value: 7,
    dead: 6,
    lastValue: 16,
    lastDead: 12,
  },
  {
    name: '坪山区',
    coordinates: [114.3243907, 22.637667],
    death: 9,
    lastDeath: 5,
    value: 3,
    dead: 3,
    lastValue: 5,
    lastDead: 5,
  },
  {
    name: '南山区',
    coordinates: [113.92816882647301, 22.548617718280923],
    death: 4,
    lastDeath: 6,
    value: 3,
    dead: 3,
    lastValue: 13,
    lastDead: 13,
  },
  {
    name: '罗湖区',
    coordinates: [114.11156856, 22.52975019],
    death: 1,
    lastDeath: 3,
    value: 2,
    dead: 2,
    lastValue: 2,
    lastDead: 1,
  },
  {
    name: '盐田区',
    coordinates: [114.23962455, 22.558013],
    death: 0,
    lastDeath: 0,
    value: 2,
    dead: 1,
    lastValue: 2,
    lastDead: 0,
  },
  {
    name: '大鹏新区',
    coordinates: [113.98006398900009, 22.720919714000047],
    death: 2,
    lastDeath: 1,
    value: 1,
    dead: 1,
    lastValue: 2,
    lastDead: 2,
  },
]
const defaultLocation = {
  lng: 114.204641,
  lat: 22.341084,
  height: 70000,
  pitch: -65.0,
}

function addMapTotal(array) {
  console.log('addMapTotal', array)
  let defaultLoc = JSON.parse(JSON.stringify(defaultLocation))
  /**
   * 不能用Math随机数
   * 由 随机数 实施的随机数生成器不能抵挡加密攻击
   * 2023/4/6
   */
  defaultLoc.randomProp = Math.random() //uuidv4()
  let mapLocation = defaultLoc

  // let array = areaAccident.areaData
  try {
    let elements = document.getElementsByClassName('map-pop-statiscal')
    for (let i = elements.length - 1; i >= 0; i--) {
      elements[i]?.parentNode?.removeChild(elements[i])
    }
    // LJXhandler1.destroy();
  } catch (e) {}

  array?.length &&
    array.forEach(item => {
      let positionValue = Cesium.Cartesian3.fromDegrees(
        item.coordinates[0],
        item.coordinates[1]
      )
      let position = viewer.scene.cartesianToCanvasCoordinates(positionValue)
      if (position) {
        let htmllet

        htmllet = `
                    <div class="map-pop-statiscal flex flex-col justify-center" style="top:${
                      position.y - 120
                    }px;left:${position.x}px; position: absolute">
                      <div class="ym-quname-t ml-[17px]" style='margin-left:17px'>本年度总数: ${
                        item.value || '0'
                      }</div>
                  </div>`

        let htmlContainer = document.getElementById('cesiumContainer')
        htmlContainer?.insertAdjacentHTML('beforeend', htmllet)
      }
    })
  // htmlContainer?.appendChild(div);

  window.LJXhandler1 = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
  LJXhandler1.setInputAction(() => {
    let elements = document.getElementsByClassName('map-pop-statiscal')
    for (let i = elements.length - 1; i >= 0; i--) {
      if (i > 10) {
        // 大于10 11个区 就说明有重复
        elements[i]?.parentNode?.removeChild(elements[i])
      }
    }
    // console.log('home999', elements,elements.item(0))
    array?.length &&
      array.forEach((item, itemIndex) => {
        let positionValue = Cesium.Cartesian3.fromDegrees(
          item.coordinates[0],
          item.coordinates[1]
        )
        let position = viewer.scene.cartesianToCanvasCoordinates(positionValue)
        // let position = viewer.scene.cartesianToCanvasCoordinates(positionValue);
        if (position && elements) {
          elements[itemIndex].style.left = position?.x + 'px'
          elements[itemIndex].style.top = position?.y - 120 + 'px'
        }
      })
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
}

function locateMap() {
  viewer.camera.flyTo({
    // 地图定位到指定位置 深圳市民中心 高德坐标拾取的 https://developer.amap.com/tools/picker?type=spa&ref=
    destination: Cesium.Cartesian3.fromDegrees(114.04, 22.7, 48600), // 相机位置 不是地图位置
    // 相机的姿态
    orientation: {
      heading: Cesium.Math.toRadians(0.0), // 朝向
      pitch: Cesium.Math.toRadians(-90), // 俯视角 默认-90 垂直向下
      roll: 0.0,
    },
    duration: 0,
  })
}

function addMask() {
  // 使用jQuery加载Geojson数据
  fetch('https://geo.datav.aliyun.com/areas_v3/bound/440309.json')
    .then(response => response.json())
    .then(data => {
      let holeArr = []
      let features = data.features
      let LineInstanceArr = []

      // 遍历边界
      features.forEach(feature => {
        feature.geometry.coordinates.forEach(coorList => {
          holeArr.push({
            positions: Cesium.Cartesian3.fromDegreesArray(
              coorList.flat(Infinity)
            ),
          })

          // 使用的贴地线，开启地形不会产生影响
          let polyline = new Cesium.GroundPolylineGeometry({
            positions: Cesium.Cartesian3.fromDegreesArray(
              coorList.flat(Infinity)
            ),
            width: 3,
          })
          let lineInstance = new Cesium.GeometryInstance({
            geometry: polyline,
          })
          LineInstanceArr.push(lineInstance)
        })
      })

      let line = new Cesium.GroundPolylinePrimitive({
        geometryInstances: LineInstanceArr,
        appearance: new Cesium.PolylineMaterialAppearance({
          material: Cesium.Material.fromType('Color', {
            color: Cesium.Color.fromBytes(157, 217, 255, 255), // RGBA color
          }),
        }),
      })

      viewer.scene.primitives.add(line)

      // 遮罩
      let polygonEntity = new Cesium.Entity({
        polygon: {
          hierarchy: {
            // 添加外部区域为1/4半圆，设置为180会报错
            positions: Cesium.Cartesian3.fromDegreesArray([
              0, 0, 0, 90, 179, 90, 179, 0,
            ]),
            // 中心挖空的“洞”
            holes: holeArr,
          },
          material: new Cesium.Color(15 / 255.0, 38 / 255.0, 84 / 255.0, 0.7),
        },
      })

      viewer.entities.add(polygonEntity)

      let layers = viewer.scene.imageryLayers
      // 天地图影像图层
      //   var blackMarble1 = layers.addImageryProvider(
      //     new Cesium.UrlTemplateImageryProvider({
      //       url: 'http://t0.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=天地图Token',
      //     })
      //   )
      //   // 添加天地图的国境线图层
      //   var blackMarble = layers.addImageryProvider(
      //     new Cesium.UrlTemplateImageryProvider({
      //       url: 'http://t0.tianditu.gov.cn/DataServer?T=ibo_w&x={x}&y={y}&l={z}&tk=天地图Token',
      //     })
      //   )

      locateMap()
    })
}

onMounted(() => {
  Cesium.Ion.defaultAccessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3ZGRiMjUzZS1jZWNlLTRjMDYtODU5Mi05MjNiZDRjOGUwNTIiLCJpZCI6NDMxMDUsImlhdCI6MTY0NjI3MDQ2M30.ZH81WWILiz6RytEPHTdeRV-_Au5QuYN6JzJ8LsNqzLw'

  initCesium()
  viewer.cesiumWidget.creditContainer.style.display = 'none'
  loadGaode()
  addMapTotal(areaList)
  addMask()
})
</script>

<template>
  <div id="cesiumContainer"></div>
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
