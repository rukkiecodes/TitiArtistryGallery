<template>
    <v-container fluid class="pa-0 mt-16">
        <v-card flat class="text-center mb-5" color="transparent">
            <v-card-text class="text-h5 text-sm-h4 font-weight-bold">Our Latest <span
                    class="text-indigo-accent-4">Works</span></v-card-text>
        </v-card>

        <Images :slice="20" />
    </v-container>
</template>

<script setup>
import Images from '@/components/website/fragments/Images.vue'
</script>
