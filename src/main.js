import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
//使用element初始化样式
import 'element-plus/dist/index.css';

//create  APP
const app = createApp(App);
// 使用模块
app.use(ElementPlus);
app.use(store);
app.use(router);
app.mount('#app');
