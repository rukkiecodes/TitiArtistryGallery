<template>
    <v-navigation-drawer v-model="nav.drawer" border="0">
        <v-list class="mx-2">
            <v-list-item v-for="(route, i) in nav.routes" :key="i" :to="route.to" density="compact" rounded="lg" color="indigo-accent-4" class="mb-2">
                <template v-slot:prepend>
                    <v-icon :icon="route.icon"></v-icon>
                </template>

                <v-list-item-title>{{ route.name }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script setup>
import { useAdminNavStore } from '@/store/admin/nav';

const nav = useAdminNavStore()
</script>
