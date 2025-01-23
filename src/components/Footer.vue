<template>
<div>
<v-card class="rounded-0 px-15 py-5" color="principal" v-if="mountedDOM" :height="$vuetify.display.mdAndDown ? '44rem' : '23rem'">
    <v-row no-gutters class="align-center" style="height: 90%;">
        <!-- sección de RRSS -->
        <v-col cols="12" :md="$store.persist.user.logged ? 6 : 4">
            <transition :name="$vuetify.display.mdAndDown ? 'fade-in' : 'onbottom-fade'">
                <div v-if="scrolledToEnd"  style="animation-duration: .7s !important">
                    <p class="text-center mb-1 text-background">¡Síguenos y enterate de más!</p>
                    <v-row no-gutters class="justify-center">
                        <v-icon :color="isHover == 'Ins' ? 'green' : 'background'" 
                                size="35"
                                class="mx-2"
                                @mouseenter="isHover = 'Ins'"
                                @mouseleave="isHover = null"
                                @click="openLink('https://instagram.com')"
                        >
                            mdi-instagram
                        </v-icon>

                        <v-icon :color="isHover == 'Fb' ? 'green' : 'background'" 
                                size="35"
                                class="mx-2"
                                @mouseenter="isHover = 'Fb'"
                                @mouseleave="isHover = null"
                                @click="openLink('https://facebook.com')"
                        >
                            mdi-facebook
                        </v-icon>
        
                        <v-icon :color="isHover == 'Ytb' ? 'green' : 'background'" 
                                size="35" 
                                class="mx-2"
                                @mouseenter="isHover = 'Ytb'"
                                @mouseleave="isHover = null"
                                @click="openLink('https://youtube.com')"
                        >
                            mdi-youtube
                        </v-icon>
                    </v-row>

                    <p class="text-center mb-1 mt-5 text-background">¡Trabaja con nosotros!</p>
                    <v-row no-gutters class="justify-center">
                        <v-icon :color="isHover == 'Lin' ? 'green' : 'background'" 
                                size="35"
                                class="mx-2"
                                @mouseenter="isHover = 'Lin'"
                                @mouseleave="isHover = null"
                                @click="openLink('https://linkedin.com')"
                        >
                            mdi-linkedin
                        </v-icon>
                    </v-row>
                </div>
            </transition>
        </v-col>

        <!-- Logotipo -->
        <v-col cols="12" :md="$store.persist.user.logged ? 6 : 4" class="d-flex align-center justify-center">
            <transition :name="$vuetify.display.mdAndDown ? 'fade-in' : 'ontop-fade'">
                <v-container fluid v-if="scrolledToEnd"  style="animation-duration: .7s !important">
                    <v-img :src="`${$store.persist.FolderTheme}/Logo_simple2.png`" height="15rem"></v-img>
                </v-container>
            </transition>
        </v-col>

        <!-- llamado a suscribirse solo aparece si no hay sesión activa -->
        <v-col cols="12" md="4" v-if="!$store.persist.user.logged">
            <transition :name="$vuetify.display.mdAndDown ? 'fade-in' : 'onbottom-fade'">
                <v-row no-gutters class="justify-center mt-md-8 mt-4" v-if="scrolledToEnd"  style="animation-duration: .7s !important">
                    <p class="font-weight-medium mb-4 text-background" style="font-size: 1.3rem;">
                        ¡Invierte en agua, invierte en salud! 
                    </p>

                    <v-btn class="glow-btn text-capitalize px-15" color="green" size="large" @click="$router.push('/register')">
                        ¡Suscríbete ahora!
                    </v-btn>
                </v-row>
            </transition>
        </v-col>
    </v-row>

    <!-- derechos del sitio-->
    <v-row no-gutters class="my-2" style="height: 10%;">
        <v-col cols="12">
            <v-divider color="background" :thickness="2" class="border-opacity-50 mb-3"></v-divider>
            <p class="text-center text-background text-caption">
                <span class="mx-5">Copyright © 2025 AQUAPURIF S.A.</span> | <strong class="mx-5"><a href="">Política de Privacidad</a></strong>
            </p>
        </v-col>
    </v-row>
</v-card>
</div>
</template>

<script setup>
import { ref } from 'vue'

//data
const isHover = ref(null)
const mountedDOM = ref(false) //para que los efectos de entrada se realicen despues de montar el DOM
const scrolledToEnd = ref(false)

//refs
const footerRef = ref(null)

//Hooks
onBeforeMount(() => {
  setTimeout(() => {
    mountedDOM.value = true
  }, 500);

  window.addEventListener("scroll", () => {
    checkScrollPosition()
  });
});

onUnmounted(() => {
    window.removeEventListener("scroll", checkScrollPosition());
});

//methods
const openLink = (link) => {
    open(link, '_blank')
}

const checkScrollPosition = () => {
    //Para que la entrada de los elementos se ejecute solo al llevar el scroll casi al final de la pagina
    let totalScroll = document.documentElement.scrollHeight - window.innerHeight
    let position = totalScroll*0.85
    if (window.scrollY >= position) {
        scrolledToEnd.value = true; // Activamos la animación cuando la sección es visible
    } 
};
</script>