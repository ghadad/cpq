<template>
  <input type="checkbox" id="queries-modal" class="modal-toggle" />
  <div class="modal" v-if="1">
    <div class="modal-box  h-full" style="min-width:70%">
      <label for="queries-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
      <h3 class="text-lg font-bold">Queries Navigator</h3>
      <div class="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex flex-col items-center justify-center">
          <!-- Page content here -->

          <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open drawer</label>

        </div>
        <div class="drawer-side">
          <label for="my-drawer-2" class="drawer-overlay"></label>
          <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
            <template v-for="(qInfo, queryKey) in $qm.list">
              <li class="p-1 m-1 cursor-pointer" v-if="qInfo.enabled">
                <span @click="$qm.executeQuery(queryKey)" class="inline">
                  <CheckIcon class="h-6 w-6 inline  text-green-700 mr-1" />{{ qInfo.config.title
                  }}
                </span>
                <span>
                  <InformationCircleIcon class="h-5 w-5   text-blue-500" />
                </span>
              </li>
              <li class="m-1" v-else>
                <BanIcon class="h-6 w-6 inline  text-red-700 mr-1" />{{ qInfo.config.title }}

              </li>
            </template>>
          </ul>

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
import { BanIcon } from '@heroicons/vue/solid'
import { InformationCircleIcon } from '@heroicons/vue/solid'
import { useQueryManagerStore } from '@/store/queryManager'
import { ref } from 'vue';

let tab = ref('description')
const qm = useQueryManagerStore();
const setTab = (t) => tab.value = t
const exec = async (queryKey) => await qm.executeQuery(queryKey);
</script>

<style lang="scss" scoped>
</style>