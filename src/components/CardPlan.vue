<template>
<transition name="ontop-fade">
<v-card :class="`rounded-xl elevation-${position}`" v-if="mountedDOM" :style="`animation-duration: ${seconds}s !important`" color="principal-variant px-5 py-15 text-dark" height="32rem">
    <p class="text-center font-weight-bold" style="font-size: 2rem;">{{ plan.name }}</p>

    <v-list density="compact" class="bg-transparent pa-2" lines="two">
        <v-list-item :title="benefit.title"
                    :subtitle="benefit.description"
                    v-for="benefit, n in plan.benefits"
                    :key="'benefit'+n"
        >
            <template v-slot:append>
            <v-icon
                :color="benefit.active ? 'success' : 'error'"
                :icon="benefit.active ? 'mdi-check-circle' : 'mdi-close-circle'"
            ></v-icon>
            </template>
        </v-list-item>
    </v-list>

    <p class="mb-0 mt-n2 font-weight-bold text-center">{{ plan.price }} al mes</p>
    <p v-if="!$store.persist.user?.plan" class="text-primary mb-2 text-center" style="font-size: .8rem;">{{ plan.discount }} al mes</p>
    <v-row no-gutters class="justify-center pt-5">
        <v-btn size="x-large" color="green" @click="$emit('clickPlan', plan)" :disabled="isActive">
            {{ isActive ? 'Tu plan actual' : `Suscribirme a ${plan.name}` }}
        </v-btn>
    </v-row>
</v-card>
</transition>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'

const props = defineProps(({
    plan:{
        default: null
    },
    seconds: {
        default: 1
    },
    isActive: {
        default: false
    },
    position:{
        default: 0
    }
}))

//data
const mountedDOM = ref(false) //para que los efectos de entrada se realicen despues de montar el DOM

//hooks
onBeforeMount(() => {
    setTimeout(() => {
        mountedDOM.value = true
    }, 500)
})
</script>