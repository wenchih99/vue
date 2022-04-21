<template>
<div>
    <br>
    <div class="text-center">
        <h1>{{usertitle}}</h1>
    </div>
    <div class="container registration-container">
        <div class="input-group mb-3">
            <input id="register_email" v-model="register_mail" v-on:input="check_mail" type="text" class="form-control form-control-mail" placeholder="Email" autofocus>
            <button @click="authcode" :class="{disabled: !this.authclick}" class="btn btn-primary btn-code">{{authcontent}}</button>
        </div>
        <p v-show="!mail_islegal&&!mail_isempty" style="color:red">邮箱格式不合法</p>
        <div v-show="isshow">
        <div class="form-floating mb-3 mt-3">
            <input id="register_authcode" v-model="register_code" type="text" placeholder="Auth Code" class="form-control">
            <label for="authcode">Auth Code</label>
        </div>
        
        <div class="form-floating mb-3 mt-3">
            <input id="register_userid" v-model="register_id" v-on:input="check_userid" type="text" placeholder="User ID" class="form-control">
            <label for="userid">User ID</label>
        </div>
        <p v-show="!userid_lenth&&!userid_isempty" style="color:red"><i class="fa fa-times-circle"></i>用户名长度不小于8位</p>
        <p v-show="userid_lenth&&!userid_isempty" style="color:green"><i class="fa fa-check-square-o"></i>用户名长度不小于8位</p>
        <p v-show="!userid_islegal&&!userid_isempty" style="color:red">用户名含非法空白字符</p>
        <p v-show="userid_isempty" style="color:red">用户名不能为空</p>

        <div class="form-floating mb-3 mt-3">
            <input id="register_passwd" v-model="register_pwd" v-on:input="check_pwd" type="password" placeholder="Password" class="form-control">
            <label for="passwd">Password</label>  
        </div>
        <p v-show="!pwd_lenth&&!pwd_isempty" style="color:red"><i class="fa fa-times-circle"></i>密码长度不小于8位</p>
        <p v-show="pwd_lenth&&!pwd_isempty" style="color:green"><i class="fa fa-check-square-o"></i>密码长度不小于8位</p>
        <p v-show="!pwd_char&&!pwd_isempty" style="color:red"><i class="fa fa-times-circle"></i>含英文大小写及数字</p>
        <p v-show="pwd_char&&!pwd_isempty" style="color:green"><i class="fa fa-check-square-o"></i>含英文大小写及数字</p>
        <p v-show="!pwd_spechar&&!pwd_isempty" style="color:red"><i class="fa fa-times-circle"></i>至少含一种特殊字符</p>
        <p v-show="pwd_spechar&&!pwd_isempty" style="color:green"><i class="fa fa-check-square-o"></i>至少含一种特殊字符</p>
        <p v-show="!pwd_islegal&&!pwd_isempty" style="color:red"><i class="fa fa-times-circle"></i>不得含有非法空白字符</p>
        <p v-show="pwd_isempty" style="color:red">密码不能为空</p>

        <div class="form-floating mb-3 mt-3">
            <input id="repasswd" v-model="register_repwd" v-on:input="check_ispwdsame" type="password" placeholder="Re-type Password" class="form-control">
            <label for="repasswd">Re-type Password</label>
        </div>
        <p v-show="!pwd_issame&&!pwd_isempty" style="color:red">两次输入的密码不一致</p>

        <button @click="register" class="btn btn-primary btn-submit">
            <i class="fa fa-check" style="font-size:24px"></i>
        </button>

        <div class="text-end">
            Already Registered.
            <router-link to="/login">Login</router-link>
        </div>
        </div>
    </div>
</div>
</template>

<script>
import md5 from 'js-md5'
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
          pwd_issame:false,
          pwd_islegal:true,
          pwd_lenth:false,
          pwd_char:false,
          pwd_spechar:false,
          pwd_isempty:true,
          userid_islegal:true,//为空
          userid_lenth:false,
          userid_isempty:true,//为空
          mail_islegal:false,
          mail_isempty:true,
          isshow:false

      }
  },
  methods:{
      register(){
          this.check_userid()
          this.check_pwd()
          this.check_ispwdsame()
          if(!(!this.pwd_isempty&&!this.userid_isempty&&this.userid_lenth&&this.pwd_issame&&this.pwd_islegal&&this.pwd_lenth&&this.pwd_char&&this.pwd_spechar&&this.userid_islegal&&this.register_id.length!==0))
          {
            alert("按要求填写信息")
            return
          }
          //zxcZXC123!@#

          this.axios.post('/register', {
            userid: this.register_id,
            password: md5(this.register_pwd),
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
          this.check_mail()
          if(!this.mail_islegal)
          {
            alert("邮箱格式不合法")
            return
          }
          this.isshow=true
          this.authclick=false
          this.axios.post('/auth', {
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
      },
      check_userid()
      {
        var tmp=this.register_id
        if(tmp.length>0){this.userid_isempty=false}
        else{this.userid_isempty=true}

        tmp=this.register_id.match("\\s")
        if(tmp!=null){this.userid_islegal=false}
        else{this.userid_islegal=true;} 

        tmp=this.register_id
        if(tmp.length>=8){this.userid_lenth=true}
        else{this.userid_lenth=false}
      },
      check_ispwdsame()
      {
        if(this.register_pwd===this.register_repwd)
        {
            this.pwd_issame=true
        }
        else{
            this.pwd_issame=false
        }
        //console.log(this.register_pwd+':'+this.register_repwd)
      },
      check_pwd()
      {
        var tmp=this.register_pwd
        if(tmp.length>0){this.pwd_isempty=false}
        else{this.pwd_isempty=true}

        tmp=this.register_pwd
        if(tmp.length>=8){this.pwd_lenth=true}
        else{this.pwd_lenth=false}

        var tmp1=tmp.match("[a-z]")
        var tmp2=tmp.match("[0-9]")
        var tmp3=tmp.match("[A-Z]")
        if(tmp1!==null&&tmp2!==null&&tmp3!==null){this.pwd_char=true}
        else{this.pwd_char=false}

        var tmp4=tmp.match("[^a-zA-Z0-9]")
        if(tmp4!==null){this.pwd_spechar=true}
        else{this.pwd_spechar=false}
        //console.log(tmp1+':'+tmp2+':'+tmp3)

        var tmp5=tmp.match("\\s")
        if(tmp5!==null){this.pwd_islegal=false}
        else{this.pwd_islegal=true}
      },
      check_mail()
      {
        if(this.register_mail.length>0){this.mail_isempty=false}
        else{this.mail_isempty=true}

        var tmp = this.register_mail.match("^\\w+([-+.]\\w+)*@(qq|gmail|163|88|139|189|aliyun)\\.+(com|net|cn)$")
        if(tmp!==null){this.mail_islegal=true}
        else{this.mail_islegal=false}
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
