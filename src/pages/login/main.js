import { createApp } from 'vue'
import LoginRegister from './Login'
import router from './router.js'
import vueaxios from './vueaxios.js'
import VueAxios from 'vue-axios'
import axios from 'axios'

const app=createApp(LoginRegister)
app.use(router)
app.use(VueAxios,axios)
axios.defaults.withCredentials=true
app.config.globalProperties.$vueaxios=vueaxios
app.mount('#login')


