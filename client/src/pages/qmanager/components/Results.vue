<template>
   <div v-for="(dataResult, index) in results" :key="index">
      <TableDataResult @modal-info="openQInfoModal" :data-result="dataResult" :index="index" />
   </div>
   <QInfoModal :q="qInfo" @modal-close="isOpen = false" />
   <!-- 

   <div class="modal">

      <div class="modal-box h-full" style="min-width:50%">sss {{ qInfo }}
         <label for="q-info-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
         <h3 class="text-lg font-bold">Query information </h3>
         <p class="">
         <div class="tabs">
            <a class="tab tab-lifted" @click="setTab('description')"
               :class="{ 'tab-active': tab == 'description' }">Description</a>
            <a class="tab tab-lifted" @click="setTab('q')" :class="{ 'tab-active': tab == 'q' }">Query</a>
            <a class="tab tab-lifted" @click="setTab('columns')" :class="{ 'tab-active': tab == 'columns' }">Columns</a>
            <a class="tab tab-lifted" @click="setTab('columns')" :class="{ 'tab-active': tab == 'columns' }">Json</a>
         </div>
         </p>
         <p v-show="tab == 'q'" class="py-4">{{ qInfo.config }}</p>
         <p v-show="tab == 'columns'" class="py-4">{{ qInfo.config }}</p>
         <p v-show="tab == 'description'" class="py-4">
         <p>Author</p>
         <p>labels</p>
         <p>Author</p>
         <p>Author</p>
         {{ qInfo }}</p>
         <p v-show="tab == 'json'" class="py-4">
         <p>Author</p>
         <p>labels</p>
         <p>Author</p>
         <p>Author</p>
         {{ qInfo }}</p>
      </div>
   </div> -->


</template>

<script setup>
import { ref, computed } from 'vue';
import TableDataResult from "./TableDataResult.vue";
import { useQueryManagerStore } from '@/store/queryManager'
import QInfoModal from "./QInfoModal.vue"
let qInfo = ref({});
let isOpen = ref(true)


const openQInfoModal = (data) => {

   qInfo.value = data;
   isOpen.value = true;
   console.log("Q:", qInfo)
}
const qm = useQueryManagerStore();
const results = computed(() => qm.$state.resultSet);

</script>

<style lang="scss" scoped>
</style>