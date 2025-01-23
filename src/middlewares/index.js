import axios from "axios";
import { usePersistStore } from "@/stores/persist";
import { useUnpersistStore } from "@/stores/unpersist";
axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";

axios.interceptors.response.use(
  (response) => {
    return response ? response : null;
  },
  (error) => {
    const store = useUnpersistStore()
    if (error?.response?.status === 400) {
      //manejo de errores global
      store.snackbar = {
        show: true,
        text: error.response.data.error ?? 'Ha ocurrido un error',
        type: 'error'
      }
      store.loadPage.show = false
      return Promise.reject(error);
    }
});

axios.interceptors.request.use(
  function (config) {
    const store = usePersistStore()
    if(store.user.logged){
      //en el caso de que se requiera, los request se ejecutan con estos headers
      config.headers['Authorization'] = `${store.user.token}`
      config.headers['token'] = `${store.user.token}`
    }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

export default axios;
