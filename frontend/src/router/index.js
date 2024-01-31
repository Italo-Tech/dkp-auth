import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from "vuex";

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import("../views/Auth/Login.vue")
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import("../views/Auth/Register.vue")
    },
    {
      path: "",
      component: () => import("../views/Layout/Theme.vue"),
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import("../views/Home.vue")
        },
        {
          path: '/users',
          name: 'Users',
          component: () => import("../views/Users.vue"),
          // meta: { isAuthenticated: true }
        },
      ]
    },
    /*{
      path: '/:pathMatch(.*)*',
      redirect: { name: 'Home' }
    }*/
  ]
})

/*router.beforeEach((to, from, next) => {
  const store = useStore()

  if (to.name !== 'Login' && !store.state.isAuthenticated)
    next({ name: 'Login' })
  else next()
})*/
export default router

