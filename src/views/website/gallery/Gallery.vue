<template>
  <router-view />
</template>
  
<script setup>
import { onMounted, ref } from "vue";
import gallery from '../gallery'

const model = ref(null)
const dialog = ref(false)
</script>
