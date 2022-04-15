<template>
    <router-view></router-view>
</template>
<script>
export default{
    name: "BlogIndex",
}

console.log(localStorage)
</script>

<style scoped>
.blog-post{
    margin: auto;
    padding: 30px;
    width: 70%;
    box-sizing: border-box
}
</style>