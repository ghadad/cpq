
<template>


  <div class="mb-3" v-if="tableData.done && !tableData.error">

    <h2 class="pl-3 text-xl border-2 border-gray-300 border-neutral-700 bg-base-300"> {{ tableData.qInfo.name }}
      -
      {{ tableData.qInfo.desc }}

      <label for="q-info-modal" @click="$emit('modalInfo', tableData.qInfo)" class="btn btn-link modal-button"
        title="Query info">
        <InformationCircleIcon class="h-5 w-5 inline  text-blue-500" />
      </label>
      <a href="#q-info-modal" class="btn btn-link modal-button" title="Download csv">
        <TableIcon class=" h-5 w-5 inline  text-blue-500" />
      </a>
      <button class="btn btn-link" title="Download csv">
        <TableIcon class=" h-5 w-5 inline  text-blue-500" />
      </button>
      <button class="btn btn-link" title="Download csv">
        <DocumentDownloadIcon class="h-5 w-5  inline text-blue-400 " />
      </button>
      <button class="btn btn-link" title="Share link">
        <LinkIcon class="h-5 w-5  inline text-blue-500 " />
      </button>
      <button class="btn btn-link" title="Refresh">
        <RefreshIcon class="h-5 w-5  inline text-blue-500 " />
      </button>
      <button class="btn btn-link" title="Refresh">
        <PlayIcon class="h-5 w-5  inline text-blue-500 " />
      </button>

      <label for="queries-modal" class="badge badge-ghost bg-base-300 cursor-pointer modal-button" title="Query info">
        <LibraryIcon class="h-5 w-5 text-blue-500" />
      </label>
      <button class="btn float-right btn-link" title="Refresh" @click="remove(props.index)">
        <XCircleIcon class="h-5 w-5  inline text-blue-500" />
      </button>
      <button class="btn float-right btn-link" title="Expand" @click="toggle()">
        <chevron-down-icon class="h-5 w-5  inline text-blue-500 " v-show="tableData.collapse" />
        <chevron-up-icon class="h-5 w-5  inline text-blue-500 " v-show="!tableData.collapse" />
      </button>
    </h2>
    <div class="div-result">

      <vue-good-table v-show="!tableData.collapse" :columns="tableData.columns" :rows="tableData.rows">
        <template #table-row="props">

          <span v-if="props.column.exec && typeof props.column.exec == 'string'">
            {{ props.row[props.column.field] }}
            <span style="font-weight: bold; color: blue;"> </span>
            <PlayIcon class="h-5 w-5 inline text-slate-500	"
              @click="exec(props.column.exec, $props.index, props.row.originalIndex)" />
          </span>
          <span v-else-if="props.column.exec && typeof Array.isArray(props.column.exec)">
            <span style=" font-weight: bold; color: blue;"></span>
            <PlayIcon class="h-5 w-5  inline text-slate-500"
              @click="$qm.executeQueryFromResult(props.column.exec, $props.index, props.row.originalIndex)" />
          </span>
          <span v-else-if="props.column.field == '$active'">
            <span style="font-weight: bold; color: blue;"> </span>
            <CheckCircleIcon class="h-6 w-6 inline"
              :class="props.row.originalIndex == tableData.activeRow ? 'text-green-600' : 'text-black-400'"
              @click="$qm.activateRow($props.index, props.row.originalIndex);" />
          </span>
          <span v-else>
            <template v-if="tableData.qInfo.pre">
              <pre> {{ props.formattedRow[props.column.field] }}</pre>
            </template>
            <template v-else>
              {{ props.formattedRow[props.column.field] }}
            </template>
          </span>
        </template>
      </vue-good-table>
    </div>
  </div>
  <div class="div-result p-4 rounded alert-error shadow-lg text-white m-2" v-if="tableData.error">

    <label @click="remove(props.index)" class=" btn btn-sm btn-circle float-right">✕</label>

    <label class="badge badge-primary p-3 mr-2">Query : {{ tableData.qKey }} </label>{{ tableData.error }}
    <div class="collapse">
      <input type="checkbox" />
      <div class="collapse-title text-xl font-medium ">
        show table result
      </div>
      <div class="collapse-content">
        <pre class="bg-white text-black p-4">{{ $props }}</pre>
      </div>
    </div>


  </div>

</template>

<script setup lang="ts">

