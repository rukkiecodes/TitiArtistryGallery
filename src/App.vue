<template>
  <transition name="fade" mode="out-in">
    <router-view />
  </transition>

  <v-snackbar v-model="app.snackbar.active" :color="app.snackbar.color" location="top right">
    <span :class="app.snackbar.textColor">{{ app.snackbar.text }}</span>
  </v-snackbar>
</template>

<script setup>
import { useAppStore } from "./store/app";

const app = useAppStore()
</script>

<style>
.app-bar {
  background: #1212128a !important;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.8s;
  transition-property: opacity;
  transition-timing-function: ease-in-out;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>