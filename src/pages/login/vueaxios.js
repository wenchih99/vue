import axios from 'axios'
axios.defaults.withCredentials=true
//axios.defaults.baseURL='http://127.0.0.1:8083'
axios.defaults.baseURL=localStorage.getItem("url")+'/api'
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
        case 1101:
            localStorage.removeItem("userid")
            break
        case 1102:
            alert("密码或用户名错误!")
            break
        case 1103:
            alert("验证码错误!")
            break
        case 1104:
            alert("登录失败,请稍后再试!")
            break
        case 1201:
            alert("用户名或邮箱已注册!")
            break
        case 1202:
            alert("邮箱验证码错误!")
            break
        case 1203:
            alert("用户信息不合法!")
            break
        case 1204:
            alert("注册失败,请稍后再试!")
            break
        case 1301:
            alert("不存在该账号!")
            break
        case 1302:
            alert("邮箱验证码错误!")
            break
        case 1303:
            alert("用户信息不合法!")
            break
        case 1304:
            alert("找回失败,请稍后再试!")
            break
        // case ...
        default:
            console.log('其他错误')
            break
      }
    return Promise.reject(err);
  });

export default axios