<template>
<div class="modal-dialog">
    <div class="modal-content">
 
      <!-- 模态框头部 -->
      <div class="modal-header">
        <h4 class="modal-title">个人信息</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
 
      <!-- 模态框内容 -->
      <div class="modal-body">
        <div class="img-container"
          @click="isUpload">
          <a href="#">
            <img :src="headpic" class="headpic">
          </a>
        </div>
        <div v-show="isupload">
            <input type="file" @change="updatePic" id="pic">
        </div>
        

      </div>
 
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoSetting',
  props:{
    picurl:String
  },
  data(){
      return{
        // headpic:"http://127.0.0.1:8083/headpic",
        headpic:localStorage.getItem("url")+"/blog/headpic",
        isupload:false
      }
  },
  methods:{
    isUpload(){
      if(this.isupload==true){this.isupload=false;}
      else{this.isupload=true}
    },
    updatePic(data){
      var that =this
      let file = data.target.files[0];//拿到上传的file
      console.log(file)
      let fd = new FormData();//创建form对象
      fd.append("file", file);//为创建的form对象增加上传的文件
      console.log(fd)
      let config = { headers: { "Content-Type": "multipart/form-data" } }//修改请求头
      this.axios.post('/uploadpic',fd,config)
      .then(function (response) {
        console.log(response);
        that.headpic=that.headpic+"?flush"
        that.$emit('update:picurl',that.headpic)
      })
      .catch(function (error) {
        console.log(error);
      });
      //清空file标签
      this.isupload=false;
      var e = document.getElementById("pic");
      e.value=''
    }
  },
}
</script>
<style scoped>
.img-container{
position: relative;
margin: auto;
border-radius:100%;
overflow:hidden;
height:100px;
width: 100px;
}
.headpic{
position: absolute;
margin: auto;
height: 100%;
top: -99999px;
right: -99999px;
bottom: -99999px;
left: -99999px;
}
</style>
