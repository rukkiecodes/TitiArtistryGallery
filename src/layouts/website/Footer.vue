<template>
    <v-footer color="transparent" class="ma-2" rounded="lg">

        <v-row>
            <v-col cols="12">
                <Map />
            </v-col>

            <v-col cols="12" sm="6" class="d-flex justify-center justify-sm-start">
                <span>© {{ new Date().getFullYear() }} Wanlainjo Groups</span>
            </v-col>

            <v-col cols="12" sm="6" class="d-flex justify-center justify-sm-end">
                <router-link v-for="(route, index) in nav.routes" :key="index" :to="route.to" class="ml-2 text-decoration-none text-white">{{ route.name
                }}</router-link>
            </v-col>
        </v-row>
    </v-footer>
</template>

<script>
import Map from '@/components/website/fragments/Map.vue'
import { useWebNavStore } from '@/store/website/nav'
export default {
    components: {
        Map
    },

    setup() {
        const nav = useWebNavStore()

        return {
            nav
        }
    }
}
</script>
