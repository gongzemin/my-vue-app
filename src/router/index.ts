import { createMemoryHistory, createWebHistory, createRouter } from 'vue-router'

// import HomeView from './HomeView.vue'
import AboutView from '../view/aboutView.vue'

import('../view/aboutView.vue').then(res => {
  console.log('wow------', res)
  console.log('wow------22222', import('../view/aboutView.vue'))
})
const routes = [
  { path: '/', component: AboutView },
  { path: '/about', component: () => import('../view/aboutView.vue') },
  { path: '/test', component: () => import('../view/testView.vue') },
  { path: '/parent', component: () => import('../view/testParent.vue') },
  { path: '/child', component: () => import('../view/testChild.vue') },
  { path: '/grid', component: () => import('../view/testGrid.vue') },
  { path: '/cesium', component: () => import('../view/cesium.vue') },
  {
    path: '/cesiumBillboard',
    component: () => import('../view/cesiumBillboard.vue'),
  },
  {
    path: '/cesiumBillboardCopy',
    component: () => import('../view/cesiumBillboardCopy.vue'),
  },
  {
    path: '/cesiumBillboardTwo',
    component: () => import('../view/cesiumBillboardTwo.vue'),
  },
  {
    path: '/cesiumMarker',
    component: () => import('../view/cesiumMarker.vue'),
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
