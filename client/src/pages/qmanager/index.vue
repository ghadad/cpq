
<template>
  <div>
    <StartHere />
    <Results />
  </div>
 </template>

<script setup lang="ts">
  import  StartHere from './components/StartHere.vue'
  import  Results from './components/Results.vue'

</script>


<route lang="yaml">
meta:
  isAuth: false
  role: ['admin', 'tes', 'user']
</route>
