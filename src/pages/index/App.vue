<template>
    <router-view></router-view>
</template>
<script>
import { useRouter } from 'vue-router'
export default{
    name: "BlogIndex",
    setup(){
        const router = useRouter()
        var role = localStorage.getItem("role")
        if(role==='admin'){router.push('/admin')}
        else{router.push('/home')}
    }
}

</script>

<style scoped>
.blog-post{
    margin: auto;
    padding: 30px;
    width: 70%;
    box-sizing: border-box
}
</style>