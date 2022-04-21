const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // publicPath: './',
  // // 输出文件目录
  // outputDir: 'dist',
  pages:{
    login:{
      entry:'src/pages/login/main.js',
      template:'public/login.html',
      filename:'login.html',
    },
    index:'src/main.js',
  },
  devServer:{
    // host:"wenchih99.top",
    port:8081,
  }
})
