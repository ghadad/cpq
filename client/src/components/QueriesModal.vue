<template>
<input type="checkbox" id="queries-modal" class="modal-toggle" />
<div class="modal" v-if="1">
  <div class="modal-box h-full" style="min-width:50%">
    <label for="queries-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    <h3 class="text-lg font-bold">Query information </h3>

<p>
  <div @click="exec(queryKey)" v-for="(qInfo,queryKey) in $qm.list">{{queryKey}}</div>
</p>

    
  </div>
</div>
</template>

<script setup>
import { DatabaseIcon } from '@heroicons/vue/solid'
import { ShareIcon } from '@heroicons/vue/solid'
import { LibraryIcon } from '@heroicons/vue/solid'
import { useQueryManagerStore  } from '@/store/queryManager'
import { ref } from 'vue';

let tab = ref('description')
const qm  =  useQueryManagerStore();
const setTab = (t) => tab.value=t
const exec  =  async ( queryKey) => await  qm.executeQuery(queryKey);
</script>

<style lang="scss" scoped>

</style>