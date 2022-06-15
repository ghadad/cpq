<template>
    <div v-for="sq in $qm.getSectionStarters">
    {{sq.config.name }}  <button @click="exec(sq.qKey)" class="btn btn-xs"> > </button>
    </div>
</template>

<script setup>
import { useQueryManagerStore  } from '@/store/queryManager'
const qm  =  useQueryManagerStore();

import { ref } from 'vue';

const exec = async function  (k) {
   await qm.executeQuery(k,{},{starter:true});
}

</script>

<style lang="scss" scoped>

</style>