<template>
<!-- <div class="container">
    <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
    <nav class="nav col-12 col-md-auto mb-2 mb-md-0">
        <div>
            <i class="logo">logo</i>
            <a class="navbar-brand" href="">BLOG</a>
        </div>
    </nav>
    <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3 justify-content-center ">
        <input type="search" class="form-control form-control-dark" placeholder="Search..." aria-label="Search">
    </form>
    <TabMenu class="ms-auto"/>
    </header>
    <div :style="{'disabled':true}">
        <home-index></home-index>
    </div>
</div>
    <div class="contaniner blog-post" 
        v-if="selectedPost===null">
        <div 
            v-for="post in posts"
            :key="post"
            :style="{'font-size':fontsize}"
            @click="selectedPost = post"
            style="padding:20px"
            >
            <div class="card bg-light text-dark" style="cursor:pointer">
                <div class="card-body" >
                    <h3 class="card-body">{{ post.title }}</h3>
                    <p v-html="$options.filters.ellipsis(post.content)"></p>
                </div>
            </div>
        </div>
    </div>
    <div class="contaniner blog-post" 
        v-else>
        <div 
            :style="{'font-size':fontsize}"
            >
            <div class="card bg-light text-dark" style="cursor:pointer">
            <div class="card-body" >
                <h3 class="card-body">{{ selectedPost.title }}</h3>
                <p v-html="selectedPost.content"></p>
            </div>
            </div>
        </div>
    </div> -->
    <router-view></router-view>
</template>
<script>
// import TabMenu from './components/home/MenuTab'
// import HomeIndex from './components/Home.vue'
export default{
    name: "BlogIndex",
    
    // components: {
    //     TabMenu,HomeIndex
    // },
    // data() {
    //     this.getDatas()
    //     return {
    //     posts: [],
    //     selectedPost: null,
    //     fontsize:"25px",
    // }
    // },
    // computed: {
    //   currentTabComponent() {
    //     return 'tab-' + this.currentTab.toLowerCase()
    //   }
    // },
    // methods:{
    //     async getDatas(){
    //       await this.$vueaxios.post('/posts', {
    //         author: "wenchihchang",
    //         }).then((res)=>{
    //             console.log(res.data)
    //             this.posts=res.data
    //         }).catch((err)=>{
    //             console.log(err)
    //         })
    //     },
    // },
    // filters:{
    //     ellipsis(value) {
    //     if (!value) return "";
    //     if (value.length > 100) {
    //         return value.slice(0, 100) + "......";
    //     }
    //     return value;
    //     }
    // }
    
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