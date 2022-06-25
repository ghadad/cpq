<template>
  <input type="checkbox" id="q-info-modal" class="modal-toggle" />

  <div class="modal" v-if="props.q.config">
    <div class="modal-box h-full" style="min-width:50%">
      <label for="q-info-modal" class="btn btn-sm btn-circle absolute right-2 top-2" @click="alert(1)">✕</label>
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
      <p v-show="tab == 'q'" class="py-4">{{ props.q.config }}</p>
      <p v-show="tab == 'columns'" class="py-4">{{ props.q.config.columns }}</p>
      <p v-show="tab == 'description'" class="py-4">
      <p>Author</p>
      <p>labels</p>
      <p>Author</p>
      <p>Author</p>
      {{ props.q }}</p>
      <p v-show="tab == 'json'" class="py-4">
      <p>Author</p>
      <p>labels</p>
      <p>Author</p>
      <p>Author</p>
      {{ props.q }}</p>
      <label for="q-info-modal" class="btn btn-circle absolute right-2 bottom-2" @click="alert(1)">x</label>
    </div>

  </div>


</template>

<script setup>
import { DatabaseIcon } from '@heroicons/vue/solid'
import { ShareIcon } from '@heroicons/vue/solid'
import { LibraryIcon } from '@heroicons/vue/solid'
import { useQueryManagerStore } from '@/store/queryManager'
import { ref, defineProps } from 'vue';
const props = defineProps(['q', "open"])
let tab = ref("q");
const setTab = function (k) {
  tab.value = k;
}
const qm = ref(useQueryManagerStore());

</script>

<style  scoped>
.modal {
  z-index: 100
}
</style>