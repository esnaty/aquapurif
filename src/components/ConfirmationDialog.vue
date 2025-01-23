<template>
<!-- Dialogo de confirmación reutilizable para toda la app -->
<v-dialog
    v-model="dialog"
    max-width="500"
    persistent
>
    <v-card class="rounded-lg text-onback" color="background">
      <v-card-title>
        <v-row no-gutters class="align-center">
            <v-col cols="10" class="font-weight-medium" style="font-size: 1.2rem;">{{ title }}</v-col>
            <v-col cols="2" class="d-flex justify-end">
                <v-btn icon="mdi-close" density="compact" variant="text" @click="cancel">
                </v-btn>
            </v-col>
        </v-row>
      </v-card-title>

      <v-card-text class="text-center pa-10">
          {{ message }}
      </v-card-text>
      <v-card-actions class="d-flex justify-center pb-4">
        <v-btn
          color="red"
          text
          @click="cancel"
        >
            {{button1}}
            <v-icon right small>
                  mdi-cancel
            </v-icon>
        </v-btn>
        <v-btn
          variant="tonal"
          color="green"
          @click="accept"
        >
            {{button2}}
            <v-icon right small>
                  mdi-check-circle-outline
            </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script setup>
//imports
import { ref, onBeforeMount, watch, computed } from 'vue';

//data
const dialog = ref(false)
const resolve = ref(null)
const reject = ref(null)
const message = ref(null)
const title = ref(null)
const button1 = ref('Cancelar')
const button2 = ref('Aceptar')
const options = ref({
                color: "background",
                width: 400,
                zIndex: 200,
                noconfirm: false,
            })

//Methods
const open = (titleText, messageText, button1Text = null, button2Text = null) => {
  // Asignar los datos correctamente
  dialog.value = true;
  title.value = titleText || title.value;
  message.value = messageText || message.value;
  button1.value = button1Text || "Cancelar";
  button2.value = button2Text || "Aceptar";

  // Retornar una promesa
  return new Promise((res, rej) => {
    resolve.value = res;
    reject.value = rej;
  });
};

const accept = () => {
  if (resolve.value) {
    resolve.value(true); // Llamar la función almacenada en resolve.value
  }
  dialog.value = false;
};

const cancel = () => {
  if (resolve.value) {
    resolve.value(false); // Llamar la función almacenada en resolve.value
  }
  dialog.value = false;
};

//Expongo el método 'open' para poder usarlo desde cualquier componente
defineExpose({ open });
</script>

<style scoped>

.title {
    font-size: 22px;
    color:#272F5D;
}

.v-btn {
   text-transform:none;
}

.text_sub {
    font-size: 14px;
}
.btn_close {
    color: #CED3D7;
}

</style>