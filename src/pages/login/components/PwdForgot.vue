<template>
    <div class="modal" id="myModal">
  <div class="modal-dialog">
    <div class="modal-content">
 
      <!-- 模态框头部 -->
      <div class="modal-header">
        <h4 class="modal-title">模态框标题</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
 
      <!-- 模态框内容 -->
      <div class="modal-body">
        模态框内容..
      </div>
 
      <!-- 模态框底部 -->
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">关闭</button>
      </div>
 
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'PwdForgot',
  methods:{
      register(){
          axios.post('http://127.0.0.1:8083/pwdforgot', {
            userid: this.register_id,
            password: this.register_pwd
            })
            .then(function (response) {
            console.log(response);
            })
            .catch(function (error) {
            console.log(error);
  });
      }
  }
}
</script>