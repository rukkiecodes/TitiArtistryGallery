<template>
  <v-container>
    <v-card flat class="text-center my-16">
      <v-card-title class="text-h4 text-sm-h3">Gallery</v-card-title>
    </v-card>
  </v-container>
</template>
  
<script setup>
import { onMounted, ref } from "vue";
import gallery from './gallery'

const model = ref(null)
const dialog = ref(false)
</script>
