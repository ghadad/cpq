import { createApp } from 'vue'
import App from './App.vue'

import router from './router'

import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

const app = createApp(App);
app.component('EasyDataTable', Vue3EasyDataTable);
import './app.css';   

// pinia 
import { createPinia } from 'pinia'
import PersistedState  from 'pinia-plugin-persistedstate'

const pinia = createPinia().use(PersistedState )

app.use(pinia);

import { useQueryManagerStore  } from '@/store/queryManager'

const qm  =  useQueryManagerStore();

app.config.globalProperties.$qm = qm

app.use(router)
app.mount('#app')
