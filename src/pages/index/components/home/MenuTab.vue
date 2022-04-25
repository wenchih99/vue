<template>
<div>
    <div v-if="isLogin"
        class="btn-group btn-group-justified">
        <button @click="addpost" type="button" class="btn btn-outline-primary me-2" data-bs-toggle="tooltip" title="添加文章!"><i class="fa fa-envira"></i></button>
        <div class="img-container me-2">
          <img :src="headpic" class="headpic" >
        </div>

        <a  href="#" data-bs-toggle="dropdown" style="text-decoration:none;line-height: 40px">{{userid}}</a>
        <ul class="dropdown-menu">
            <li> 
                <a class="dropdown-item" 
                    @click="didSelectItem(0)"
                    href="#">
                    个人中心
                </a>
                <a class="dropdown-item" 
                    @click="didSelectItem(index)"
                    href="#"
                    data-bs-toggle="modal" 
                    data-bs-target="#myModal">
                    账号设置
                </a>
                <a class="dropdown-item" 
                    @click="didSelectItem(index)"
                    href="#"
                    data-bs-toggle="modal" 
                    data-bs-target="#pwdModal">
                    修改密码
                </a>
                <a class="dropdown-item" 
                    @click="didSelectItem(2)"
                    href="#">
                    安全退出
                </a>
            </li>
        </ul>
    </div>
    <div v-else>
        <button @click="signin" type="button" class="btn btn-outline-primary me-2">Login</button>
        <button @click="signup" type="button" class="btn btn-primary">Sign-up</button>
    </div>
    <div class="modal fade" id="myModal">
        <InfoSetting v-if="isLogin===true" v-model:picurl="headpic"></InfoSetting>
    </div>
    <div class="modal fade" id="pwdModal">
        <PwdModify v-if="isLogin===true"></PwdModify>
    </div>
</div>
</template>

<script>
import { useRouter } from 'vue-router'
import InfoSetting from './InfoSetting'
import PwdModify from './ModifyPwd'
export default {
    name: "user-menu",
    components:{
        InfoSetting,PwdModify
    },
    props:{
        personal:{
            type: Boolean,
            default: false
            }
    },
    data() {
        return {
            isLogin:false,
            userid: '',
            // headpic:"http://127.0.0.1:8083/headpic"
            headpic:localStorage.getItem("url")+"/blog/headpic",

        }
    },
    methods: {
        didSelectItem(index) {
            console.log(index)
            if(index==0){this.$emit('update:personal',true)}
            else if(index==2){
                this.$emit('update:personal',false)
                this.signout()
                }
        },
        signin()
        {
            window.location.href="/login"
        },
        signup()
        {
            window.location.href="/login#/register"
        },
        signout()
        {
            localStorage.removeItem('userid')
            localStorage.removeItem('role')
            this.userid=null
            this.isLogin=false
            this.axios.post('/signout')
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
            console.log(error);
            });
        },
    },
    mounted(){
        this.userid=localStorage.getItem('userid')
        // console.log(this.userid)
        if(this.userid!=null)
        {
            this.isLogin=true;
        }
    },
    setup()
    {
        const router=useRouter()
        return{
            addpost()
            {
                router.push('edit')
            }
        }
    }
}
</script>
<style scoped>
.img-container{
position: relative;
margin: auto;
border-radius:100%;
overflow:hidden;
height:40px;
width: 40px;
}
.headpic{
position: absolute;
margin: auto;
height: 100%;
top: -99999px;
right: -99999px;
bottom: -99999px;
left: -99999px;
}
</style>