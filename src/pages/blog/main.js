import { createApp } from 'vue'
import router from './router.js'
import vueaxios from './vueaxios.js'
import VueAxios from 'vue-axios'
import axios from 'axios'
import BlogIndex from './App'


const app=createApp(BlogIndex)
app.use(router)
app.use(VueAxios,axios)
axios.defaults.withCredentials=true
app.config.globalProperties.$vueaxios=vueaxios
app.mount('#app')


