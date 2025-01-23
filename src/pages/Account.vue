<template>
<div class="pa-md-8 pa-4">
<transition name="fade-in">
    <v-card color="principal-variant" class="pa-3 text-dark" v-if="mountedDOM" style="animation-duration: .8s;">
        <v-container fluid>
            <v-img height="15rem" src="/img/logo/Logo_simple2.png"></v-img>
        </v-container>

        <p class="font-weight-bold text-center mb-2" style="font-size: 1.5rem;">
            ¡Bienvenida a tu cuenta AQUAPURIF!
        </p>

        <p style="font-size: 1.2rem;" class="text-center mb-2">
            ¡Gracias por ser parte de nosotros!
        </p>

        <div v-if="$store.persist.user.plan" class="mb-5">
            <p class="font-weight-light text-center" style="font-size: 1.2rem;">
                Estas suscrito al plan <strong>{{ 
                    $store.persist.user.plan == 1 ? 'Bronze' :
                    $store.persist.user.plan == 2 ? 'Silver' : 'Gold'
                }}</strong>
            </p>

            <p style="font-size: 1.2rem;" class="text-center">
                Tu próxima entrega está pautada para el día <strong>02/02/2025</strong>.
            </p>
        </div>

        <p class="font-weight-bold text-center text-error mb-5" style="font-size: 1.5rem;" v-else>
            Aún no te has suscrito a ninguno de nuestros planes
        </p>

        <v-row no-gutters class="justify-center">
            <v-btn class="glow-btn text-capitalize px-15" color="green" size="x-large" 
                        @click="$router.push('/prices')">
                {{$store.persist.user.plan ? 'Adelantar' : '¡Suscríbete ahora!'}}
            </v-btn>
        </v-row>
    </v-card>
</transition>
</div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'

const mountedDOM = ref(false) //para que los efectos de entrada se realicen despues de montar el DOM

//Hooks
onBeforeMount(() => {
  setTimeout(() => {
    mountedDOM.value = true
  }, 500);
});
</script>