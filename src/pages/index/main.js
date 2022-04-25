localStorage.setItem("url","https://127.0.0.1:8083")
//localStorage.setItem("url","https://8.130.52.255:8083")
import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import VueAxios from 'vue-axios'
import axios from './vueaxios'
import xss from './xss'



//先查询后端是否已经登录
if(localStorage.getItem("userid")!=null){axios.get('https://127.0.0.1:8083/blog/checklogin')}

const app=createApp(App)
app.use(router)
app.use(VueAxios,axios)
// app.provide('$xss','xss')
app.mount('#index')


var str='<ul data-type="taskList">'+
    '<li data-checked="false" data-type="taskItem">'+
    '<label><input type="checkbox">'+
    '<span></span></label>'+
    '<div><p>dgsgsdggdsgsd</p></div>'+
    '</li></ul>'+
    '<pre><code>hgjhgjdfg</code></pre>'+
    '<p>你是傻逼aaaaaaaaaaaaaaaaaaa</p>'+
    '<img src=1 onerror="alert(1)">'

console.log(xss.process(str))
// export default filter



