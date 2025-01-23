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
                        <p class="font-weight-thin text-center mb-0" style="font-size: 2rem;">Regístrate</p>
                    </v-col>
                    <v-col cols="12" class="py-4">
                        <v-form ref="form" v-model="formValid">
                            <v-text-field
                                label="Mail"
                                placeholder="Dirección de email"
                                prepend-inner-icon="mdi-email"
                                v-model="mail"
                                color="green"
                                variant="outlined"
                                density="compact"
                                class="mb-2"
                                hide-details="auto"
                                :rules="[$rules.required]"
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
                                :rules="[$rules.required, $rules.minCharacters(password ?? '', 6)]"
                            ></v-text-field>
                            
                            <v-text-field
                                placeholder="Repite la Contraseña"
                                prepend-inner-icon="mdi-lock"
                                :append-inner-icon="viewPassword ? 'mdi-eye-off' : 'mdi-eye'"
                                :type="viewPassword ? 'text' : 'password'"
                                @click:append-inner="viewPassword = !viewPassword"
                                v-model="passwordRepeat"
                                color="green"
                                variant="outlined"
                                density="compact"
                                hide-details="auto"
                                class="mb-2"
                                :rules="(!password) ? [$rules.required] : [$rules.required, (v) => password === v || 'Las contraseñas deben coincidir']"
                            ></v-text-field>
                        </v-form>
                    </v-col>
                    <v-col cols="12">
                        <v-btn color="green" size="large" class="text-background" block @click="addUser">
                            <v-icon class="mr-2">mdi-account-plus</v-icon>Crear Cuenta
                        </v-btn>
                        <p class="font-weight-light text-center mt-2" style="font-size: 1rem;">
                            Ya tienes cuenta? 
                            <a @click="$router.push('/login')" style="cursor: pointer;">
                                <strong class="text-decoration-underline">Inicia Sesión</strong>
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
const { store, router, http } = useGlobalVariables()

//data
const mail = ref(null)
const password = ref(null)
const passwordRepeat = ref(null)
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
const addUser = async () => {
    const { valid } = await form.value?.validate()
    if(valid){
        store.unpersist.loadPage = { show: true, text: 'Creando usuario' }
        let data = { email: mail.value, password: password.value }
        http.post(`${import.meta.env.VITE_MAIN}/register`, data)
        .then((response) => {
            store.persist.login(router, data)
        }).catch((error) => console.log(error))
    }
}
</script>