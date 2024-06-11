import { createApp, render } from 'vue'
import * as Vue from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './router/index.ts'

const app = createApp(App)
app.config.performance = true
console.log('render----', Vue, render)
app.use(router).mount('#app')
