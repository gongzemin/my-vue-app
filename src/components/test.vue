<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>弹出信息框</title>
    <script src="http://rivermap-file.oss-cn-hangzhou.aliyuncs.com/lj/cesium/Cesium.js"></script>
    <link
      href="http://rivermap-file.oss-cn-hangzhou.aliyuncs.com/lj/cesium/Widgets/widgets.css"
      rel="stylesheet"
    />
  </head>

  <body>
    <div id="cesiumContainer" class="fullSize">
      <div
        class="state"
        id="stateShow"
        style="
          width: 150px;
          height: 150px;
          background-color: rgba(0, 162, 255, 0.475);
          color: white;
          position: absolute;
          z-index: 999;
        "
      >
        <div :id="id" class="box">
          <div class="box-wrap">
            <div class="close" onclick="closeClick()" style="cursor: pointer">
              X
            </div>
            <div class="area">
              <div class="area-title fontColor" id="title"></div>
            </div>
            <div class="content">
              <div class="data-li">
                <div class="data-label textColor">状态：</div>
                <div class="data-value">
                  <span class="label-num yellowColor" id="state"></span>
                </div>
              </div>
              <div class="data-li">
                <div class="data-label textColor">类型：</div>
                <div class="data-value">
                  <span class="label-num yellowColor" id="type"></span>
                  <!-- <span class="label-unit textColor">m³/s</span> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <script>
      Cesium.Ion.defaultAccessToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3OWQ5ZTYzZi05NThmLTRmYjctOTk1Zi01YjczMTQ0ZjZlODAiLCJpZCI6NjE0MjMsImlhdCI6MTYyNjA3MjcwMn0.t78sW9YdR2gWIB55li5ZBYOeEz84owJajRUgGmVBbdc'
      var viewer = new Cesium.Viewer('cesiumContainer', {
        homeButton: false,
        baseLayerPicker: false,
        navigationHelpButton: false,
        animation: false,
        timeline: false,
        fullscreenButton: false,
        vrButton: false,
        infoBox: false,
      })
      //初始化位置
      viewer.camera.setView({
        // fromDegrees()方法，将经纬度和高程转换为世界坐标
        destination: {
          x: -2182971.083593166,
          y: 4388278.203560757,
          z: 4068871.884137431,
        },
        orientation: {
          // 指向
          heading: 0.7195577085964127,
          // 视角
          pitch: -0.7397293873082695,
          roll: 0.002953934254479762,
        },
      })

      //添加影像
      var imageryProvider = new Cesium.ArcGisMapServerImageryProvider({
        url: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer',
        name: 'arcgis影像服务',
      })
      // viewer.imageryLayers.addImageryProvider(imageryProvider);
      const poin = [
        {
          id: '12321321',
          name: '颍红测试点',
          type: '固定枪机',
          state: '在线',
          position: {
            x: 116.4568,
            y: 39.8926,
          },
          text: '1',
        },
        {
          id: '43244324',
          name: '解放修理厂门口',
          type: '固定枪机',
          state: '在线',
          position: {
            x: 116.4568,
            y: 39.8944,
          },
          text: '2',
        },
        {
          id: '43764324',
          name: '新华路加油站',
          type: '固定枪机',
          state: '在线',
          position: {
            x: 116.4566,
            y: 39.8923,
          },
          text: '3',
        },
        {
          id: '437543345',
          name: '康佳大药房',
          type: '固定枪机',
          state: '在线',
          position: {
            x: 116.4513,
            y: 39.8923,
          },
          text: '4',
        },
      ]

      function addEntity(e) {
        let pinBuilder = new Cesium.PinBuilder()
        // debugger
        e.map(res => {
          let poin = viewer.entities.add({
            id: res.id,
            name: res.name,
            position: Cesium.Cartesian3.fromDegrees(
              res.position.x,
              res.position.y,
            ),
            billboard: {
              image: pinBuilder
                .fromText(res.text, Cesium.Color.ROYALBLUE, 48)
                .toDataURL(),
              verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            },
            monitoItems: {
              data: res,
            },
          })
        })
        return e
      }

      //加载点
      addEntity(poin)

      //点击加载弹窗
      function leftDownAction() {
        var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
        handler.setInputAction(function (movement) {
          var picked = viewer.scene.pick(movement.position)
          if (Cesium.defined(picked) && picked.id.id) {
            Popupposition(picked)
            let id = picked.id.id
            let name = picked.id._name
            document.getElementById('title').innerHTML = name
            let monitoItems = picked.id.monitoItems
            document.getElementById('state').innerHTML = monitoItems.data.state
            document.getElementById('type').innerHTML = monitoItems.data.type
          } else {
            return
          }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
      }
      leftDownAction()

      function Popupposition(e) {
        let data = e.id.monitoItems.data
        //经纬度转为世界坐标
        let gisPosition = Cesium.Cartesian3.fromDegrees(
          data.position.x,
          data.position.y,
          0,
        )
        document.getElementById('stateShow').style.display = 'block' //弹出信息框
        //实时更新位置
        viewer.scene.postRender.addEventListener(() => {
          //转化为屏幕坐标
          var windowPosition = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
            viewer.scene,
            gisPosition,
          )
          document.getElementById('stateShow').style.left =
            windowPosition.x - 150 + 'px'
          document.getElementById('stateShow').style.top =
            windowPosition.y - 220 + 'px'

          //解决滚动不隐藏问题
          const camerPosition = viewer.camera.position
          let height =
            viewer.scene.globe.ellipsoid.cartesianToCartographic(
              camerPosition,
            ).height
          height += viewer.scene.globe.ellipsoid.maximumRadius
          if (
            !(
              Cesium.Cartesian3.distance(camerPosition, gisPosition) > height
            ) &&
            viewer.camera.positionCartographic.height < 50000000
          ) {
            document.getElementById('stateShow').style.display = 'block'
          } else {
            document.getElementById('stateShow').style.display = 'none'
          }
        })
      }

      function closeClick() {
        document.getElementById('stateShow').style.display = 'none'
      }
    </script>
  </body>
</html>
