<template>
<div>
    <v-card :color="n%2 == 0 ? 'background' : 'principal'" :class="`elevation-${n%2 == 0 ? '0' : '5'}`" 
            v-for="product, n in products" :key="'product'+n" tile 
            :height="`${$vuetify.display.mdAndDown ? '46rem' : '32rem'}`"
            class="d-flex align-center"
    >
        <v-row no-gutters class="justify-center align-center px-md-10 px-2">
            <transition name="ontop-fade">
                <v-col cols="12" md="6" 
                    v-if="mountedDOM && (($vuetify.display.mdAndDown && scrollIn >= 550*n) || (!$vuetify.display.mdAndDown && scrollIn >= 420*n))" 
                    style="animation-duration: .8s;">
                    <p class="font-weight-bold text-center mb-2" style="font-size: 1.5rem;">{{ product.title }}</p>
                    <p class="font-weight-light text-center" style="font-size: 1rem;">{{ product.text }}</p>
                </v-col>
            </transition>

            <transition name="onbottom-fade">
                <v-col cols="12" md="6" 
                    v-if="mountedDOM && (($vuetify.display.mdAndDown && scrollIn >= 550*n) || (!$vuetify.display.mdAndDown && scrollIn >= 420*n))" 
                    style="animation-duration: 1s;">                    
                    <v-container fluid class="d-flex justify-center">
                        <v-img :src="`/img/products/${product.img}`" max-height="25rem"></v-img>
                    </v-container>
                </v-col>
            </transition>
        </v-row>
    </v-card>
</div>
</template>

<script setup>
import { ref, computed } from 'vue'

//data
const products = ref(
    [
        {
            img: 'Purificador1.png',
            title: 'Purificador de Agua Gold',
            text: 'Disfruta de agua pura y segura en cada gota con nuestro purificador de agua de última generación. Diseñado para eliminar impurezas, bacterias y contaminantes, este purificador garantiza agua cristalina y saludable para ti y tu familia. Fácil de instalar, con un diseño elegante que se adapta a cualquier espacio, y tecnología avanzada que conserva minerales esenciales mientras ofrece un ahorro significativo en botellas de plástico. ¡Transforma tu agua, mejora tu vida!'
        },
        {
            img: 'purificador2.png',
            title: 'Purificador de Agua Silver',
            text: 'El purificador de agua perfecto para hogares pequeños: compacto, eficiente y confiable. Diseñado específicamente para eliminar impurezas y contaminantes comunes, este dispositivo es ideal para garantizar agua fresca y saludable en cada vaso. Su tamaño reducido se adapta fácilmente a espacios limitados, ofreciendo una solución práctica y sostenible para quienes buscan calidad sin ocupar demasiado lugar. ¡La opción perfecta para una hidratación segura en casas pequeñas!'
        },
        {
            img: 'dispenser_doble.png',
            title: 'Dispensador de agua con termostato',
            text: 'Hidratación a tu medida con nuestro dispensador de agua de doble grifo. Diseñado para ofrecer agua fría y caliente al instante, es perfecto para cualquier ocasión: desde un refrescante vaso de agua hasta una taza de té caliente en segundos. Con un termostato integrado para un control preciso de la temperatura y un diseño elegante, este dispensador combina funcionalidad y comodidad. Ideal para hogares u oficinas que buscan versatilidad y estilo en un solo dispositivo.'
        },
        {
            img: 'dispenser.png',
            title: 'Dispensador de agua',
            text: 'Sencillo, práctico y funcional: nuestro dispensador de agua de botella es la solución perfecta para quienes buscan una hidratación fácil y accesible. Con un diseño compacto y un único grifo, es ideal para hogares u oficinas que necesitan una opción básica para servir agua sin complicaciones. Sin necesidad de termostato, este dispensador ofrece una experiencia simple y directa para mantenerte hidratado en cualquier momento del día.'
        },
        {
            img: 'botellon.png',
            title: 'Botellón de agua purificada de 20 litros',
            text: 'La elección perfecta para garantizar agua de la más alta calidad en tu hogar u oficina. Cada gota pasa por estrictos procesos de purificación para eliminar impurezas y preservar un sabor fresco y natural. Su tamaño ideal asegura hidratación para toda la familia o equipo de trabajo, brindándote confianza y salud en cada consumo. ¡Disfruta de agua pura y saludable, certificada con los más altos estándares de calidad!'
        },
    ]
)
const mountedDOM = ref(false) //para que los efectos de entrada se realicen despues de montar el DOM
const scrollIn = ref(0); // Almacena la posición actual del scroll

onMounted(() => {
    window.addEventListener("scroll", updateScrollPosition); // Escucha el evento de scroll
});

//Hooks
onBeforeMount(() => {
  setTimeout(() => {
    mountedDOM.value = true
  }, 500);
});

//methods
const updateScrollPosition = () => {
    scrollIn.value = window.scrollY; // Actualiza el valor con la posición actual del scroll
};
</script>