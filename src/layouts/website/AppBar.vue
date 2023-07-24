<template>
  <v-app-bar flat>
    <v-app-bar-nav-icon @click="nav.drawer = !nav.drawer" class="hidden-md-and-up" />
    <v-app-bar-title>
      <v-avatar>
        <v-img src="@/assets/logo.png" />
      </v-avatar>

      LexiTidream
    </v-app-bar-title>

    <v-spacer />

    <v-btn v-for="(route, i) in nav.routes" :key="i" variant="text" size="small" :to="route.to"
      class="hidden-sm-and-down ml-2" rounded="lg">{{ route.name }}</v-btn>

    <v-btn class="bg-indigo-accent-4 text-capitalize hidden-md-and-up" to="/contact" rounded="lg">Book now</v-btn>
  </v-app-bar>
</template>

<script setup>
import { useWebNavStore } from '@/store/website/nav'
const nav = useWebNavStore()
</script>
