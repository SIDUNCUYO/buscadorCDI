import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/bootstrap.min.css'
import '@/assets/bootstrap.bundle.min.js'
//import * as Vue from 'vue' // in Vue 3
import axios from 'axios'
//import VueAxios from 'vue-axios'
const app = createApp(App).use(router)
    //agregado axios al proyecto desde los componentes usar con this.$axios
app.config.globalProperties.$axios = axios
app.mount('#app')