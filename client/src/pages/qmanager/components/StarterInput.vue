<template>
    <input type="text" placeholder="Type here" class="input input-bordered input-sm w-full max-w-xs" />
</template>

<script setup>
import { ref, defineProps, computed, onMounted, toRaw } from 'vue';
const props = defineProps(['input']);

</script>

<style lang="scss" scoped>
</style>