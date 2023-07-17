<template>
    <v-navigation-drawer border="0" v-model="nav.drawer">
        <v-list class="mx-2">
            <v-list-item v-for="(route, i) in nav.routes" :key="i" :to="route.to" :title="route.name" rounded="lg"
                color="indigo-darken-4" />
        </v-list>
    </v-navigation-drawer>
</template>

<script setup>
import { useWebNavStore } from "@/store/website/nav";

const nav = useWebNavStore()
</script>
