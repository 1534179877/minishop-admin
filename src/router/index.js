import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/', //当路径是 ‘/’ 的时候
    redirect: '/login', //重定向到/login 这个路径
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/admin/AdminIndex'), //这个路径 会显示这个组件
    redirect: '/admin/user',
    //这个路径的子路径
    children: [
      {
        path: '/admin/user',
        component: () => import('@/views/admin/children/userAdmin'),
      },
      {
        path: '/admin/goods',
        component: () => import('@/views/admin/children/goodsAdmin'),
      },
      {
        path: '/admin/swiper',
        component: () => import('@/views/admin/children/swiperAdmin'),
      },
      {
        path: '/admin/floor',
        component: () => import('@/views/admin/children/floorAdmin'),
      },
      {
        path: '/admin/item',
        component: () => import('@/views/admin/children/itemAdmin'),
      },
      {
        path: '/admin/order',
        component: () => import('@/views/admin/children/orderAdmin'),
      },
    ],
  },
  {
    path: '/login',
    name: '/login',
    component: () => import('@/views/LoginView.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
