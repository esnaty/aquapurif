import { getCurrentInstance } from 'vue';

export function useGlobalVariables() {
  const instance = getCurrentInstance();
  if (!instance) {
    throw new Error('use useGlobalVariables in setup()');
  }

  // Accedemos a las propiedades globales definidas
  const store = instance.appContext.config.globalProperties.$store;
  const http = instance.appContext.config.globalProperties.$http;
  const route = instance.appContext.config.globalProperties.$route;
  const router = instance.appContext.config.globalProperties.$router;

  return {
    store,  // persist and unpersist store
    http, // axios
    route, //actual route 
    router //router
  };
}
