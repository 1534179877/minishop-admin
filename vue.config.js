const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    //proxy跨域配置
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
