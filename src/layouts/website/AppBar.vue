<template>
  <v-app-bar flat>
    <v-app-bar-nav-icon @click="nav.drawer = !nav.drawer" class="hidden-md-and-up" />
    <v-app-bar-title>
      <v-icon icon="mdi-circle-slice-6" />

      Essentials Preset
    </v-app-bar-title>

    <v-spacer />

    <v-btn v-for="(route, i) in nav.routes" :key="i" variant="text" size="small" :to="route.to"
      class="hidden-sm-and-down">{{ route.name }}</v-btn>
  </v-app-bar>
</template>

<script setup>
import { useWebNavStore } from '@/store/website/nav'
const nav = useWebNavStore()
</script>
