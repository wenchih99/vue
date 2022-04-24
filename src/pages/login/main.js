localStorage.setItem("url","https://127.0.0.1:8083")
//localStorage.setItem("url","https://8.130.52.255:8083")
import { createApp } from 'vue'
import LoginRegister from './Login'
import router from './router.js'
import VueAxios from 'vue-axios'
import axios from './vueaxios'

if(localStorage.getItem("userid")!=null){axios.get('https://127.0.0.1:8083/blog/checklogin')}

const app=createApp(LoginRegister)
app.use(router)
app.use(VueAxios,axios)
app.mount('#login')


