<template>
  <input type="checkbox" id="queries-modal" class="modal-toggle" v-model="data.modalToggle" />
  <div class="modal">
    <div class="modal-box content max-h-2/3 overflow-y-hidden" style="min-width:70%">
      <label for="queries-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
      <h3 class="mb-3 text-lg font-bold">Queries Navigator</h3>
      <div class="flex flex-row h-screen">
        <div class="w-1/4 h-5/6 max-h-screen overflow-y-auto flex flex-col flex-grow p-1 overflow-x-hidden">
          <form class="flex items-center">
            <label for="simple-search" class="sr-only">Search</label>
            <div class="relative w-full mb-1 ">
              <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"></path>
                </svg>
              </div>
              <input type="text" id="simple-search"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search" required>
            </div>
            <button>>></button>

          </form>
          <template v-for="(queries, sectionKey) in queriesBySection($qm.list)">
            <div @click="toggle(sectionKey)" class="border-2 border-gray-500 rounded-md bg-gray-200 mb-1 p-1 mr-4">{{
                sectionKey
            }}
            </div>
            <ul class="" v-show="sectionToggle[sectionKey]">
              <div class="divide-y-2 divide-dashed">
                <template v-for="(qInfo, index) in queries">
                  <div class="flex py-1" v-if="qInfo.enabled">
                    <div class="w-5/6 ">
                      <!--CheckIcon class="h-6 w-6 text-green-700 mr-1 inline" /-->
                      {{ qInfo.title }}

                    </div>
                    <div class="flex  tooltip" data-tip="Execute"
                      @click="data.modalToggle = false ; $qm.executeQuery(qInfo.key)">
                      <CogIcon class="h-6 w-6  text-green-700 cursor-pointer" />
                    </div>
                    <div class="flex tooltip mr-4" :data-tip="qInfo.description">
                      <InformationCircleIcon class="h-6 w-6  text-blue-500 cursor-pointer"
                        @click="displayQuery(qInfo)" />
                    </div>
                  </div>
                  <div class="flex py-2" v-else>
                    <div class="w-5/6 cursor-not-allowed">

                      {{ qInfo.title }}
                    </div>
                    <BanIcon class="h-6 w-6 text-red-700 mr-1 inline" />
                    <div class="flex  cursor-pointer mr-4 " @click="displayQuery(qInfo)">
                      <InformationCircleIcon class="h-6 w-6  text-blue-500" />
                    </div>
                  </div>
                </template>
              </div>
            </ul>
          </template>

        </div>
        <div class="w-3/4  bg-gray-50">
          <!-- Page content here -->
          <q-info :q="activeQuery" @set-active-query="displyQueryByKey" />
        </div>
      </div>
      <p>
      <ul>
      </ul>
      </p>
    </div>
  </div>
</template>

<script setup>
import { CheckIcon } from '@heroicons/vue/solid'
import { CogIcon } from '@heroicons/vue/outline'

import { BanIcon } from '@heroicons/vue/solid'
import { InformationCircleIcon } from '@heroicons/vue/solid'
import { useQueryManagerStore } from '@/store/queryManager'
import { ref, computed, onMounted } from 'vue';
import QInfo from "./QInfo.vue"

let tab = ref('description')
const qm = useQueryManagerStore();
const setTab = (t) => tab.value = t


const activeQuery = ref({})
const displayQuery = function (config) {
  activeQuery.value = config
  console.log(activeQuery.value)
}

function displyQueryByKey(qKey) {

  const qInfo = qm.getQueryInfo(qKey);
  if (qInfo)
    activeQuery.value = qInfo
  else {
    throw new Error("Cannot find " + qKey + " in queries")
  }
}


const data = ref({
  modalToggle: false
})

const query = computed(() => {
  return activeQuery.value[activeQuery.value.executer];

})

const sectionToggle = ref({});

const queriesBySection = function (queries) {
  let sections = {};
  for (let q of Object.values(queries)) {
    sections[q.section] = sections[q.section] || [];
    sections[q.section].push(q)
    sectionToggle[q.section] = false;
  }
  return sections
}

const toggle = (sectionKey) => {
  return sectionToggle.value[sectionKey] = !sectionToggle.value[sectionKey]
}

</script>

<style lang="scss" scoped>
</style>