
<template>
  <div class="mb-3" v-if="tableData.done">
  
   <h2 class="pl-3 text-xl border-2 border-gray-300 border-neutral-700 bg-base-300"> {{tableData.qInfo.config.name}}  - {{tableData.qInfo.config.desc}} 

   <label for="q-info-modal" class="btn btn-link modal-button" title="Query info"><InformationCircleIcon class="h-5 w-5 inline  text-blue-500"  /></label>
   <a href="#q-info-modal" class="btn btn-link modal-button" title="Download csv"><TableIcon class=" h-5 w-5 inline  text-blue-500"/> </a> 
   <button class="btn btn-link" title="Download csv"><TableIcon class=" h-5 w-5 inline  text-blue-500"/> </button> 
   <button class="btn btn-link" title="Download csv"> <DocumentDownloadIcon class="h-5 w-5  inline text-purple-400 "/> </button> 
   <button class="btn btn-link" title="Share link"> <LinkIcon class="h-5 w-5  inline text-purple-400 "/> </button> 
   <button class="btn btn-link" title="Refresh"> <RefreshIcon class="h-5 w-5  inline text-purple-400 "/> </button> 
    <label for="queries-modal" class="badge badge-ghost bg-base-300 modal-button" title="Query info">
        <LibraryIcon  class="h-5 w-5 text-blue-500"/>  
    </label>
   <button class="btn btn-link"  title="Expand" @click="toggle()"> 
   <PlusIcon class="h-5 w-5  inline text-purple-400 " v-show="tableData.collapse" /> 
   <MinusIcon class="h-5 w-5  inline text-purple-400 " v-show="!tableData.collapse" /> 
   </button> 
  <button class="btn btn-link" title="Refresh" @click="remove(props.index)"> 
   <XCircleIcon class="h-5 w-5  inline text-purple-400" /> 
</button>
{{collapse}} {{qm.$state.lastInsertedIndex }}  {{props.index}} {{$qm.$state.collapse}}
    </h2>
  <div class="div-result" v-if="!tableData.error" >

  <EasyDataTable 
    v-show="!tableData.collapse"
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
    </div>

 <QInfoModal :q="tableData.qInfo"/>
</template>

<script setup lang="ts">

import { useQueryManagerStore  } from '@/store/queryManager'
import { ref ,defineProps,computed ,onMounted  } from 'vue';

import { useRoute  } from 'vue-router';
import { InformationCircleIcon } from '@heroicons/vue/solid'
import { ShareIcon } from '@heroicons/vue/solid'
import { LinkIcon } from '@heroicons/vue/outline'
import { ArrowsExpandIcon} from '@heroicons/vue/solid'
import { TableIcon } from '@heroicons/vue/outline'
import { DocumentDownloadIcon} from '@heroicons/vue/outline'
import { RefreshIcon} from '@heroicons/vue/solid'
import { MinusIcon} from '@heroicons/vue/outline'
import { PlusIcon} from '@heroicons/vue/outline'
import { XCircleIcon} from '@heroicons/vue/solid'

import { LibraryIcon } from '@heroicons/vue/solid'


const props = defineProps(['dataResult','index']);

const qm  =  useQueryManagerStore();

const   toggle  = (index) => qm.toggle(props.index)  ; // =  ref (qm.$state.collapse[props.index] ? qm.$state.collapse[props.index]  : false );

const remove = (index) => qm.remove(index);
const tableData = computed(() => {
  return {
    data : props.dataResult.tableData, 
    error : props.dataResult.error || props.dataResult.meta.error ,
    headers : props.dataResult.cols ,
    collapse:qm.$state.resultSet[props.index].collapse ,
    qInfo : props.dataResult.meta ,
    done:true
  }
})


 
import QInfoModal from '@/components/QInfoModal.vue'

let  data = {};
const debug = true ;
const route = useRoute();

</script>


<route lang="yaml">
meta:
  isAuth: false
  role: ['admin', 'tes', 'user']
</route>
