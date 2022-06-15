<template>
<div class="container mx-auto">
<TopNavBar />
<div class="drawer">
  <input id="my-drawer" type="checkbox" v-model="data.menuToggle"  class="drawer-toggle" />
  <div class="drawer-content">
 
    <router-view :key="$route.path"></router-view>
  </div> 
  <div class="drawer-side">
   
    <label for="my-drawer" class="drawer-overlay"></label>
    <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
      <li> <label @click="$qm.fetchAll(true)">Refresh qmanager state </label> </li>
      <li> <router-link to="/qmanager/sections">sections</router-link> </li>
      <ul class="ml-7"><li v-for="s in $qm.sections"><router-link :to="'/qmanager/sections/'+s">{{s}}</router-link></li></ul>
      <li> <router-link to="/qmanager/exec/test:shell">test:shell</router-link> </li>
      <li> <router-link to="/qmanager/exec/test:sql">test:sql</router-link> </li>
    </ul>
  </div>
</div>
   
    </div>
    
   
</template>

<script setup>
import { ref ,onMounted,watch} from 'vue';
import { useRouter, useRoute } from 'vue-router'
import TopNavBar from '@/components/TopNavBar.vue'
const route =   useRoute() ;

const data = ref({
  menuToggle :false
})

watch(route,() => { 
     data.value.menuToggle = false ; 
     });

</script>
<style>
.container {max-width:100% !important;padding:1rem}

</style>