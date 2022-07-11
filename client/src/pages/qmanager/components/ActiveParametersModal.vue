<template>
  <input type="checkbox" id="ap-modal" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box h-full" style="min-width:50%">
      <label for="ap-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
      <h3 class="text-lg font-bold mb-3">Active parameters </h3>
      <div>
        <table class="table ">
          <thead>
            <th>Parameter</th>
            <th>Value</th>

          </thead>

          <tr v-for="p in  Object.keys($qm.$state.activeParams)">
            <td>{{ p }}</td>
            <td>{{ $qm.$state.activeParams[p] }}</td>

          </tr>
        </table>
      </div>
      <div v-if="0">{{ $qm.$state.activeParams }}</div>
    </div>
  </div>
</template>

<script setup>
import { DatabaseIcon } from '@heroicons/vue/solid'
import { ShareIcon } from '@heroicons/vue/solid'
import { LibraryIcon } from '@heroicons/vue/solid'
import { useQueryManagerStore } from '@/store/queryManager'
import { ref } from 'vue';

let tab = ref('description')
const qm = useQueryManagerStore();
const setTab = (t) => tab.value = t
const exec = async (queryKey) => await qm.executeQuery(queryKey);
</script>

<style  scoped>
.table {
  border: 1px solid gray;
  border-collapse: collapse;
}

.table td,
.table th {
  border: 1px solid gray;
  padding: 3px 25px;
  border-collapse: collapse;
}

.table th {
  background: lightgray
}
</style>