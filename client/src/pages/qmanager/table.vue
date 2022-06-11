
<template>
   <div>
  <EasyDataTable
    :headers="headers"
    :items="Object.values(qm.list) "
      show-index

  >
    <template #activation="{rowId}">
      <div class="player-wrapper">
        <button class="btn btn-sm">{{ rowId }}</button>
      </div>
    </template>
  </EasyDataTable>

    </div>
 <div v-if="debug">  {{ Object.values(qm.list) }}</div>
</template>

<script setup lang="ts">

import { useQueryManagerStore  } from '@/store/queryManager'
import { onMounted } from 'vue';
const qm  =  useQueryManagerStore();
let  data = {};
const debug = true ;

onMounted(async () => {
   await qm.fetchAll();
  
})

  const headers  = [
      { text: "Valid", value: "valid" },
      { text: "Config", value: "config", sortable: true },
      { text: "Weight (kg)", value: "weight", sortable: true },
      { text: "Age", value: "age", sortable: true },
      { text: "Activation", value: "activation", sortable: true }
    ];

    const items= [
      { "name": "Curry", "height": 178, "weight": 77, "age": 20 ,rowId:1 },
      { "name": "James", "height": 180, "weight": 75, "age": 21 ,rowId:2},
      { "name": "Jordan", "height": 181, "weight": 73, "age": 22,rowId:3 }
    ];

</script>


<route lang="yaml">
meta:
  isAuth: false
  role: ['admin', 'tes', 'user']
</route>
