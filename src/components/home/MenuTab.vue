<template>
    <div v-if="isLogin"
        class="btn-group">
        <button type="button" class="btn btn-info dropdown-toggle" data-bs-toggle="dropdown" >{{username}}</button>
        <ul class="dropdown-menu">
            <li> 
                <a class="dropdown-item" 
                    v-for="(item, index) in menus"
                    :key="index" 
                    @click="didSelectItem(index)"
                    href="#"
                    >
                    {{item.name}}
                </a>
            </li>
        </ul>
    </div>
    <div v-else>
        <button @click="signin" type="button" class="btn btn-outline-primary me-2">Login</button>
        <button @click="signup" type="button" class="btn btn-primary">Sign-up</button>
    </div>
    
</template>

<script>
export default {
    name: "user-menu",
    props:{
        personal:{
            type: Boolean,
            default: false
            }
    },
    data() {
        return {
            isLogin:false,
            username: '',
            menus: [{
                name: "个人中心",
                class: ""
            },{
                name: "账号设置",
                class: ""
            },{
                name: "退出",
                class: ""
            }
            ],
        }
    },
    methods: {
        didSelectItem(index) {
            console.log(this.menus[index])
            if(index==0){this.$emit('update:personal',true)}
        },
        signin()
        {
            window.location.href="/login"
        },
        signup()
        {
            window.location.href="/login#/register"
        }
    },
    mounted(){
        this.username=localStorage.getItem('usernfame')
        console.log(this.username)
        if(this.username!=null)
        {
            this.isLogin=true;
        }
    }
}
</script>