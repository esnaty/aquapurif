<template>
<div class="wave">
    <svg viewBox="0 0 1340 320" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path
            :fill="bgcolor"
            d="M0,256L48,229.3C96,203,192,149,288,138.7C384,128,480,160,576,181.3C672,203,768,213,864,213.3C960,213,1056,203,1152,181.3C1248,160,1344,128,1392,112L1440,96V320H1392C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320H0Z"
        ></path>
    </svg>
</div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useTheme } from 'vuetify'

const props = defineProps(({
    color:{
        type: String, default: 'background'
    }
}))

//data
const theme = useTheme()

//computeds
const bgcolor = computed(() => theme.global.current.value.colors[props.color])
</script>

<style scoped>
.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 15vh; /* La altura de la onda es el 10% del viewport */
}

svg {
  width: 100% !important;
  height: 100% !important; /* Asegura que el SVG ocupe todo el contenedor responsivo */
}

path{
    transition: fill ease-in 0.5s !important;
}
</style>