
<template>
  <div v-if="tableData.done">
    <h2 class="text-xl">{{tableData.qInfo.config.name}}  - {{tableData.qInfo.config.desc}}</h2>
  <EasyDataTable
    :headers="tableData.headers"
    :items="tableData.data"
      show-index
 >
    <template #activation="{$rowId}">
      <div class="player-wrapper">
        <button class="btn btn-sm">{{ $rowId }}</button>
      </div>
    </template>
  </EasyDataTable>

    </div>
 <div v-if="debug"> result: {{ tableData }}</div>
</template>

<script setup lang="ts">

import { useQueryManagerStore  } from '@/store/queryManager'
import { onMounted ,computed,ref } from 'vue';
import { useRoute  } from 'vue-router';
const qm  =  useQueryManagerStore();
let  data = {};
const debug = true ;
const route = useRoute();

const tableData = ref({
  data: [] ,
  headers:[] ,
  qInfo:{} ,
  done:false
})

const getHeaders = function (headers) {

  return headers.map(e=>{
    if(typeof e === "object")
    return e ;
    return Object.assign({},{text:e,value:e})
    });
}

onMounted(async () => {
  const apiClient = qm.getApiClient;
  const apiResult:any   =  await apiClient(route.params.id,qm.getActiveParams) ;
  console.log(apiResult.data);
  tableData.value.data = apiResult.data.result;
  tableData.value.headers = getHeaders(apiResult.data.cols);
  tableData.value.qInfo = apiResult.data.meta;
  tableData.value.done = true
})


</script>


<route lang="yaml">
meta:
  isAuth: false
  role: ['admin', 'tes', 'user']
</route>
