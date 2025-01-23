<template>
<div>
  <transition name="ontop-fade">
      <v-card v-if="mountedDOM" style="animation-duration: .8s !important" class="elevation-0 rounded-0 mb-md-0 mb-15" color="principal" height="26rem">
        <Wave class="mb-md-n1 mb-n2"></Wave>
      </v-card>
  </transition>

  <v-row no-gutters class="onwave pl-md-8 px-3">
    <v-col cols="12" md="6" class="pt-md-15 pt-6 text-background text-center">
      <transition name="fade-in">
        <div style="animation-duration: 1s !important;" v-if="mountedDOM">
          <p class="font-weight-medium mb-4" style="font-size: 1.7rem;">
            ¡{{$store.persist.user.logged ? 'Bienvenida de nuevo' : 'Aprovecha nuestra oferta exclusiva'}}! 
          </p>
          <p class="font-weight-thin" style="font-size: 1.2rem;" v-if="!$store.persist.user.logged">
            Suscríbete a AQUAPURIF hoy y <strong>ahorra 5€ al mes durante los primeros 3 meses</strong>. Purifica tu agua por solo 25€ al mes. 
            <strong>¡No dejes pasar esta oportunidad de cuidar tu salud y la de tu familia!</strong>
          </p>
          <p class="font-weight-thin" style="font-size: 1.2rem" v-else>
            ¡GRACIAS POR SER PARTE DE AQUAPURIF! Tu próxima entrega está programada para el día <strong>02/02/2025</strong>
          </p>

          <v-row no-gutters class="justify-center mt-md-8 mt-4">
            <v-btn class="glow-btn text-capitalize px-15" color="green" size="x-large" 
                    @click="$router.push(`/${$store.persist.user.logged ? 'prices' : 'register'}`)">
              {{$store.persist.user.logged ? 'Adelantar' : '¡Suscríbete ahora!'}}
            </v-btn>
          </v-row>
        </div>
      </transition>
    </v-col>

    <v-col cols="12" md="6" class="pt-md-0 pt-n15 mt-n10 mt-md-0">
      <transition name="fade-in">
        <v-container fluid class="v-img-wrapper" style="animation-duration: 1.5s !important" v-if="mountedDOM">
          <v-img :src="`${$store.persist.FolderTheme}/head.png`" height="30rem"></v-img>
        </v-container>
      </transition>
    </v-col>
  </v-row>

  <v-row class="text-center justify-center" no-gutters :style="`padding-top: ${$vuetify.display.mdAndDown ? '18rem' : '5rem'} !important`">
    <v-col cols="12" md="4" class="px-md-15 px-6 mt-md-0" v-for="benefit, n in benefits" :key="'benefit'+n">
      <transition name="fade-in">
        <div v-if="mountedDOM" :style="`animation-duration: ${n+0.5}s !important`">
          <v-row class="justify-center pt-md-0 pt-15">
              <v-img :src="`${$store.persist.FolderTheme}/${benefit.img}`" height="12rem"></v-img>
          </v-row>
  
            <p class="mt-10 font-weight-medium" style="font-size: 1.2rem;">{{ benefit.title }}</p>
            <p class="my-5 font-weight-light" style="font-size: 1rem;">{{ benefit.text }}</p>
        </div>
      </transition>
    </v-col>
  </v-row>
  
</div>
</template>

<script setup>
import { ref } from 'vue'

//data
const benefits = ref([
  {img: 'clean_water.png', title: 'Agua más limpia y saludable', text: 'Elimina contaminantes como cloro, sedimentos, metales pesados y microorganismos, proporcionando agua pura para proteger la salud de toda tu familia.'},
  {img: 'reduces_plastic.png', title: 'Ahorro económico y ecológico', text: 'Reduce el gasto en agua embotellada y contribuye al cuidado del medio ambiente al disminuir el uso de plásticos de un solo uso.'},
  {img: 'best_flavor.png', title: 'Mejor sabor y calidad en alimentos', text: 'El agua purificada mejora el sabor del agua que consumes directamente y también de los alimentos y bebidas que preparas, como café, té y sopas.'},
])
const mountedDOM = ref(false) //para que los efectos de entrada se realicen despues de montar el DOM

//Hooks
onBeforeMount(() => {
  setTimeout(() => {
    mountedDOM.value = true
  }, 500);
});
</script>

<style scoped>
.onwave{
  position: absolute;
  top: 4rem;
  width: 95vw;
}
</style>