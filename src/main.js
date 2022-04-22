localStorage.setItem("url","https://127.0.0.1:8083")
//localStorage.setItem("url","https://8.130.52.255:8083")
import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import VueAxios from 'vue-axios'
import axios from './vueaxios'

//先查询后端是否已经登录
if(localStorage.getItem("userid")!=null){axios.get('/api/checklogin')}

const app=createApp(App)
app.use(router)
app.use(VueAxios,axios)
app.mount('#app')


