# rkl-admin

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
###项目结构
```
project
└───src
│   │   app.vue    // 主页面
│   │   main.js    // 主入口

│   │
│   |____assets    // css、image、svg等静态全局资源
│   |   |____css   // 所有sass资源
|	|
|	|
|   |____components    // 组件
│   |   |____topbar    // torbar组件  上面那一条
│   |       
|   |____network   // axios的封装 与后端的通信接口
|   |   | index.js       // 接口入口文件
|   |   | goods.js  // 所有业务网络接口
|   |   | user.js  //  用户的接口
|   |
|   |____router    // 路由
|   |   |____ index.js   // 所有路由  http://localhost:7001/login
|   |   
|   |____store     // vuex数据   数据持久化
|   |   |____ index.js   //主文件
|   |	|____modules //不同模块
|	|		|____user  //用户数据持久化 不会因为刷新丢失
|   |
|   |____views     // UI层视图   不同的页面
|   |   |____admin
|   |   |    |  goodsView.vue      // goodsView
|   |   |    |  floorView.vue    // floor
|   |   |    |  userView.vue      // user
|	|	|	 |  SWIPERvIEW    //swiper
|   |   |LoginView.vue
|
│   vue.config.js  // vue-cli3主配置
│   babel.config.js// babel配置
│   .eslintrc.js   // eslint配置
│   .prettierrc.js // perttier配置
│   package.json   // npm配置
│   README.md      // 项目说明
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
