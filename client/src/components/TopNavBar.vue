<template>
  <div class="navbar bg-base-100">
    <div class="flex-none w-50">
      <label for="my-drawer" class="btn btn-link drawer-button">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          class="inline-block w-5 h-5 stroke-current">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </label>
    </div>
    <div class="flex-none m-50">
      <router-link to="/qmanager" class="btn btn-ghost normal-case text-3xl">CPQ</router-link>
    </div>
    <div class="flex-1 navbar">
      <ul class="menu menu-horizontal p-0">
        <li class="mr-20">Group name</li>
        <li tabindex="0">
          <a @mouseover="dropShow.section = true">
            Sections
            <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
              <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
            </svg>
          </a>
          <ul class="p-2 bg-base-100 z-50	">
            <ul class="ml-7" v-show="dropShow.section == true">
              <li v-for="s in qm.sections" @click="qm.setSection(s); dropShow.section = false" class="cursor-pointer">
                {{ s }}
              </li>
            </ul>
          </ul>
        </li>
        <li tabindex="0">
          <a @mouseover="dropShow.db = true">
            Databases
            <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
              <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
            </svg>
          </a>
          <ul class="p-2 bg-base-100 z-50	" v-show="dropShow.db == true">
            <li v-for="db in $qm.databases" @click="$qm.setDB(db); dropShow.db = false"> <a>{{ db }} </a></li>
          </ul>
        </li>
        <li><a>
            <ShareIcon class="h-5 w-5 text-blue-500" />
          </a></li>
      </ul>
    </div>
    <div class="flex-none">
      <label for="queries-modal" class="badge badge-lg p-5 badge-primary badge-outline modal-button" title="Query info">
        <LibraryIcon class="h-5 w-5 text-blue-500" /> Queries
      </label>

    </div>
    <div class="flex-none ml-10">
      <label class="badge badge-lg p-5">
        Section: {{ qm.getSection }}
      </label>
    </div>

    <div class="flex-none ml-10">
      <label class="badge badge-lg p-5 badge-primary badge-outline">
        <DatabaseIcon class="h-5 w-5 text-blue-500" /> {{ qm.getDB }}
      </label>
    </div>
    <div class="flex-1 ml-10">
      <label for="ap-modal" class="badge badge-lg p-5 badge-primary badge-outline">
        <SparklesIcon class="h-5 w-5 text-blue-500" /> Active Parameters
      </label>
    </div>
    <div class="flex-none">
      <button class="btn btn-square btn-ghost">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          class="inline-block w-5 h-5 stroke-current">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z">
          </path>
        </svg>
      </button>
    </div>
  </div>
  <QueriesModal />
  <ActiveParametersModal />
</template>

<script setup>
import { ref, watch } from 'vue';
import { DatabaseIcon } from '@heroicons/vue/solid'
import { ShareIcon } from '@heroicons/vue/solid'
import { LibraryIcon } from '@heroicons/vue/solid'
import { useQueryManagerStore } from '@/store/queryManager'
import QueriesModal from '@/components/QueriesModal.vue'
import ActiveParametersModal from '@/components/ActiveParametersModal.vue'
import { SparklesIcon } from '@heroicons/vue/outline'


const qm = useQueryManagerStore();

watch(() => qm.section, () => qm.clearResultSet());

const dropShow = ref({ section: false, db: false })
</script>

<style lang="scss" scoped>
</style>