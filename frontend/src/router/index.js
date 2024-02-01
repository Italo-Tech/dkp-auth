import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import("../views/Auth/Login.vue"),
      // meta: { isAuthenticated: false }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import("../views/Auth/Register.vue"),
      // meta: { isAuthenticated: false }
    },
    {
      path: "",
      component: () => import("../views/Layout/Theme.vue"),
      // meta: { isAuthenticated: true },
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import("../views/Home.vue"),
        },
        {
          path: '/users',
          name: 'Users',
          component: () => import("../views/Users.vue"),
        },
        {
          path: '/profile',
          name: 'Profile',
          component: () => import("../views/Profile.vue"),
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
  // console.log(to)
  /!*if (to.name !== 'Login' && !store.state.auth.isAuthenticated)
    next({ name: 'Login' })
  else {
    next({ name: 'Users' })
  }*!/

  /!*if ('isAuthenticated' in to.meta &&
      to.meta.isAuthenticated &&
      !store.getters[`isAuthenticated/${IS_USER_AUTHENTICATE_GETTER}`]
  ) {
    next('/login');
  } else if (
      'isAuthenticated' in to.meta &&
      !to.meta.isAuthenticated &&
      store.getters[`isAuthenticated/${IS_USER_AUTHENTICATE_GETTER}`]
  ) {
    next('/posts');
  } else {
    next();
  }*!/
})*/

export default router

