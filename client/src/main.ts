import { createApp ,watch , toRef } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App);

import './app.css';   


// pinia 

import { createPinia } from 'pinia'
import PersistedState  from 'pinia-plugin-persistedstate'
const pinia = createPinia().use(PersistedState )
app.use(pinia);

import { useQueryManagerStore  } from '@/store/queryManager'
const store = useQueryManagerStore();
app.config.globalProperties.$qm = store

app.use(router)
app.mount('#app')
