<template>
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
    </div>
</template>

<script>
export default{
    name: "TabPosts",
    data() {
        this.getDatas()
        return {
        posts: [],
        selectedPost: null,
        fontsize:"25px",
    }},
    methods:{
        async getDatas(){
          await this.$vueaxios.post('/posts', {
            author: "wenchihchang",
            }).then((res)=>{
                console.log(res.data)
                this.posts=res.data
            }).catch((err)=>{
                console.log(err)
            })
        },
        delPost() {
            this.$vueaxios.post('/delpost', {
            id: this.selectedPost.id,
            }).then((res)=>{
                console.log(res.data)
            }).catch((err)=>{
                console.log(err)
            })
            this.selectedPost=null
            this.posts.splice(this.posts.indexOf(this.selectedPost),1)
            
            
        },
        
    },
    filters:{
        ellipsis(value) {
        if (!value) return "";
        if (value.length > 100) {
            return value.slice(0, 100) + "......";
        }
        return value;
        }
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



