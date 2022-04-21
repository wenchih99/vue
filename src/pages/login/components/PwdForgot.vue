<template>
<div class="modal-dialog">
    <div class="modal-content">
 
      <!-- 模态框头部 -->
      <div class="modal-header">
        <h4 class="modal-title">找回密码</h4>
      </div>
 
      <!-- 模态框内容 -->
      <div class="modal-body">
        <div class="container registration-container">
          <div class="input-group mb-3">
            <input id="email" v-model="fgt_mail" type="text" class="form-control form-control-mail" placeholder="Email" autofocus>
            <button @click="authcode" :class="{disabled: !this.authclick}" class="btn btn-primary btn-code">{{ authcontent }}</button>
          </div>
          <div class="form-floating mb-3 mt-3">
            <input id="authcode" v-model="fgt_code" type="text" placeholder="Auth Code" class="form-control">
            <label for="authcode">Auth Code</label>
          </div>
        
          <div class="form-floating mb-3 mt-3">
            <input id="passwd" v-model="fgt_pwd" type="password" placeholder="Password" class="form-control">
            <label for="passwd">Password</label>
          </div>

          <div class="form-floating mb-3 mt-3">
            <input id="repasswd" v-model="fgt_repwd" type="password" placeholder="Re-type Password" class="form-control">
            <label for="repasswd">Re-type Password</label>
          </div>
        
          <button @click="fgtpwd" class="btn btn-primary btn-submit">
            <i class="fa fa-check" style="font-size:24px"></i>
          </button>
        </div>
        
      </div>
 
    </div>
  </div>
</template>

<script>
export default {
  name: 'PwdForgot',
  data(){
      return{
          fgt_pwd:'',
          fgt_repwd:'',
          fgt_mail:'',
          fgt_code:'',
          authcontent:'Auth Code',
          totaltime:60,
          authclick:true,
      }
  },
  methods:{
      fgtpwd(){
          this.axios.post('/pwdforgot', {
            mail: this.fgt_mail,
            password: this.fgt_pwd,
            code: this.fgt_code
            })
            .then(function (response) {
            console.log(response);
            })
            .catch(function (error) {
            console.log(error);
            });
      },
      authcode(){
          this.authclick=false
          this.axios.post('/auth', {
            mail: this.fgt_mail
            })
            .then(function (response) {
            console.log(response);
            })
            .catch(function (error) {
            console.log(error);
            });
          let clock=window.setInterval(() => {
            this.totaltime--
            this.authcontent = this.totaltime + 's'
            if (this.totaltime <= 0) {     //当倒计时小于0时清除定时器
                window.clearInterval(clock)
                this.authclick=true
                this.authcontent = 'Re-Send'
                this.totaltime = 60
            }
            },1000)
      }
  },
}
</script>
<style scoped>
.form-control-mail {
width:70%;
display:inline;
}
.btn-code {
width:30%;
height:50px;
}
.btn-submit{
    width: 100%;
    height: 50px;
}

</style>