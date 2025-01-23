// Plugins
import axios from '@/middlewares/index'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import pinia from '@/stores'
import vuetify from '@/plugins/vuetify'
import router from '@/router'
import { usePersistStore } from '@/stores/persist'
import { useUnpersistStore } from '@/stores/unpersist';

// Components
import App from './App.vue'
import { createApp } from 'vue'

const app = createApp(App)

//declaro axios como variable global para no tener que importarlo en cada componente
app.config.globalProperties.$http = axios;

pinia.use(piniaPluginPersistedstate)
app.use(pinia);
app.use(vuetify);

//uno en una sola variable global a los stores (persistente y no persistente)
app.config.globalProperties.$store = {persist: usePersistStore(), unpersist: useUnpersistStore()}

//defino globalmente algunas reglas de validación que pueden usarse para formularios
app.config.globalProperties.$rules = {
    required: (v) => !!v || 'El campo es requerido',
    requiredOne: (v) => !!v.length || 'Debe seleccionar al menos una opción',
    minCharacters: (v, min) => !!(v.length >= min) || `Minimo ${min} caracteres`,
    onlyNumbers: (v) => /^\d*$/.test(v) || 'Solo se permiten números.',
    maxLength: (v, max) => (v && v.length <= max) || `Máximo ${max} dígitos`,
}

app.use(router)

app.mount('#app')
