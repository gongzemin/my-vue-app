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
    }),
  )
  viewer.imageryLayers.add(gaodeLayer)
}
const areaList = [
  {
    name: '大浪',
    coordinates: [113.98602487542354, 22.676292557500062],
    death: 12,
    lastDeath: 20,
    value: 12,
    dead: 11,
    lastValue: 18,
    lastDead: 13,
  },
  {
    name: '福城',
    coordinates: [114.01093023215708, 22.72131240500005],
    death: 14,
    lastDeath: 16,
    value: 11,
    dead: 8,
    lastValue: 19,
    lastDead: 14,
  },
  {
    name: '观湖',
    coordinates: [114.06453709964924, 22.69434222700005],
    death: 2,
    lastDeath: 5,
    value: 9,
    dead: 9,
    lastValue: 5,
    lastDead: 5,
  },
  {
    name: '观澜',
    coordinates: [114.05744852175914, 22.74122637600007],
    death: 1,
    lastDeath: 6,
    value: 10,
    dead: 4,
    lastValue: 9,
    lastDead: 9,
  },
  {
    name: '龙华',
    coordinates: [114.02987989222187, 22.657875735000033],
    death: 5,
    lastDeath: 4,
    value: 3,
    dead: 1,
    lastValue: 8,
    lastDead: 3,
  },
  {
    name: '民治',
    coordinates: [114.02856572149716, 22.616093517000053],
    death: 1,
    lastDeath: 5,
    value: 7,
    dead: 6,
    lastValue: 16,
    lastDead: 12,
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
        item.coordinates[1],
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
          item.coordinates[1],
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

function locateMap({ lng, lat, height }) {
  viewer.camera.flyTo({
    // 地图定位到指定位置 深圳市民中心 高德坐标拾取的 https://developer.amap.com/tools/picker?type=spa&ref=
    destination: Cesium.Cartesian3.fromDegrees(lng, lat, height),
    // 相机的姿态
    orientation: {
      heading: Cesium.Math.toRadians(0.0), // 朝向
      pitch: Cesium.Math.toRadians(-90), // 俯视角 默认-90 垂直向下
      roll: 0.0,
    },
    duration: 0,
  })
}

function addBorder1() {
  axios({
    url: '/jcyj/json/dongxiao.json',
  })
    .then(res => {
      let arr = []
      let brr = []
      console.info('res.data.dongxiao', res.data)
      res.data.geometry.points.map((point, index) => {
        brr.push(point.x)
        brr.push(point.y)
        if (brr.length == res.data.geometry.parts[arr.length] * 2) {
          arr.push(brr)
          brr = []
        }
      })
      this.removeData('dongXiaoBorder')
      console.info('arr--------------------', arr, arr[0])

      let positions = Cesium.Cartesian3.fromDegreesArray(arr[0])
      let mark = window.viewer.entities.add({
        polyline: {
          width: 5,
          clampToGround: true,
          height: 1,
          positions: positions,
          material: Cesium.Color.fromCssColorString('#228B22').withAlpha(0.7), //#228B22 #036e57
        },

        // 设置高度
        wall: {
          positions: Cesium.Cartesian3.fromDegreesArray(arr[0]),
          minimumHeights: new Array(positions.length).fill(0),
          maximumHeights: new Array(positions.length).fill(210),
          // 扩散墙材质
          material: new Cesium.WallDiffuseMaterialProperty({
            color: Cesium.Color.fromCssColorString('#228B22'), // #228B22 #33FFD4
          }),
        },
        // polygon: {
        // hierarchy: {
        //  positions: Cesium.Cartesian3.fromDegreesArray([
        //  100, 0, 100, 89, 150, 89, 150, 0,
        //  ]),
        //  holes: [
        //      new Cesium.PolygonHierarchy(
        //          Cesium.Cartesian3.fromDegreesArray(arr[0])
        //      ),
        //  ],
        // },
        // material: Cesium.Color.fromCssColorString("#000").withAlpha(0.65),
        // }
      })
      window.removeMapList['dongXiaoBorder'].push(mark)

      console.info('res.data.dongxiao------', arr, brr)
    })
    .catch(e => {
      throw e
    })
}

function addBorder(url) {
  fetch(url)
    .then(response => response.json())
    .then(res => {
      res.features.forEach(feature => {
        console.info('res.data.dongxiao', feature, feature.fieldValues[6])
        let arr = []
        let brr = []
        feature.geometry.points.map((point, index) => {
          brr.push(point.x)
          brr.push(point.y)
          if (brr.length == feature.geometry.parts[arr.length] * 2) {
            arr.push(brr)
            brr = []
          }
        })

        let positions = Cesium.Cartesian3.fromDegreesArray(arr[0])
        let mark = viewer.entities.add({
          position: Cesium.Cartesian3.fromDegrees(
            feature.geometry.center.x,
            feature.geometry.center.y,
          ),
          polyline: {
            width: 5,
            clampToGround: true,
            height: 1,
            positions: positions,
            material: Cesium.Color.fromCssColorString('#228B22').withAlpha(0.7), //#228B22 #036e57
          },
          label: {
            text: url.includes('longhua')
              ? feature.fieldValues[6]
              : feature.fieldValues[7],
            // font: '500 30px Helvetica', // 15pt monospace
            // scale: 15,

            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
            verticalOrigin: Cesium.VerticalOrigin.BASELINE,
            fillColor: Cesium.Color.GHOSTWHITE,
            showBackground: true,
            backgroundColor: Cesium.Color.DARKSLATEGREY.withAlpha(0.8),
            backgroundPadding: new Cesium.Cartesian2(8, 4),
            pixelOffset: new Cesium.Cartesian2(15, 6),
          },
          // 设置高度
          // wall: {
          //   positions: Cesium.Cartesian3.fromDegreesArray(arr[0]),
          //   minimumHeights: new Array(positions.length).fill(0),
          //   maximumHeights: new Array(positions.length).fill(210),
          //   // 扩散墙材质
          //   material: new Cesium.WallDiffuseMaterialProperty({
          //     color: Cesium.Color.fromCssColorString('#228B22'), // #228B22 #33FFD4
          //   }),
          // },
        })
        // viewer.zoomTo(mark)
      })

      url.includes('longhua')
        ? locateMap({
            lng: 114.04,
            lat: 22.7,
            height: 48600,
          })
        : locateMap({
            lng: 114.0414403261803,
            lat: 22.625703638500028,
            height: 8600,
          })
    })
}

function addSMMask() {
  fetch('http://127.0.0.1:5500/public/longShort.json')
    .then(response => response.json())
    .then(res => {
      let crr = []
      res.features.forEach(feature => {
        console.info('res.data.dongxiao', feature, feature.fieldValues[6])
        let arr = []
        let brr = []
        feature.geometry.points.map((point, index) => {
          brr.push(point.x)
          brr.push(point.y)
          // console.log('brr,', brr)
          if (brr.length == feature.geometry.parts[arr.length] * 2) {
            crr.push(brr)
            arr.push(brr)
            brr = []
            // 不可以不定义arr 因为要判断arr.length

            console.log('brr,111', brr, arr)
            console.log('crr111111111111', crr)
          }
        })
      })
      let holeArr = []
      holeArr.push({
        positions: Cesium.Cartesian3.fromDegreesArray(crr.flat()),
      })

      // 遮罩
      let polygonEntity =
        // new Cesium.Entity(
        {
          polygon: {
            hierarchy: {
              // 添加外部区域为1/4半圆，设置为180会报错
              positions: Cesium.Cartesian3.fromDegreesArray([
                0, 0, 0, 90, 170, 90, 170, 0,
              ]),
              // 中心挖空的“洞”
              holes: holeArr,
            },
            material: new Cesium.Color(15 / 255.0, 38 / 255.0, 84 / 255.0, 0.7),
          },
        }
      // )

      viewer.entities.add(polygonEntity)

      console.log('9999999crr111111111111', holeArr)
    })
}

function addMask() {
  // 使用jQuery加载Geojson数据
  fetch('https://geo.datav.aliyun.com/areas_v3/bound/440309.json')
    .then(response => response.json())
    .then(data => {
      let holeArr: any = []
      let features = data.features
      let positionArray = []
      let LineInstanceArr = []

      // 遍历边界
      features.forEach(feature => {
        feature.geometry.coordinates.forEach(coorList => {
          console.log('coorList---3', coorList)
          console.log('coorList---333333', coorList.flat(Infinity))
          holeArr.push({
            positions: Cesium.Cartesian3.fromDegreesArray(
              coorList.flat(Infinity),
            ),
          })

          // 使用的贴地线，开启地形不会产生影响
          let polyline = new Cesium.GroundPolylineGeometry({
            positions: Cesium.Cartesian3.fromDegreesArray(
              coorList.flat(Infinity),
            ),
            width: 2,
          })
          // var polyline = viewer.entities.add({
          //   polyline: {
          //     positions: Cesium.Cartesian3.fromDegreesArray(
          //       coorList.flat(Infinity)
          //     ),
          //     width: 5,
          //     material: new Cesium.PolylineGlowMaterialProperty({
          //       glowPower: 2, // Adjust glowPower as needed
          //       color: Cesium.Color.RED, // Adjust color as needed
          //     }),
          //     clampToGround: true,
          //   },
          // })
          let lineInstance = new Cesium.GeometryInstance({
            geometry: polyline,
          })
          LineInstanceArr.push(lineInstance)
        })
      })

      console.log('holesArr', holeArr)

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
              0, 0, 0, 90, 170, 90, 170, 0,
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
    })
}

function addWall() {}
function addClickEvent() {
  const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas)

  const clickFunc = click => {
    console.log('click', click)
    const pick = viewer.scene.pick(click.position)
    console.log('pick', pick)
    const ray = viewer.camera.getPickRay(click.position)
    const cartesian = viewer.scene.globe.pick(ray, viewer.scene)

    if (cartesian) {
      const cartographic = Cesium.Cartographic.fromCartesian(cartesian)
      const longitude = Cesium.Math.toDegrees(cartographic.longitude)
      const latitude = Cesium.Math.toDegrees(cartographic.latitude)

      console.log('Click Longitude:', longitude, 'Latitude:', latitude)
    } else {
      console.log('No point picked.')
    }
    if (pick && pick?.primitive && pick?.primitive?._text) {
      addBorder('http://127.0.0.1:5500/public/minzhi.json')

      console.log('pick', pick?.primitive?._text)
    }
  }
  handler.setInputAction(clickFunc, Cesium.ScreenSpaceEventType.LEFT_CLICK)
}

function addMarkByPrimitive() {
  // Create a BillboardCollection
  const billboards = new Cesium.BillboardCollection()

  // URL to the shared image
  const imageUrl = '/yxkj.png'

  console.time('Billboard')
  console.time()
  for (let i = 0; i < 100; i++) {
    const longitude = 110.0 + Math.random() * 10.0
    const latitude = 20.0 + Math.random() * 50.0

    billboards.add({
      position: Cesium.Cartesian3.fromDegrees(longitude, latitude),
      image: imageUrl,
      scale: 1.0,
    })
  }
  console.timeEnd('BillboardCollection')
  console.timeEnd()

  viewer.scene.primitives.add(billboards)

  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(-90.0, 40.0, 5000000.0),
  })
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
      position: Cesium.Cartesian3.fromDegrees(longitude, latitude),
      billboard: {
        image: imageUrl,
        scale: 1.0,
      },
    })
  }
  console.timeEnd('Entities')

  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(-90.0, 40.0, 5000000.0),
  })
}

onMounted(() => {
  Cesium.Ion.defaultAccessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3ZGRiMjUzZS1jZWNlLTRjMDYtODU5Mi05MjNiZDRjOGUwNTIiLCJpZCI6NDMxMDUsImlhdCI6MTY0NjI3MDQ2M30.ZH81WWILiz6RytEPHTdeRV-_Au5QuYN6JzJ8LsNqzLw'

  initCesium()
  viewer.cesiumWidget.creditContainer.style.display = 'none'
  loadGaode()
  // addMapTotal(areaList)
  // addMask()
  // addSMMask()
  // addBorder('http://127.0.0.1:5500/public/longhua.json')
  // addClickEvent()
  addMarkByPrimitive() / addMarkerByEntities()
  // addWall()
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
