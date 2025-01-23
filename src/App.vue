<template>
  <v-app class="transition-bg">
    <!-- snackbar para toda la app se manipula mendiante el store -->
    <v-snackbar
      v-model="$store.unpersist.snackbar.show"
      :timeout="$store.unpersist.snackbar.time ?? 3000 "
      :color="$store.unpersist.snackbar.type"
      location="top right"
    >
      <v-icon left color="white">
        {{ ($store.unpersist.snackbar.type == 'error') ? 'mdi-close-circle' :
            ($store.unpersist.snackbar.type == 'warning') ? 'mdi-alert' : 'mdi-check-circle'}}
      </v-icon><span class="ml-2 white--text font-weight-light">{{ $store.unpersist.snackbar.text }}</span>
    </v-snackbar>

    <!-- loader para toda la app se manipula mendiante el store -->
    <v-overlay
      :model-value="$store.unpersist.loadPage.show"
      class="align-center justify-center"
      absolute
      persistent
    >
      <v-row class="justify-center mb-4">
        <div class="loader" :style="`border: 2px solid #000;`"></div>
      </v-row>
      <p class="font-weight-bold text-center text-black" style="font-size: 1.1rem">{{ $store.unpersist.loadPage.text }}</p>
    </v-overlay>

    <transition name="ontop-fade">
      <!-- Barra Superior -->
      <v-app-bar app color="principal" class="rounded-0 px-5 py-1" scroll-behavior="elevate" scroll-threshold="121" density="compact" v-if="mountedDOM" style="animation-duration: .5s !important">
        <!-- el icono hamburguesa aparece solo en el caso de los dispositivos medianos o pequeños -->
        <template v-slot:prepend v-if="$vuetify.display.mdAndDown">
          <v-app-bar-nav-icon @click="drawer = !drawer" color="background"></v-app-bar-nav-icon>
        </template>

        <v-row no-gutters class="align-center">
            <v-col :cols="($vuetify.display.mdAndDown) ? 9 : 4">
              <!-- logo principal -->
              <transition name="fade-in">
                <v-img :src="`${$store.persist.FolderTheme}/Logo_Hz.png`" style="max-width: 10rem !important;" class="mx-2" v-if="mountedDOM"></v-img>
              </transition>
            </v-col>

            <v-col cols="5" class="d-flex justify-center" v-if="!$vuetify.display.mdAndDown">
              <!-- Esta barra de navegación solo aparece en dispositivos grandes -->
              <v-list density="compact" nav v-model="$route.path" class="d-flex justify-center bg-transparent" color="background">
                  <v-list-item
                              :title="item.title"
                              :to="item.to"
                              class="bg-transparent px-5 text-background"
                              router-link
                              v-for="item, n in menu" :key="'nav'+n"
                  ></v-list-item>
              </v-list>
            </v-col>
        </v-row>

        <template v-slot:append>
          <div v-if="$store.persist.user.logged">
            <!-- En caso de que exista una sesión abierta -->
            <v-avatar size="28" class="mr-2" icon="mdi-account-circle" v-if="!$vuetify.display.mdAndDown"></v-avatar>
            <span v-if="!$vuetify.display.mdAndDown">{{ $store.persist.user.mail }}</span>
            <v-btn icon="mdi-logout" color="background" @click="$store.persist.logout($router)"></v-btn>
          </div>
          
          <v-btn icon="mdi-login" color="background" @click="$router.push('/login')" v-if="!$store.persist.user.logged && $route.path != '/login'"></v-btn>
          
          <!-- Cambio de tema Claro / Oscuro -->
          <v-switch
            @change="toggleTheme()"
            hide-details
            inset
            v-model="$store.persist.actualTheme"
            false-value="light"
            true-value="dark"
            color="green"
            true-icon="mdi-weather-night"
            false-icon="mdi-white-balance-sunny"
          ></v-switch>
        </template>
      </v-app-bar>
    </transition>


    <!-- este drawer suplanta la barra de navegación superior en el caso de los dispositivos medianos y pequeños -->
    <v-navigation-drawer
      temporary
      v-model="drawer"
      v-if="$vuetify.display.mdAndDown"
      elevation="3"
      color="background"
      class="pt-5"
    >
      <v-list v-if="$store.persist.user.logged">
        <v-list-item
          class="rounded-lg"
          :title="$store.persist.user.mail"
          link
          @click="$router.push(`/usersForm/edit/${$store.persist.user.id}`)"
        >
          <template v-slot:prepend>
              <div>
              <v-avatar size="28" class="mr-2">
                  <v-icon icon="mdi-account-circle" color="principal"></v-icon>
              </v-avatar>
              </div>
          </template>
        </v-list-item>
      </v-list>

      <v-divider v-if="$store.persist.user.logged"></v-divider>

      <v-list density="compact" nav v-model="$route.path" color="principal">
          <v-list-item :prepend-icon="item.icon"
                      :title="item.title"
                      :to="item.to"
                      router-link
                      v-for="item, n in menu" :key="'nav'+n"
          ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>

    <!-- Se declaró en elemento en el meta de la ruta para que el footer aparezca solo en algunas páginas -->
    <Footer v-if="$route.meta.footer && mountedDOM"></Footer>
  </v-app>
</template>

<script setup>
//imports
import { ref, onBeforeMount, watch } from 'vue';
import { useGlobalVariables } from './composed/useGlobalVariables.js'
import Footer from '@/components/Footer.vue'

import { useTheme } from 'vuetify'

//Global Variables
const { store, http } = useGlobalVariables()

//data
const theme = useTheme()
const drawer = ref(false)
const mountedDOM = ref(false) //para que los efectos de entrada se realicen despues de montar el DOM

//Hooks
onBeforeMount(() => {
  /*seteo el tema actual almacenado en el store persistente
    evitando que al recargar la página vuelva al estado inicial
  */
  theme.global.name.value = store.persist.actualTheme 
  setTimeout(() => {
    mountedDOM.value = true
  }, 500);
});

//computeds
const bgcolor = computed(() => theme.global.current.value.colors.background)
const menu = computed(() => {
  let menu = [
    {title: 'Inicio', to: '/', icon: 'mdi-home'},
    {title: 'Planes', to: '/prices', icon: 'mdi-cash'},
    {title: 'Productos', to: '/products', icon: 'mdi-water'},
  ]

  if(!store.persist.user.logged){
    //el "suscribete" solo aparece en caso de que no haya login ya que es la página de registro
    menu.push({title: 'Suscríbete', to: '/register', icon: 'mdi-account-plus'},)
  }

  return menu
})


//Methods
const toggleTheme = () => {
  //cambio de tema claro/oscuro
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
  store.persist.setActualTheme(theme.global.current.value.dark ? 'dark' : 'light')
}
</script>

<style>
/* Aplica una transición suave al cambiar temas */
.transition-bg {
  transition: background-color 0.3s ease-in, color 0.5s ease-in-out !important;
}

.v-img_img{
  transition: src 0.8s ease !important;
}

.on-selected{
  background-color: rgba(255, 255, 255, 0.5) !important;
}

/* animacion de vaso con agua para el loader */
.loader {
  width: 32px;
  height: 72px;
  display: inline-block;
  left: 5px;
  position: relative;
  box-sizing: border-box;
  animation: animloader 2s linear infinite alternate;
  color: #00aeef;
  border-radius: 0 0 4px 4px;
  transform: perspective(140px) rotateX(-45deg);
}

@keyframes animloader {
  0% {
    box-shadow: 0 0  inset;
  }
  100% {
    box-shadow: 0 -70px inset;
  }
}
</style>