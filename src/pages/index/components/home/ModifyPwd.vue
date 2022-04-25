<template>
<div class="modal-dialog">
    <div class="modal-content">
 
      <!-- 模态框头部 -->
      <div class="modal-header">
        <h4 class="modal-title">修改密码</h4>
      </div>
 
      <!-- 模态框内容 -->
      <div class="modal-body">
        <div class="container registration-container">
          <div class="input-group mb-3">
            <input id="email" v-model="mail" v-on:input="check_mail" type="text" class="form-control form-control-mail" placeholder="Email" autofocus>
            <button @click="authcode" :class="{disabled: !this.authclick}" class="btn btn-primary btn-code">{{ authcontent }}</button>
          </div>

          <p v-show="!mail_islegal&&!mail_isempty" style="color:red">邮箱格式不合法</p>
          <div class="form-floating mb-3 mt-3">
            <input id="authcode" v-model="modify_code" type="text" placeholder="Auth Code" class="form-control">
            <label for="authcode">Auth Code</label>
          </div>
        
          <div class="form-floating mb-3 mt-3">
            <input id="passwd" v-model="password" v-on:input="check_pwd" type="password" placeholder="Password" class="form-control">
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
            <input id="repasswd" v-model="repassword" v-on:input="check_ispwdsame" type="password" placeholder="Re-type Password" class="form-control">
            <label for="repasswd">Re-type Password</label>
          </div>
          <p v-show="!pwd_issame&&!pwd_isempty" style="color:red">两次输入的密码不一致</p>
        
          <button @click="modifypwd" class="btn btn-primary btn-submit">
            <i class="fa fa-check" style="font-size:24px"></i>
          </button>
        </div>
        
      </div>
 
    </div>
  </div>
</template>

<script>
export default {
  name: 'PwdModify',
  data(){
      return{
          password:'',
          repassword:'',
          mail:'',
          modify_code:'',
          authcontent:'Auth Code',
          totaltime:60,
          authclick:true,
          mail_islegal:false,
          mail_isempty:true,
          pwd_issame:false,
          pwd_islegal:true,
          pwd_lenth:false,
          pwd_char:false,
          pwd_spechar:false,
          pwd_isempty:true,
      }
  },
  methods:{
      modifypwd(){
        this.check_pwd()
        this.check_ispwdsame()
        if(!(!this.pwd_isempty&&this.pwd_issame&&this.pwd_islegal&&this.pwd_lenth&&this.pwd_char&&this.pwd_spechar))
        {
          alert("按要求填写信息")
          return
        }
        this.axios.post('/modifypwd', {
          password: this.password,
          code: this.modify_code
        })
        .then(function (response) {
          console.log(response);
          alert("修改密码成功")
          window.location.href='/login'
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
          this.authclick=false
          this.axios.post('/modifyauth', {
            mail: this.mail
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
      check_mail()
      {
        if(this.mail.length>0){this.mail_isempty=false}
        else{this.mail_isempty=true}

        var tmp = this.mail.match("^\\w+([-+.]\\w+)*@(qq|gmail|163|88|139|189|aliyun)\\.+(com|net|cn)$")
        if(tmp!==null){this.mail_islegal=true}
        else{this.mail_islegal=false}
      },
      check_pwd()
      {
        var tmp=this.password
        if(tmp.length>0){this.pwd_isempty=false}
        else{this.pwd_isempty=true}

        tmp=this.password
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
      check_ispwdsame()
      {
        if(this.password===this.repassword)
        {
            this.pwd_issame=true
        }
        else{
            this.pwd_issame=false
        }
        //console.log(this.password+':'+this.repassword)
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