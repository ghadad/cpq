<template>
    <div class="">
        {{ activeStarter }}
        <div v-for="sq in $qm.getSectionStarters" class="flex flex-row"
            v-show="activeStarter == null || activeStarter == sq.qKey">
            <div class="text-xl">{{ sq.name }}</div>
            <StarterInput :input="sq.input" class="ml-4"></StarterInput>
            <button @click="exec(sq.qKey)" class="ml-4 btn btn-xs"> > </button>

        </div>
        <div v-if="activeStarter != null && qm.getSectionStarters.length > 1">
            <ChevronDownIcon @click="activeStarter = null" class="h-6 w-6  text-green-700 cursor-pointer" />

        </div>
    </div>
</template>

<script setup>
import { useQueryManagerStore } from '@/store/queryManager';
import StarterInput from "./StarterInput.vue";
import { ChevronDownIcon } from '@heroicons/vue/solid'
import { ChevronUpIcon } from '@heroicons/vue/solid'

const qm = useQueryManagerStore();

import { ref } from 'vue';

const activeStarter = ref(null)

const exec = async function (k) {
    activeStarter.value = k;
    await qm.executeQuery(k, { starter: true });
}

</script>

<style lang="scss" scoped>
</style>