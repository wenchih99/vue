<template>
    <div class="contaniner blog-post" 
        v-if="selectedPost===null">
        <div 
            v-for="post in posts"
            :key="post"
            :style="{'font-size':fontsize}"
            style="padding:20px"
            >
            <div class="card bg-light text-dark" style="cursor:pointer">
                <div class="card-body" >
                    <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                        <p class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                            <strong @click="selectedPost = post" class="fs-4" style="font-size:50px;">{{ post.title }}</strong>
                        </p>
                        <a @click="selectedAuthor(post.author)" class="align-items-right" style="text-decoration:none;">{{ post.author }}</a>
                    </header>
                    <p @click="selectedPost = post" v-html="$options.filters.ellipsis(post.content)"></p>
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
    name: "AllPosts",
    props:['searchAuthor'],
    data() {
        console.log('username::'+localStorage.getItem('username'))
        this.getDatas(this.searchAuthor)
        return {
        posts: [],
        selectedPost: null,
        fontsize:"25px",
    }},
    methods:{
        async getDatas(author){
            console.log(author)
            await this.axios.post(localStorage.getItem('url')+'/api/allposts', {
              author:author
            }).then((res)=>{
                console.log(res.data)
                this.posts=res.data
            }).catch((err)=>{
                console.log(err)
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
        async selectedAuthor(author){
            this.getDatas(author)
        },
    },
    watch: {
        selectedAuthor () {
            console.log('====>>>', this.searchAuthor)
            this.author=this.searchAuthor
        }
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



