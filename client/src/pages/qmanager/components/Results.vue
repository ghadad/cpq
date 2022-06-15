<template>
   <div v-for="(dataResult,index) in results" :key="index">
   <TableDataResult :data-result="dataResult"  :index="index" />

   </div>
</template>

<script setup>
import { ref,computed  } from 'vue';
import TableDataResult from  "./TableDataResult.vue"  ; 
import { useQueryManagerStore  } from '@/store/queryManager'

const qm  =  useQueryManagerStore();
const results = computed(() => qm.$state.resultSet);

</script>

<style lang="scss" scoped>

</style>