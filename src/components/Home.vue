<template>
<div class="container">
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
      <TabMenu v-model:personal="personal" class="ms-auto"/>
    </header>
</div>
<div v-if="personal === true" 
  class="container">
  <nav class="navbar navbar-expand-sm bg-white">
    <ul class="navbar-nav me-auto">
      <li class="nav-item">
        <button class="navbar-link"
          v-for="tab in tabs"
          v-bind:key="tab"
          v-bind:class="['tab-button', { active: currentTab === tab }]"
          v-on:click="currentTab = tab"
        >
        {{ tab }}
        </button>
      </li>
    </ul>
  </nav>
  <div >
    <component v-bind:is="currentTabComponent"></component>
  </div>
</div>
<div v-else>
    <AllPosts :searchAuthor="author"></AllPosts>
</div>
  
</template>

<script>
import TabHome from './home/HomeTab'
import TabPosts from './home/PostTab'
import TabArchive from './home/ArchiveTab'
import TabMenu from './home/MenuTab'
import AllPosts from './home/AllPost'
export default{
    name: "HomeIndex",
    components: {
        TabHome,TabPosts,TabArchive,TabMenu,AllPosts
    },
    data() {
      return {
        currentTab: 'Home',
        tabs: ['Home', 'Posts', 'Archive'],
        personal:false,
        author:''
      }
    },
    computed: {
      currentTabComponent() {
        return 'tab-' + this.currentTab.toLowerCase()
      }
    },
}
</script>


<style scoped>
.tab-button {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #e0e0e0;
  margin-bottom: -1px;
  margin-right: -1px;
}
.tab-button:hover {
  background: #7fc4f6;
}
.tab-button.active {
  background: #feaaaa;
}
.demo-tab {
  border: 1px solid #ccc;
  padding:10px;
}
.blog-post{
    margin: auto;
    padding: 30px;
    width: 70%;
    box-sizing: border-box
}
</style>