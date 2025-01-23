<template>
<div>
<v-row class="justify-center py-md-10">
    <v-col cols="12" md="6">
        <transition name="fade-in">
            <v-card color="principal" 
                    class="py-8 px-10 my-auto elevation-md-3 elevation-0 text-background" 
                    v-if="mountedDOM"
                    style="animation-duration: .5s;"
                    :tile="$vuetify.display.mdAndDown"
            >
                <v-row no-gutters>
                    <v-col cols="12" class="d-flex justify-center">
                        <v-img :src="`${$store.persist.FolderTheme}/Logo_simple2.png`" max-width="10rem" class="mx-2"></v-img>
                    </v-col>
                    <v-col cols="12">
                        <p class="font-weight-thin text-center mb-0" style="font-size: 2rem;">Inicia Sesión</p>
                    </v-col>
                    <v-col cols="12" class="py-4">
                        <v-form ref="form" v-model="formValid">
                            <v-text-field
                                label="Mail"
                                placeholder="Dirección de email"
                                prepend-inner-icon="mdi-mail"
                                v-model="mail"
                                color="green"
                                variant="outlined"
                                density="compact"
                                class="mb-2"
                                hide-details="auto"
                                :rules="[$rules.required]"
                                @keypress.enter="initSesion"
                            ></v-text-field>
                            
                            <v-text-field
                                placeholder="Contraseña"
                                prepend-inner-icon="mdi-lock"
                                :append-inner-icon="viewPassword ? 'mdi-eye-off' : 'mdi-eye'"
                                :type="viewPassword ? 'text' : 'password'"
                                @click:append-inner="viewPassword = !viewPassword"
                                v-model="password"
                                color="green"
                                variant="outlined"
                                density="compact"
                                hide-details="auto"
                                class="mb-2"
                                :rules="[$rules.required]"
                                @keypress.enter="initSesion"
                            ></v-text-field>
                        </v-form>
                    </v-col>
                    <v-col cols="12">
                        <v-btn color="green" size="large" class="text-background" block @click="initSesion">
                            <v-icon class="mr-2">mdi-login</v-icon>Iniciar Sesión
                        </v-btn>
                        <p class="font-weight-light text-center mt-2" style="font-size: 1rem;">
                            ¿No tienes cuenta? 
                            <a @click="$router.push('/register')" style="cursor: pointer;">
                                <strong class="text-decoration-underline">Registrate</strong>
                            </a>
                        </p>
                    </v-col>
                </v-row>
            </v-card>
        </transition>
    </v-col>
</v-row>
</div>
</template>

<script setup>
//imports
import { ref, onBeforeMount, watch } from 'vue';
import { useGlobalVariables } from '../composed/useGlobalVariables.js'

//Global Variables
const { store, router } = useGlobalVariables()

//data
const mail = ref(null)
const password = ref(null)
const viewPassword = ref(false)
const mountedDOM = ref(false) //para que los efectos de entrada se realicen despues de montar el DOM

//refs
const form = ref(null) //Referencia ejemplo

//validations
const formValid = ref(false); //Estado de validación del formulario

//hooks
onBeforeMount(() => {
    setTimeout(() => {
        mountedDOM.value = true
    }, 500)
})

//methods
const initSesion = async () => {
    const { valid } = await form.value?.validate()
    if(valid){
        let data = { email: mail.value, password: password.value }
        store.persist.login(router, data)
    }
}
</script>