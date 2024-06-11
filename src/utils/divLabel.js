/**
 * @descripion:
 * @param {Viewer} viewer
 * @param {Cartesian2} position
 * @param {String} title
 * @param {String} id
 * @return {*}
 */

//  import Vue from "vue";
import * as Cesium from 'cesium';
import { createApp } from 'vue';
 import Label from "../components/Label.vue";
//  let WindowVm = Vue.extend(Label);


let WindowVm = (val) => {
    return createApp(Label, val)
}
console.log('WindowVm', WindowVm);
 export default class DivLabel{
     
     constructor(val) {
         this.viewer = val.viewer;
         this.height = val.height;
         this.position = Cesium.Cartesian3.fromDegrees(
           val.position[0],
           val.position[1],
           val.height
         );
         let title = val.title;
         let id = val.id
         let appContainer = val.appContainer
         console.log('appContainer',appContainer );

         //this.vmInstance = WindowVm({title, id}).$mount('')

         this.vmInstance = createApp(Label, { title,
            id}).mount(`#${appContainer}`)
        console.log('this.vm', this.vmInstance)
        //  this.vmInstance = new WindowVm({
        //    propsData: {
        //      title,
        //      id
        //    }
        //  }).$mount(); //根据模板创建一个面板
          val.viewer.cesiumWidget.container.appendChild(this.vmInstance.$el); //将字符串模板生成的内容添加到DOM上
         this.addPostRender();
     }
     
   //添加场景事件
   addPostRender() {
     this.viewer.scene.postRender.addEventListener(this.postRender, this);
   }
 
   //场景渲染事件 实时更新窗口的位置 使其与笛卡尔坐标一致
   postRender() {
     // if (!this.vmInstance.$el || !this.vmInstance.$el.style) return;
     const canvasHeight = this.viewer.scene.canvas.height;
     const windowPosition = new Cesium.Cartesian2();
     Cesium.SceneTransforms.wgs84ToWindowCoordinates(
       this.viewer.scene,
       this.position,
       windowPosition
     );
     this.vmInstance.$el.style.bottom =
       canvasHeight - windowPosition.y + this.height + "px";
     const elWidth = this.vmInstance.$el.offsetWidth;
     this.vmInstance.$el.style.left = windowPosition.x - elWidth / 2 + "px";
 
     const camerPosition = this.viewer.camera.position;
     let height = this.viewer.scene.globe.ellipsoid.cartesianToCartographic(camerPosition).height;
     height += this.viewer.scene.globe.ellipsoid.maximumRadius;
     if((!(Cesium.Cartesian3.distance(camerPosition,this.position) > height))&&this.viewer.camera.positionCartographic.height<50000000){
         this.vmInstance.$el.style.display = "block";
     }else{
       this.vmInstance.$el.style.display = "none";
     }
   }
 }
 