<template>
  <nav class="navbar navbar-expand-sm bg-white">
    <div>
      <i class="logo">logo</i>
      <a class="navbar-brand" href="#">BLOG</a>
    </div>
    

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
    <TabMenu />
  </nav>
  <div class="bg-light text-dark ">
    <component v-bind:is="currentTabComponent"></component>
  </div>
  
</template>

<script>
import TabHome from './home/HomeTab'
import TabPosts from './home/PostTab'
import TabArchive from './home/ArchiveTab'
import TabMenu from './home/MenuTab'
export default{
    name: "BlogIndex",
    
    components: {
        TabHome,TabPosts,TabArchive,TabMenu
  },
    data() {
      return {
        currentTab: 'Home',
        tabs: ['Home', 'Posts', 'Archive'],
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
</style>