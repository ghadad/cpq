<script setup lang="ts">
import Dialog from 'primevue/dialog'
import Calendar from 'primevue/calendar';
import Button from 'primevue/button';
import { useQueryManagerStore  } from '@/store/queryManager'

const qm  =  useQueryManagerStore();
qm.fetchAll();
const newMethod = (val: string) => { return val}
const a = 411
const value = new Date()

</script>

<template>
{{qm.list}}
</template>

<route lang="yaml">
meta:
  isAuth: false
  role: ['admin', 'tes', 'user']
</route>
