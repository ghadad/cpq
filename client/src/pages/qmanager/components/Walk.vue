
<template>
  <div v-if="tableData.done">
    <h2 class="text-xl"> {{ tableData.qInfo.name }} - {{ tableData.qInfo.desc }}

      <label for="q-info-modal" class="btn btn-link modal-button" title="Query info">
        <InformationCircleIcon class="h-5 w-5 inline  text-blue-500" />
      </label>
      <a href="#q-info-modal" class="btn btn-link modal-button" title="Download csv">
        <TableIcon class=" h-5 w-5 inline  text-blue-500" />
      </a>
      <button class="btn btn-link" title="Download csv">
        <TableIcon class=" h-5 w-5 inline  text-blue-500" />
      </button>
      <button class="btn btn-link" title="Download csv">
        <DocumentDownloadIcon class="h-5 w-5  inline text-purple-400 " />
      </button>
      <button class="btn btn-link" title="Share link">
        <LinkIcon class="h-5 w-5  inline text-purple-400 " />
      </button>
      <button class="btn btn-link" title="Refresh">
        <RefreshIcon class="h-5 w-5  inline text-purple-400 " />
      </button>
      <button class="btn btn-link" v-show="resultTable == 'close'" title="Expand" @click="resultTable = 'open'">
        <PlusIcon class="h-5 w-5  inline text-purple-400 " />
      </button>
      <button class="btn btn-link" v-show="resultTable == 'open'" title="Expand" @click="resultTable = 'close'">
        <MinusIcon class="h-5 w-5  inline text-purple-400 " />
      </button>
    </h2>
    <div class="div-result" :class="resultTable">
      <EasyDataTable v-show="resultTable == 'open'" :headers="tableData.headers" :items="tableData.data" show-index>
        <template #activation="{ $rowId }">
          <div class="player-wrapper">
            <button class="btn btn-sm">{{ $rowId }}</button>
          </div>
        </template>
      </EasyDataTable>
    </div>
  </div>
  <div v-if="debug"> start here: {{ qm.starters[qm.section] }}
  </div>
  <!-- The button to open modal -->



  <QInfoModal :q="tableData.qInfo" />
</template>

<script setup lang="ts">

import { useQueryManagerStore } from '@/store/queryManager'
import { onMounted, computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { InformationCircleIcon } from '@heroicons/vue/solid'
import { ShareIcon } from '@heroicons/vue/solid'
import { LinkIcon } from '@heroicons/vue/outline'
import { ArrowsExpandIcon } from '@heroicons/vue/solid'
import { TableIcon } from '@heroicons/vue/outline'
import { DocumentDownloadIcon } from '@heroicons/vue/outline'
import { RefreshIcon } from '@heroicons/vue/solid'
import { MinusIcon } from '@heroicons/vue/outline'
import { PlusIcon } from '@heroicons/vue/outline'


import QInfoModal from '@/components/QInfoModal.vue'

const qm = useQueryManagerStore();
let data = {};
const debug = true;
const route = useRoute();

const resultTable = ref('open')
const tableData = ref({
  data: [],
  headers: [],
  qInfo: {},
  done: false
})

const getHeaders = function (headers) {

  return headers.map(e => {
    if (typeof e === "object")
      return e;
    return Object.assign({}, { text: e, value: e })
  });
}

onMounted(async () => {
  const apiClient = qm.getApiClient;
  const apiResult: any = await apiClient(route.params.id, qm.getActiveParams);
  tableData.value.data = apiResult.data.result;
  tableData.value.headers = getHeaders(apiResult.data.columns);
  tableData.value.qInfo = apiResult.data.meta;
  tableData.value.done = true
})

</script>


<route lang="yaml">
meta:
  isAuth: false
  role: ['admin', 'tes', 'user']
</route>