import { useQueryManagerStore } from '@/store/queryManager'
import { ref, defineProps, computed, onMounted, toRaw } from 'vue';
import { VueGoodTable } from 'vue-good-table-next';
import 'vue-good-table-next/dist/vue-good-table-next.css'
import { useRoute } from 'vue-router';
import { InformationCircleIcon } from '@heroicons/vue/solid'
import { ShareIcon } from '@heroicons/vue/solid'
import { LinkIcon } from '@heroicons/vue/outline'
import { SparklesIcon } from '@heroicons/vue/solid'
import { TableIcon } from '@heroicons/vue/outline'
import { DocumentDownloadIcon } from '@heroicons/vue/outline'
import { RefreshIcon } from '@heroicons/vue/solid'
import { MinusIcon } from '@heroicons/vue/outline'
import { PlusIcon } from '@heroicons/vue/outline'
import { XCircleIcon } from '@heroicons/vue/solid'
import { PlayIcon } from '@heroicons/vue/solid'
import { CheckCircleIcon } from '@heroicons/vue/solid'
import { LibraryIcon } from '@heroicons/vue/solid'
import { ChevronDownIcon } from '@heroicons/vue/outline'
import { ChevronUpIcon } from '@heroicons/vue/outline'

const props = defineProps(['dataResult', 'index']);

const qm = useQueryManagerStore();

const toggle = (index) => qm.toggle(props.index);

const remove = (index) => qm.remove(index);

const activate = (indx, rowId) => {
  console.log(props.index, rowId)
}

const enrichAndValidateData = () => {
  const newTableData = toRaw(props.dataResult.tableData);
  if (!Array.isArray(newTableData)) {
    throw new Error("bad data structure : tableData is not array")
  }

  for (let row of newTableData) {
    if (Array.isArray(row) || typeof row != "object") {
      throw new Error("bad row structure : row is not an object")
    }
    for (let col of props.dataResult.columns) {
      //  if(col.exec)
      //   row[col.field]  += `<button class="btn btn-link" title="Refresh"> <PlayIcon class="h-5 w-5  inline text-navy-400 "/>> </button> `
    }
    Object.assign(row, { "$activation": true });
  }
  return newTableData;
};

const activationColElement = () => {
  return {
    label: "Activation",
    html: true,
    field: "$active",
    width: "150px",
    sortable: false,
    activation: true
  }
}

const enrichAndValidateColumns = () => {
  const newCols = toRaw(props.dataResult.columns);
  if (!Array.isArray(newCols)) {
    throw new Error("bad columns structure : columns  is not array")
  }

  for (let col of newCols) {
    col.sortable = col.sortable || false;
    if (!(col.field && col.label))
      throw new Error("bad coulmns structure ")
    if (col.exec)
      col.html = true
  }

  return [activationColElement(), ...newCols];
};

const setUpTableData = () => {
  let tableData = {
    rows: [],
    columns: [],
    collapse: qm.$state.resultSet[props.index].collapse,
    qInfo: props.dataResult.config,
    qKey: props.dataResult.qKey,
    done: false
  }
  if (!props.dataResult)
    return { error: { message: "bad dataResult structure : dataResult is  empty" }, ...tableData };
  if (props.dataResult.error)
    return { error: props.dataResult.error, ...tableData };
  if (props.dataResult.config?.error) {
    return { error: props.dataResult.config.error, ...tableData };
  }

  try {
    return {
      activeRow: qm.$state.resultSet[props.index].activeRow,
      rows: enrichAndValidateData(),
      error: false,
      columns: enrichAndValidateColumns(),
      collapse: qm.$state.resultSet[props.index].collapse,
      qInfo: props.dataResult.config,
      done: true,
      qKey: props.dataResult.qKey,
    }
  } catch (e) {
    return {
      rows: [],
      error: e.message,
      columns: [],
      collapse: qm.$state.resultSet[props.index].collapse,
      qInfo: props.dataResult.config,
      done: false,
      qKey: props.dataResult.qKey
    }
  }

}
const tableData = computed(() => setUpTableData())

const exec = async (qKey, resultIndex, rowIndex) => {
  await qm.executeQueryFromResult(qKey, resultIndex, rowIndex);
}


let data = {};
const debug = true;
const route = useRoute();

</script>


<route lang="yaml">
meta:
  isAuth: false
  role: ['admin', 'tes', 'user']
</route>
