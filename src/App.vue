<template>
    <router-view></router-view>
</template>
<script>
export default{
    name: "BlogIndex",
}
localStorage.setItem('username','wenchih')
console.log('username:'+localStorage.getItem('username'))
</script>

<style scoped>
.blog-post{
    margin: auto;
    padding: 30px;
    width: 70%;
    box-sizing: border-box
}
</style>