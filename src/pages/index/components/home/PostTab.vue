<template>
<div class="contaniner blog-post">
    <div v-if="selectedPost===null">
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
    <div v-else>
        <div :style="{'font-size':fontsize}">
            <div class="card bg-light text-dark" style="cursor:pointer">
                <div class="card-body">
                    <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                        <p class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                            <strong class="fs-4" style="font-size:50px;">{{ selectedPost.title }}</strong>
                        </p>
                        <router-link :to="{name:'edit',params: selectedPost}" class="align-items-right" style="text-decoration:none;">edit</router-link>
                        <p class="align-items-right">|</p>
                        <a @click="delPost" class="align-items-right" style="text-decoration:none;cursor:pointer">delete</a>
                    </header>
                    <p v-html="selectedPost.content"></p>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import xss from '../../xss'
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
          await this.axios.post('/myposts', {
            // author: localStorage.getItem('userid'),
            }).then((res)=>{
                console.log(res.status)
                this.posts=res.data
                for(let i=0;i<this.posts.length;i++)
                {
                    this.posts[i].content=xss.process(this.posts[i].content)
                }
            }).catch((err)=>{
                console.log(err)
                console.log(err.response.status)
            })
        },
        delPost() {
            this.axios.post('/delpost', {
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
    width: 100%;
    box-sizing: border-box
}
</style>



