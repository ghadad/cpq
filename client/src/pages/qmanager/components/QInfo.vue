<template>
  <div v-if="props.q" class="h-full max-h-full">
    <!-- Page content here -->
    <div class="tabs mb-4">
      <a class="tab tab-lifted" @click="setTab('description')"
        :class="{ 'tab-active': tab == 'description' }">Description</a>
      <a class="tab tab-lifted" @click="setTab('q')" :class="{ 'tab-active': tab == 'q' }">Query</a>
      <a class="tab tab-lifted" @click="setTab('columns')" :class="{ 'tab-active': tab == 'columns' }">Columns</a>
      <a class="tab tab-lifted" @click="setTab('json')" :class="{ 'tab-active': tab == 'json' }">Json</a>
    </div>
    <div class="p-4 pl-4 h-4/5 max-h-screen overflow-y-auto flex flex-col flex-grow ">
      <div v-show="tab == 'q'">
        <h2 class="text-xl">Directive/Executer :{{ props.q.executer }}</h2>
        <h2 class="">Query</h2>
        <pre class="code">{{ props.q[props.q.executer] }}</pre>
      </div>

      <div v-show="tab == 'description'" class="py-4 p-3">{{ props.q.description }}</div>
      <pre v-show="tab == 'json'" class="py-4 p-3">{{ props.q }}{{ props.q }}</pre>


      <div v-show="tab == 'columns'">
        <table class="table w-full">
          <thead>
            <th>Label</th>
            <th>Field</th>
            <th>Alias</th>
            <th>Sortable</th>
            <th>queries to invoke</th>
          </thead>

          <tr v-for="column in  props.q.columns">
            <td>{{ column.label }}</td>
            <td>{{ column.field }}</td>
            <td>{{ column.alias }}</td>
            <td>{{ column.sortable }}</td>
            <td>{{ column.exec }}

              <InformationCircleIcon class="h-6 w-6 text-blue-500 cursor-pointer" v-if="column.exec"
                @click="$emit('setActiveQuery', column.exec)" />

            </td>
          </tr>
        </table>
      </div>
    </div>

  </div>


</template>

<script setup>
import { InformationCircleIcon } from '@heroicons/vue/solid'
import { ShareIcon } from '@heroicons/vue/solid'
import { LibraryIcon } from '@heroicons/vue/solid'
import { useQueryManagerStore } from '@/store/queryManager'
import { ref, defineProps, watch } from 'vue';
const props = defineProps(['q', "open"])
const tab = ref("q");
const setTab = function (k) {
  tab.value = k;
}
const qm = ref(useQueryManagerStore());
watch(props, () => setTab('description'), { deep: true });


</script>

<style  scoped>
.modal {
  z-index: 100
}

.table {
  border: 1px solid gray;
  border-collapse: collapse;
}

.table td,
.table th {
  border: 1px solid gray;
  padding: 5px;
  border-collapse: collapse;
}

.table th {
  background: lightgray
}
</style>