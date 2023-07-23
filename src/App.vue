<template>
  <router-view />

  <v-snackbar v-model="app.snackbar.active" :color="app.snackbar.color" location="top right">
    <span :class="app.snackbar.textColor">{{ app.snackbar.text }}</span>
  </v-snackbar>
</template>

<script setup>
import { useAppStore } from "./store/app";

const app = useAppStore()
</script>