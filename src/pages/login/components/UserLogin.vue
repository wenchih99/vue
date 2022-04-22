<template>
<div>
    <br>
    <div class="text-center">
        <h1>{{usertitle}}</h1>
    </div>
    <div class="container login-container">
        <div class="form-floating mb-3 mt-3">
            <input id="login_userid" v-model="login_id" type="text" placeholder="User ID" class="form-control"  v-on:input="check_userid" autofocus>
            <label for="userid">User ID</label>
        </div>
        <div v-show="!userid_islegal" style="color:red">用户名含非法空白字符</div>

        <div class="form-floating mb-3 mt-3">
            <input id="login_passwd" v-model="login_pwd"  type="password" placeholder="Password" class="form-control">
            <label for="passwd">Password</label>
        </div>
        
        <div class="input-group mb-3">
            <input id="login_picverify" v-model="verifycode"  type="text" placeholder="Pic Code" class="form-control form-control-pic">
            <img :src="picurl" @click="refreshpic"  class="pic-code">
        </div>

        <button @click="login" class="btn btn-primary btn-submit">
            <i class="fa fa-check" style="font-size:24px"></i>
        </button>
        
        <div class="text-end">
            Not a member yet?
            <router-link to="/register">Signup</router-link>
        </div>
        <hr>
        <div class="text-center">
            <a href="#" data-bs-toggle="modal" data-bs-target="#myModal">Forgot Password?</a>
        </div>
    </div>
</div>
<div class="modal fade" id="myModal">
  <ForgotPassword></ForgotPassword>
</div>
</template>
 
<script>
import ForgotPassword from './PwdForgot.vue'
import md5 from 'js-md5'
export default {
  name: 'UserLogin',
  components:{
      ForgotPassword
  },
  data(){
      return{
        usertitle:'Sign In',
        login_id:'',
        login_pwd:'',
        verifycode:'',
        picurl:localStorage.getItem("url")+'/getVerify',
        check:false,
        userid_islegal:true
      }
  },
  methods:{
        login(){
            var that = this
            this.axios.post('/login', {
                userid: this.login_id,
                password: md5(this.login_pwd),
                code: this.verifycode
            })
            .then(function (response) {
                console.log(response);
                localStorage.setItem('userid',that.login_id)
                window.location.href='/'
            })
            .catch(function (error) {
                console.log(error);
                that.refreshpic()
            });
            //this.refreshpic()
        },
        check_userid()
        {
            var tmp=this.login_id.match("\\s")
            if(tmp!=null)
            {
                this.userid_islegal=false
            }
            else{
                this.userid_islegal=true;
            } 
        },
        refreshpic()
        {
            var num=Math.ceil(Math.random()*10);
            this.picurl=localStorage.getItem("url")+'/getVerify?'+num;
            this.verifycode=''
            this.check=false
        }
  }
}
</script>
<style scoped>
.form-control-pic {
width:70%;
display:inline;
}
.pic-code {
width:30%;
height:40px;
display:inline;
}
.btn-submit{
    width: 100%;
    height: 50px;
}
.login-container{            
width: 400px;            
margin: auto;
background: rgba(246, 199, 247, 0.247);  
padding: 10px;
}
</style>