<template>
<div class="container mx-auto">
<div class="navbar bg-base-100">
  <div class="flex-none">
    <label for="my-drawer" class="btn btn-link drawer-button">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
    </label>
  </div>
  <div class="flex-1">
    <a class="btn btn-ghost normal-case text-3xl">CPQ</a>
  </div>
  <div class="flex-none">
      <ul class="menu menu-horizontal p-0">
      <li><a>Item 1</a></li>
      <li tabindex="0">
        <a>
          Sections
          <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
        </a>
        <ul class="p-2 bg-base-100 z-50	">
             <ul class="ml-7"><li v-for="s in $qm.sections"><router-link :to="'/qmanager/sections/'+s">{{s}}</router-link></li></ul>
        </ul>
      </li>
            <li tabindex="0">
        <a>
          Databases
          <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
        </a>
        <ul class="p-2 bg-base-100 z-50	">
           <li> alpha </li>
          <li>ea</li>
            <li>production</li>
        </ul>
      </li>
      <li><a>Item 3</a></li>
    </ul>
    <button class="btn btn-square btn-ghost">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
    </button>
  </div>
</div>
<div class="drawer">
  <input id="my-drawer" type="checkbox" v-model="data.menuToggle"  class="drawer-toggle" />
  <div class="drawer-content">
 
    <router-view :key="$route.path"></router-view>
  </div> 
  <div class="drawer-side">
   
    <label for="my-drawer" class="drawer-overlay"></label>
    <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
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