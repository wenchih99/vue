<template>
    <div class="container registration-container">
      <div class="input-group mb-3 title-input">
        <span class="input-group-text">Title</span>
        <input v-model="title" type="text" class="form-control" placeholder="Title">

        <button v-if="mark === false" @click="add" class="btn btn-primary btn-submit">
          <i class="fa fa-check" style="font-size:24px"></i>
        </button>
        <button v-else @click="save" class="btn btn-primary btn-submit">
          <i class="fa fa-check" style="font-size:24px"></i>
        </button>
      </div>
      <tip-tap v-model="content"></tip-tap>
      <!-- <code>{{content}}</code> -->
    </div>
</template>

<script>

import TipTap from './editor/TipTap'
import { useRoute,useRouter } from 'vue-router'
export default {
  name:"PostEditor",
  components: {
    TipTap
  },
  data() {
    return{
      title:"",
      content:"",
      mark:false
    }
  },
  beforeCreate()
  {
    if(localStorage.getItem('userid')==null){
      window.location.href="/"
      return
    }
  },
  mounted(){
    if(Object.keys(this.post).length === 0)
    {
      return
    }
    this.mark=true
    this.title=this.post.title
    this.content=this.post.content
  },
  setup()
  {
    const route = useRoute()
    const post=route.params
    const router = useRouter()
    return {post,router}
  },
  methods:{
    save(){
      console.log("save")
      this.axios.post('/modifypost', {
        id: this.post.id,
        title: this.title,
        content: this.content
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      this.router.go(-1)
    },
    add(){
      console.log("add")
      this.axios.post('/addpost', {
        title: this.title,
        content: this.content
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      this.router.go(-1)
    }
  }
}
</script>

<style>
.title-input{
  width:680px;
  margin: auto;
  padding-top: 60px;
}
.btn-submit{
    width: 8%;
    height: 50px;
}
</style>
