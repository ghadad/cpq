<template>
  <router-view />
</template>

<script setup lang="ts">


import { onErrorCaptured, ref } from 'vue';
const debug = ref(null);

onErrorCaptured(function (err, instance, info) {
  debug.value = { err, instance, info }
  //console.log('[errorCaptured]', err, instance, info)
})


</script>
