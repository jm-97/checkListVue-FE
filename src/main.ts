import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// tema (OBBLIGATORIO)
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

import router from './router'
import 'primeicons/primeicons.css';
import { createToastflow } from "vue-toastflow";
import App from './App.vue'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})
app.use(createToastflow());

app.mount('#app')
