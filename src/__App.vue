<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { onMounted, nextTick } from 'vue';
import HelloWorld from './components/HelloWorld.vue'
import * as Cesium from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";
import DivLabel from './utils/divLabel.js'
import * as turf from '@turf/turf';


window.CESIUM_BASE_URL = '/Cesium';

// Your access token can be found at: https://cesium.com/ion/tokens.
// Replace `your_access_token` with your Cesium ion access token.

Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzZmM4MWYwYS0xOWM3LTQ0ZWEtYTUzNC1mMWI3ODAyODA1ZmYiLCJpZCI6NDQ2OTEsImlhdCI6MTYxNDI0NDk1OX0.5wce5JelLgCOVQ513YI9QtLDuqTA_L9Y0u_s2oFkWR4';

onMounted(() => {

  // Initialize the Cesium Viewer in the HTML element with the "cesiumContainer" ID.
// const viewer = new Cesium.Viewer('cesiumContainer', {
//   terrainProvider: Cesium.createWorldTerrain()
// });    
// // Add Cesium OSM Buildings, a global 3D buildings layer.
// const buildingTileset = viewer.scene.primitives.add(Cesium.createOsmBuildings());   
// // Fly the camera to San Francisco at the given longitude, latitude, and height.
// viewer.camera.flyTo({
//   destination : Cesium.Cartesian3.fromDegrees(-122.4175, 37.655, 400),
//   orientation : {
//     heading : Cesium.Math.toRadians(0.0),
//     pitch : Cesium.Math.toRadians(-15.0),
//   }
// });



Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3OWQ5ZTYzZi05NThmLTRmYjctOTk1Zi01YjczMTQ0ZjZlODAiLCJpZCI6NjE0MjMsImlhdCI6MTYyNjA3MjcwMn0.t78sW9YdR2gWIB55li5ZBYOeEz84owJajRUgGmVBbdc'
window.viewer = new Cesium.Viewer('cesiumContainer', {
    homeButton: false,
    baseLayerPicker: false,
    navigationHelpButton: false,
    animation: false,
    timeline: false,
    fullscreenButton: false,
    vrButton: false,
    infoBox: false
})


let val = {
        viewer: window.viewer, 
        position:[124.54035, 38.92146],
        height:0,
        title:'CL标签',
        id:'210201025', 
        appContainer: '#appContainer'
      }

      let val1 = {
        viewer: window.viewer, 
        position:[116.54035, 38.92146],
        height:0,
        title:'CL标签',
        id:'210201026', 
        appContainer: '#appContainer1'
      }

let arr = [
{
  viewer: window.viewer, 
  position:[124.54035, 38.92146],
  height:0,
  title:'CL标签',
  id:'210201025', 
  appContainer: 'app1'
},
{
        viewer: window.viewer, 
        position:[116.54035, 38.92146],
        height:0,
        title:'CL标签',
        id:'210201026', 
        appContainer: 'app2'
      }

]

arr.forEach(item => {
  let div = document.createElement('div')
  div.id = item.appContainer
  document.body.appendChild(div)
})

arr.forEach(item => {
  setTimeout(() => new DivLabel(item), 2000)
})


const inputArray: any[] = [114.10912560000008, 22.593202505000022, 114.10945007500004, 22.593318071000056, 114.11009565800009, 22.59340084300004, 114.11066931100004, 22.593596051000077, 114.11080761200003, 22.593635962000064, 114.11155133500006, 22.593739089000053, 114.11208077200001, 22.593794953000042, 114.11228421600003, 22.593898460000048, 114.11268396600008, 22.593673601000035, 114.11279151300005, 22.593815111000026, 114.11316205800006, 22.593394868000075, 114.11382095500005, 22.593006686000024, 114.11390841600007, 22.59294294700004, 114.11413212900004, 22.592886454000052, 114.11446458500006, 22.592875268000057, 114.1150644700001, 22.593070855000065, 114.115490238, 22.593223262000038, 114.11593377000008, 22.593359716000066, 114.11629103200005, 22.593429994000076, 114.11640635700007, 22.593419493000056, 114.11651637500006, 22.593398601000047, 114.11664408100012, 22.59332577500004, 114.1167391680001, 22.592889310000032, 114.11678770900005, 22.59261432900007, 114.11679154600006, 22.59239543800004, 114.11685685700002, 22.592161255000065, 114.11695741800008, 22.59191138500006, 114.11707385500006, 22.591751948000024, 114.11837550500002, 22.591629694000062, 114.11836186900007, 22.59131581300005, 114.1183426560001, 22.59097689500004, 114.11837471100011, 22.590674355000033, 114.11864381700002, 22.590692729000068, 114.11874338700011, 22.59059833500004, 114.11885424700006, 22.59049813300004, 114.11900259700008, 22.590608807000024, 114.11948146400005, 22.590980597000055, 114.11969264100003, 22.59111741600003, 114.12008525200008, 22.59124828700004, 114.12086347600007, 22.591345406000073, 114.12151628400011, 22.591422091000027, 114.12300463700001, 22.591535710000073, 114.1233258640001, 22.591553556000065, 114.12359945300011, 22.591525511000043, 114.12388491700005, 22.591452564000065, 114.12437270900011, 22.59117268800003, 114.1246437750001, 22.59095630300004, 114.1248695910001, 22.59066539500003, 114.1255516870001, 22.589365287000078, 114.12558517800005, 22.58929310800005,
    114.12562592600011, 22.589217010000027, 114.1256166170001, 22.58921219000007, 114.12572179200004, 22.589008197000055, 114.12598624000009, 22.588568473000066, 114.12602815200012, 22.588496320000047, 114.12615306500004, 22.588753435000058, 114.12624189400003, 22.588699000000076, 114.12624187900008, 22.588682861000052, 114.12696467900003, 22.588271548000023, 114.126986826, 22.588271530000043, 114.12816500100007, 22.587616702000048, 114.12818585000002, 22.587631490000035, 114.12818583800004, 22.58761862800003, 114.1281891650001, 22.587620978000075, 114.12963683600003, 22.586866765000025, 114.12994235600002, 22.586735602000033, 114.13021568400006, 22.58664875900007, 114.13041744100008, 22.586606346000053, 114.13062964500011, 22.586573633000057, 114.13097603200004, 22.58655272200008, 114.13185955600011, 22.586558878000062, 114.13285446000009, 22.58654713100003, 114.13290376700002, 22.58653702600003, 114.13295170000004, 22.584391125000025, 114.13298011100005, 22.582450123000058, 114.13289074900001, 22.58155544400006, 114.13277461900009, 22.58065441900004, 114.13262232800002, 22.579460451000045, 114.13254319900011, 22.578878170000053, 114.13244525200002, 22.578186953000056, 114.13233562500011, 22.577237858000046, 114.13121844200009, 22.577595720000033, 114.1305867420001, 22.577726377000033, 114.13007027200001, 22.57772162300006, 114.12969492800005, 22.577682993000053, 114.12614723900003, 22.577161481000076, 114.12333935900006, 22.57674823600007, 114.12302855300004, 22.576708410000037, 114.12129026900004, 22.57664728000003, 114.12037075800004, 22.57664890700005, 114.11974757900009, 22.576636929000074, 114.11676129300008, 22.576591663000045, 114.11426451200009, 22.576562257000035, 114.11393773800012, 22.576548932000037, 114.11202525200008, 22.576519956000027, 114.11220262000006, 22.57787735200003, 114.112282746, 22.578563362000068, 114.11230269300006, 22.579177128000026, 114.1122793190001, 22.579633306000062, 114.1121731390001, 22.580430628000045,
    114.11195343300005, 22.58156862800007, 114.11181703400007, 22.582336957000052, 114.11159682300001, 22.58350348400006, 114.11151326100003, 22.58388741500005, 114.11139948300001, 22.58424235700005, 114.11114111600011, 22.58487776100003, 114.11085446400011, 22.585532358000023, 114.11053700200011, 22.586112478000075, 114.1101578470001, 22.58670592800007, 114.10960296600001, 22.58768191200005, 114.10931671300011, 22.588233968000054, 114.1091880680001, 22.588560148000056, 114.10905867000008, 22.588929119000056, 114.10892851900007, 22.58934087700004, 114.10884494600009, 22.58972480700004, 114.10875987000009, 22.59019431400003, 114.10873121200007, 22.59095000800005, 114.1087529020001, 22.591463935000036, 114.10884838000004, 22.592150179000043, 114.1089335150001, 22.592550936000066, 114.10904912300009, 22.59296641800006, 114.10912661600003, 22.593194650000044,
     114.10912560000008, 22.593202505000022];

const transformedArray: any = () => inputArray.reduce((result, current, index) => {
  if (index % 2 === 0) {
    result.push([current, inputArray[index + 1]]);
  }
  return result;
}, []);

var pt = turf.point([114.11196158952033, 22.590181286072063]);
var poly = turf.polygon(
  [transformedArray()]
//   [[
//   [-81, 41],
//   [-81, 47],
//   [-72, 47],
//   [-72, 41],
//   [-81, 41]
// ]]
);

turf.booleanPointInPolygon(pt, poly);

console.log('99999999999---000--', turf.booleanPointInPolygon(pt, poly))
// function addDivLabel(value) {
	
//     let label = new DivLabel(value)
// }

// addDivLabel(val)

// addDivLabel(val1)



   



})

</script>

<template>
  <div id="cesiumContainer" class="fullSize" style="width: 1600px; height:1200px;">
        <div class="state" id="stateShow"
            style="width: 150px;height:150px;background-color:rgba(0, 162, 255, 0.475);color:white;position:absolute;z-index:999">
            <div  class="box">
                <div class="box-wrap">
                    <div class="close" onclick="closeClick()" style="cursor:pointer ">X</div>
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
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
