const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    //proxy跨域配置   浏览器不同的域名会有跨域问题（不让你访问）
    //port:8000,
    proxy: {
      '/api': {
        target: 'http://localhost:7001',
        pathRewrite: {
          // 重写
          '^/api': '',
        },
        ws: false,
        changeOrigin: true,
      },
    },
  },
});
