<template>
  <input type="checkbox" id="queries-modal" class="modal-toggle" v-model="modalOptions.modalToggle" />
  <div class="modal">
    <div class="modal-box content max-h-2/3 overflow-y-hidden" style="min-width:70%">
      <label for="queries-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
      <h3 class="mb-3 font-medium text-lg font-bold">Queries Navigator</h3>
      <div class="flex flex-row h-screen">
        <div class="w-1/3 h-5/6 max-h-screen overflow-y-auto flex flex-col flex-grow p-1 overflow-x-hidden">
          <form class="flex items-center">
            <label for="simple-search" class="sr-only">Search</label>
            <div class="relative w-5/6 mb-1">
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
            <div class="tooltip tooltip-left" data-tip="collapse all sections">
              <button class="btn btn-outline btn-sm p-3 ml-2" v-show="modalOptions.sectionsOpen == true"
                @click="toggleAll(false)">
                <chevron-up-icon class="h-4 w-4  text-blue-500 " />
              </button>
            </div>
            <div class="tooltip tooltip-left" data-tip="expand all sections">
              <button class="btn btn-outline btn-sm p-3 ml-2" v-show="modalOptions.sectionsOpen == false"
                @click="toggleAll(true)">
                <chevron-down-icon class="h-4 w-4  text-blue-500 " />
              </button>
            </div>
          </form>
          <template v-for=" (queries, sectionKey) in queriesBySection($qm.list)">
            <div @click="toggle(sectionKey)" class="border-2 border-gray-500 rounded-md bg-gray-200 mb-1 p-1 mr-4">
              {{
                  sectionKey
              }}
            </div>
            <ul class="" v-show="sectionToggle[sectionKey] == true">

              <div class="divide-y-2 divide-dashed">
                <template v-for="(qInfo, index) in queries">
                  <div class="flex py-1" v-if="qInfo.enabled">
                    <div class="w-5/6 ">
                      <!--CheckIcon class="h-6 w-6 text-green-700 mr-1 inline" /-->
                      {{ qInfo.title }}

                    </div>
                    <div class="flex  tooltip" data-tip="Execute"
                      @click="modalOptions.modalToggle = false ; $qm.executeQuery(qInfo.key)">
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
        <div class="w-2/3  bg-gray-50 pl-3">
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
import { ref, computed, onMounted, watch } from 'vue';
import QInfo from "./QInfo.vue"
import { ChevronDownIcon } from '@heroicons/vue/outline'
import { ChevronUpIcon } from '@heroicons/vue/outline'

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


const modalOptions = ref({
  sectionsOpen: false,
  modalToggle: false
})

const sectionToggle = ref({});

const toggleAll = (isOpen = false) => {
  for (let section of qm.$state.sections) {
    sectionToggle.value[section] = isOpen;
  }
  console.log(sectionToggle.value)
  modalOptions.value.sectionsOpen = isOpen
}

const query = computed(() => {
  return activeQuery.value[activeQuery.value.executer];

})


sectionToggle.value[qm.section] = true;

watch(qm.section, () => sectionToggle.value[qm.section] = true)

const queriesBySection = function (queries) {
  let sections = {};
  sections[qm.section] = []
  for (let q of Object.values(queries)) {
    sections[q.section] = sections[q.section] || [];
    sections[q.section].push(q)
    //  sectionToggle.value[q.section] = false
  }
  sectionToggle[qm.section] = false;
  return sections
}

const toggle = (sectionKey) => {
  return sectionToggle.value[sectionKey] = !sectionToggle.value[sectionKey]
}

</script>

<style lang="scss" scoped>
</style>