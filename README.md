## Explicación técnica del proyecto

- Router: se usó vuex para la manipulación de las rutas en este proyecto, en el archivo src/router/index se encuentra inicializado dicho router, se encontraran la declaración de rutas, y el caracteristico beforeEach para el control de acceso a las mismas. Se definieron rutas de caracter privado que requerian de autenticación y rutas a las que no se puede acceder teniendo una seseión activa.

- Store: para este proyecto se uso PINIA para el manejo del estado, incluyendo uno de sus plugins pinia-plugin-persistedstate para manejar el localStorage desde el estado de manera mas sencilla. Estos dos modelos de store han sido integrados en una veriable global para su uso en toda la app.

- Vuetify: Decidí utilizar Vuetify 3 con Vue 3 por su perfecta integración con esta versión, aprovechando al máximo la Composition API y las mejoras de rendimiento. Su extensa biblioteca de componentes optimizados para accesibilidad y diseño responsivo agilizó el desarrollo, garantizando consistencia visual y una excelente experiencia de usuario. Además, su sistema de theming dinámico permitió personalizar fácilmente el diseño para alinearlo con la identidad del proyecto.

- Axios: Uso Axios en este proyecto por su simplicidad para manejar solicitudes HTTP y su fácil integración con el ecosistema de vue. Con Axios Interceptors (src/middlewares), gestiono de forma centralizada tareas como agregar tokens de autenticación, manejar errores globales y transformar solicitudes o respuestas, lo que mejora la escalabilidad y mantiene el código limpio.

- Variables Globales: En el archivo main.js hay definidas algunas variables globales las cuales consideré que se usarían en muchas partes del proyecto, de esta manera y mediante un composed se facilitó el acceso en los componentes a los store, las rutas, la ruta actual, axios para las request y reglas para validar formularios.

## ❗️ Links de interés

- [Docs Vuetify](https://vuetifyjs.com/)
- [Store Pinia](https://pinia.vuejs.org/)
- [Axios](https://axios-http.com/es/docs/intro)

---

## 💿 Instalación

Ejecuta el comando para instalar las dependencias:

```
npm install
```

## Correr el proyecto

```
npm run dev
```

## Puerto local por defecto

[http://localhost:3000](http://localhost:3000)

---

## Requisitos

Asegúrate de tener instalados los siguientes requisitos antes de usar el script:

- **Node.js** (v16 o superior)
- **npm** 
- **Vite** como herramienta de construcción.

