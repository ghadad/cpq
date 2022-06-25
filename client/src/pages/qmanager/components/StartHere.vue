<template>
    <div class="mb-4">
        <div v-for="sq in $qm.getSectionStarters" class="inline mr-6 mb-2">
            {{ sq.config.name }} <button @click="exec(sq.qKey)" class="ml-4 btn btn-xs"> > </button>
        </div>


    </div>
</template>

<script setup>
import { useQueryManagerStore } from '@/store/queryManager'
const qm = useQueryManagerStore();

import { ref } from 'vue';

const exec = async function (k) {
    await qm.executeQuery(k, { starter: true });
}

</script>

<style lang="scss" scoped>
</style>