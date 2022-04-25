import axios from 'axios'

axios.defaults.withCredentials=true
//axios.defaults.baseURL='http://127.0.0.1:8083'
axios.defaults.baseURL=localStorage.getItem("url")+'/blog'
axios.defaults.timeout=1000*60*2


// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    return response;
  }, err=>{
    // 对响应错误做点什么
    switch(err.response.status){
        // 对得到的状态码的处理，具体的设置视自己的情况而定
        case 1101:
          localStorage.removeItem('userid')
          localStorage.removeItem("role")
          //alert("请登录!")
          window.location.href='/'
          break
        // case ...
        default:
            console.log('其他错误')
            break
      }
    return Promise.reject(err);
});
export default axios