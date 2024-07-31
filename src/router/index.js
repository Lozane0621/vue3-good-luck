import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
        // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/ssq',
      name: 'ssq',
      component: () => import('../views/SsqView.vue')
    },
    {
      path: '/dlt',
      name: 'dlt',
      component: () => import('../views/DltView.vue')
    },
    {
      path: '/ocr',
      name: 'ocr',
      component: () => import('../views/OcrView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});
router.afterEach(() => {
  NProgress.done();
});

export default router
