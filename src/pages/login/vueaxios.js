import axios from 'axios'
axios.defaults.withCredentials=true
//axios.defaults.baseURL='http://127.0.0.1:8083'
axios.defaults.baseURL=localStorage.getItem("url")
axios.defaults.timeout=1000*60*2

// 添加响应拦截器
axios.interceptors.request.use(config => {
  //在发送请求之前做的一些操作，例如加上token这些
  return config
}, error => {
  //对请求错误做些什么
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
    return response;
  }, err=>{
    // 对响应错误做点什么
    switch(err.response.status){
        // 对得到的状态码的处理，具体的设置视自己的情况而定
        case 1003:
            alert("请登录!")
            window.location.href='/login'
            break
        case 403:
            alert("登录失败!")
            window.location.href='/login'
            break
        case 406:
            alert("注册失败!")
            break
        // case ...
        default:
            console.log('其他错误')
            break
      }
    return Promise.reject(err);
  });

export default axios