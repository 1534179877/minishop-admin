import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/admin/AdminIndex'),
    redirect: '/admin/user',
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
