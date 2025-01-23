// Composables
import { createRouter, createWebHashHistory } from 'vue-router/auto'
import { usePersistStore } from '@/stores/persist'

// Aquí defines tus rutas
const routes = [
  {
    path: "/",
    name: "home",
    props: true,
    component: () => import("../pages/Home.vue"),
    meta: { footer: true }
  },
  {
    path: "/login",
    name: "login",
    props: true,
    component: () => import("../pages/login.vue"),
    meta: { requireLogout: true }
  },
  {
    path: "/register",
    name: "register",
    props: true,
    component: () => import("../pages/Register.vue"),
    meta: { requireLogout: true }
  },
  {
    path: "/prices",
    name: "prices",
    props: true,
    component: () => import("../pages/Prices.vue"),
    meta: {footer: true}
  },
  {
    path: "/products",
    name: "products",
    props: true,
    component: () => import("../pages/Products.vue"),
    meta: {footer: true}
  },
  {
    path: "/account",
    name: "account",
    props: true,
    component: () => import("../pages/Account.vue"),
    meta: {requiresAuth: true}
  },
  {
    path: "/notFound",
    name: "notFound",
    component: () => import("../pages/notFound.vue")
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

router.beforeEach((to) => {
  if(to.path == '/home'){
    return {path: '/'} //redireccion al path home
  }

  const store = usePersistStore()
  const isAuthenticated = store.user.logged; 

  if (to.matched.length > 0) {
    if (to.meta.requiresAuth && !isAuthenticated) {
      return { path: '/login' }; // Redirigir si no está autenticado
    } else {
      if(to.meta.requireLogout && isAuthenticated){
        //en el caso de login y register se necesita que no exista una sesión abierta
        return { path: '/' }
      }else{ 
        return true // Permitir el acceso
      }
    }
  }else{
    //si no existe la ruta
    return {path: '/notFound'};
  }
});

export default router
