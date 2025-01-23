// En este store no periste ninguna propiedad, se maneja con el flujo natural del estado
import { defineStore } from 'pinia'

export const useUnpersistStore = defineStore('upersist', {
  state: () => ({
    snackbar:{
      show: false,
      text: '',
      type: 'success'
    },
    loadPage:{
      show: false,
      type: 'saving',
      text: 'Cargando Datos...'
    },
  }),
  persist: false,
  actions:{

  },
})
