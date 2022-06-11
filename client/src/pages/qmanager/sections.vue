
<template>
  <div>
    dssss
    </div>
 <div v-if="debug"> result: {{ qm.sections}}</div>
</template>

<script setup lang="ts">

import { useQueryManagerStore  } from '@/store/queryManager'
import { onMounted ,computed,ref } from 'vue';
const qm  =  useQueryManagerStore();
let  data = {};
const debug = true ;


onMounted(async () => {
   await qm.fetchAll();
})


</script>


<route lang="yaml">
meta:
  isAuth: false
  role: ['admin', 'tes', 'user']
</route>
