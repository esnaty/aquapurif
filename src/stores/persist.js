/* Store presistente, 
uso un plugin de PINIA para poder manejar un estado persistente, 
y manejar el localStorage desde mi store de manera mas facil*/
import { defineStore } from 'pinia'
import axios from 'axios'
import { useUnpersistStore } from './unpersist'

export const usePersistStore = defineStore('app', {
  state: () => ({
    user:{
      logged: false,
      mail: '',
      token: null,
      plan: 0
    },
    actualTheme: 'light',
    FolderTheme: './img/light',
  }),
  persist: true,
  actions:{
    setActualTheme(value = 'light'){
      this.FolderTheme = `./img/${value}`
    },
    setUser(value = null){
      this.user = value ?? {}
      console.log(value)
      this.user.logged = value ? true : false
    },
    login(router, data){
      const unpersist = useUnpersistStore()

      unpersist.loadPage = {
          text: 'Iniciando Sesión',
          type: 'loading',
          show: true
      }

      axios.post(`${import.meta.env.VITE_MAIN}/login`, data)
      .then((response) => {
        this.setUser({
          token: response.data.token,
          mail: data.email
        })
        router.replace((!this.user.plan) ? '/prices' : '/')
        unpersist.loadPage.show = false
      }).catch((error) => console.log(error))
    },
    logout(){
      this.setUser()
      this.businessSelected = null
      window.location.reload()
    }
  },
})
