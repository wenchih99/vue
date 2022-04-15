<template>
<div>
    <br><br><br><br><br>
    <div class="text-center">
        <h1>{{usertitle}}</h1>
    </div>
    <div class="container login-container">
        <div class="form-floating mb-3 mt-3">
            <input id="userid" v-model="login_id" type="text" placeholder="User ID" class="form-control"  v-on:input="check_userid"  autofocus>
            <label for="userid">User ID</label>
        </div>

        <div class="form-floating mb-3 mt-3">
            <input id="passwd" v-model="login_pwd"  type="password" placeholder="Password" class="form-control">
            <label for="passwd">Password</label>
        </div>
        
        <div class="input-group mb-3">
            <input id="picverify" v-model="verifycode"  type="text" placeholder="Pic Code" class="form-control form-control-pic">
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
            <router-link to="/pwdforgot" data-bs-toggle="modal" data-bs-target="#myModal">Forgot Password?</router-link>
        </div>
    </div>
</div>
</template>
 
<script>
export default {
  name: 'UserLogin',
  data(){
      return{
          usertitle:'Sign In',
          login_id:'',
          login_pwd:'',
          pwidth:0,
          verifycode:'',
          picurl:'http://127.0.0.1:8083/getVerify',
          check:false
      }
  },
  methods:{
        async login(){
            var that = this
            await this.checkVerify()
            console.log(this.check)
            if(this.check == false)
            {
                this.refreshpic()
                alert('验证码错误')
                return
            }
            this.$vueaxios.post('/login', {
            userid: this.login_id,
            password: this.login_pwd
            })
            .then(function (response) {
                console.log(response);
                localStorage.setItem('userid',that.login_id)
                window.location.href='/'
            })
            .catch(function (error) {
            console.log(error);
            });
            this.refreshpic()
        },
        check_userid()
        {
            this.pwidth=(this.login_id.length)%101;
            var tmp=this.login_id.match("[^a-zA-Z0-9]")
            if(tmp!=null)
            {
                alert("UserID含非法字符"+tmp[0])
            }
            console.log()
        },
        async checkVerify()
        {
            var that = this
            await this.$vueaxios.post('/checkVerify',{
            verifyInput: this.verifycode
            })
            .then(function (response) {
                that.check=response.data
                console.log(that.check)
            })
            .catch(function (error) {
            console.log(error);
            });
        },
        refreshpic()
        {
            var num=Math.ceil(Math.random()*10);
            this.picurl='http://127.0.0.1:8083/getVerify?'+num;
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