<template>
<div>
    <br><br><br><br><br>
    <div class="text-center">
        <h1>{{usertitle}}</h1>
    </div>
    <div class="container registration-container">
        <div class="input-group mb-3">
			<input id="email" v-model="register_mail" type="text" class="form-control form-control-mail" placeholder="Email" autofocus>
			<button @click="authcode" :class="{disabled: !this.authclick}" class="btn btn-primary btn-code">{{authcontent}}</button>
		</div>
        <div class="form-floating mb-3 mt-3">
            <input id="authcode" v-model="register_code" type="text" placeholder="Auth Code" class="form-control">
            <label for="authcode">Auth Code</label>
        </div>
        
        <div class="form-floating mb-3 mt-3">
            <input id="userid" v-model="register_id" type="text" placeholder="User ID" class="form-control">
            <label for="userid">User ID</label>
        </div>

        <div class="form-floating mb-3 mt-3">
            <input id="passwd" v-model="register_pwd" type="password" placeholder="Password" class="form-control">
            <label for="passwd">Password</label>
        </div>

        <div class="form-floating mb-3 mt-3">
            <input id="repasswd" v-model="register_repwd" type="password" placeholder="Re-type Password" class="form-control">
            <label for="repasswd">Re-type Password</label>
        </div>

        <div class="progress">
            <div class="progress-bar bg-danger" :style="{width:pwidth+'%'}"></div>
        </div>
        
        <button @click="register" class="btn btn-primary btn-submit">
            <i class="fa fa-check" style="font-size:24px"></i>
        </button>

        <div class="text-end">
            Already Registered.
            <router-link to="/login">Login</router-link>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'UserRegister',
  data(){
      return{
          usertitle:"REGISTRATION",
          register_id:'',
          register_pwd:'',
          register_repwd:'',
          register_mail:'',
          register_code:'',
          authcontent:'Auth Code',
          totaltime:60,
          authclick:true,
      }
  },
  methods:{
      register(){
          this.$vueaxios.post('/register', {
            userid: this.register_id,
            password: this.register_pwd,
            mail: this.register_mail,
            code: this.register_code
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
          this.$vueaxios.post('/auth', {
            userid: this.register_id,
            password: this.register_pwd,
            mail: this.register_mail,
            code: this.register_code
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
  }
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
.registration-container{            
width: 400px;            
margin: auto;  
background: rgba(246, 199, 247, 0.247);  
padding: 10px;      
}

</style>
