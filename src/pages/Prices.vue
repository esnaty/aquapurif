<template>
<div>
<v-row no-gutters class="px-md-15 py-5">
    <v-col cols="12" md="4" v-for="plan, n in planes" :key="'plan'+n" class="pa-md-3 pa-1">
        <CardPlan
            :plan="plan"
            :seconds="n ? n-0.2 : 0.5"
            :isActive="($store.persist.user.logged && $store.persist.user.plan == plan.id) ? true : false"
            @clickPlan="suscribePlan($event)"
            :position="n"
        ></CardPlan>
    </v-col>
</v-row>

<ConfirmationDialog ref="confirm"/>
</div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useGlobalVariables } from '../composed/useGlobalVariables.js'

import ConfirmationDialog from '@/components/ConfirmationDialog.vue';

//Global Variables
const { store, router } = useGlobalVariables()

//data
const planes = ref([
    {
        id: 1,
        name: 'Bronze',
        benefits: [
            {   title: 'Botellas ilimitadas al mes', 
                active: false, 
                description: 'Límite de 4 botellas de 20 litros al mes' 
            },
            {   title: 'Dispensador de agua', 
                active: true, 
                description: 'Este dispensador no incluye doble grifo ni termostato' 
            },
            {   title: 'Purificador de agua de grifos', 
                active: false, 
                description: '' 
            },
            {   title: 'Purificador de agua de duchas', 
                active: false, 
                description: '' 
            },
        ],
        price: '30€',
        discount: 'Contratando ahora 5€ de descuento en las 3 primeras facturas'
    },
    {
        id: 2,
        name: 'Silver',
        benefits: [
            {   title: 'Botellas ilimitadas al mes', 
                active: false, 
                description: 'Límite de 4 botellas de 20 litros al mes' 
            },
            {   title: 'Dispensador de agua', 
                active: true, 
                description: 'Incluye doble grifo y termostato' 
            },
            {   title: 'Purificador de agua de grifos', 
                active: true, 
                description: 'Purifica el agua de hasta 2 grifos'
            },
            {   title: 'Purificador de agua de duchas', 
                active: false, 
                description: '' 
            },
        ],
        price: '45€',
        discount: 'Contratando ahora 8€ de descuento en las 3 primeras facturas'
    },
    {
        id: 3,
        name: 'Gold',
        benefits: [
            {   title: 'Botellas ilimitadas al mes', 
                active: true, 
                description: '' 
            },
            {   title: 'Dispensador de agua', 
                active: true, 
                description: 'Incluye doble grifo y termostato' 
            },
            {   title: 'Purificador de agua de grifos', 
                active: true, 
                description: 'Purifica el agua de hasta 5 grifos' 
            },
            {   title: 'Purificador de agua de duchas', 
                active: true, 
                description: 'Purifica el agua de hasta 3 duchas' 
            },
        ],
        price: '65€',
        discount: 'Contratando ahora 10€ de descuento en las 3 primeras facturas'
    }
])

//refs
const confirm = ref(null)

//methods
const suscribePlan = (plan) => {
    if(store.persist.user.logged){
        confirmPlan(plan)
    }else{
        router.push('/register')
    }
}

const confirmPlan = async (plan) => {
    const title = `Suscripción al plan ${plan.name}`;
    const message = `¿Está seguro de que desea contratar el plan ${plan.name}?`;

    if(await confirm.value?.open(title, message)) {
        store.unpersist.loadPage = {
            show: true,
            text: 'Suscribiendote al plan...'
        }

        setTimeout(() => {
            store.persist.user.plan = plan.id
            store.unpersist.loadPage.show = false
            store.unpersist.snackbar = {
                show: true,
                type: 'success',
                text: '¡Felicidades! Has contratado el plan con exito'
            }
        }, 1500)
    }
}
</script>