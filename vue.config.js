const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pages:{
    login:{
      entry:'src/pages/login/main.js',
      template:'public/login.html',
      filename:'login.html',
    },
    blog:{
      entry:'src/pages/blog/main.js',
      template:'public/blog.html',
      filename:'blog.html',
    },
    index:'src/main.js',
  }
})
