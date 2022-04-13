<template>
<div class="row">
    <div class="col-2">
        <ul class="list-group">
            <li
                v-for="post in posts"
                :key="post"
                :class="{
                'bg-success': post === selectedPost,
                'text-white': post === selectedPost,
                }"
                :style="{'font-size':fontsize,}"
                @click="selectedPost = post"
                style="cursor:pointer"
            >
            {{ post.title }}
            </li>
            <li>
                <router-link :to="{name:'edit',params: null}" style="text-decoration:none;">
                    <i class="fa fa-plus" style="font-size:24px;color:green;cursor:pointer" data-bs-toggle="tooltip" title="添加文章!"></i>
                </router-link>
            </li>
        </ul>
    </div>
    <div class="container col-10">
        <div>
            <div v-if="selectedPost" class="card bg-light text-dark">
                <div class="container">
                    <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                        <p class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                            <span class="fs-4">{{ selectedPost.title }}</span>
                        </p>
                        <router-link :to="{name:'edit',params: selectedPost}" class="align-items-right" style="text-decoration:none;">edit</router-link>
                        <p class="align-items-right">|</p>
                        <a @click="delPost" class="align-items-right" style="text-decoration:none;cursor:pointer">delete</a>
                    </header>
                </div>
                <div v-html="selectedPost.content"></div>
            </div>
            <strong v-else>
                Click on a blog title to the left to view it.
            </strong>
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
}
</script>



