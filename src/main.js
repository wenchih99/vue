import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import vueaxios from './vueaxios.js'
import VueAxios from 'vue-axios'
import axios from 'axios'

const app=createApp(App)
app.use(router)
app.use(VueAxios,axios)
axios.defaults.withCredentials=true
app.config.globalProperties.$vueaxios=vueaxios
app.mount('#app')