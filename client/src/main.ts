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
watch(toRef(store, 'resultSet'), store.resultChange,  { deep: true });
watch(toRef(store, 'activeParams'), store.activeParamsChange,  { deep: true });


const qm  =  useQueryManagerStore();
app.config.globalProperties.$qm = qm

app.use(router)
app.mount('#app')
