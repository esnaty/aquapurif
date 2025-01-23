<template>
<div>
    <v-row class="pt-10">
        <v-col cols="12" class="d-flex justify-center">
            <v-img max-width="20rem" :src="`${$store.persist.FolderTheme}/NotFound.png`"></v-img>
        </v-col>
        <v-col cols="12">
            <p class="font-weight-bold text-center" style="font-size: 2rem;">¡Lo sentimos!</p>
            <p class="font-weight-light text-center" style="font-size: 1.8rem;">Página no encontrada</p>
        </v-col>
    </v-row>
</div>
</template>