<template>
    <v-container fluid class="pa-0 mt-16">
        <v-card flat class="text-center mb-5" color="transparent">
            <v-card-text class="text-h5 text-sm-h4 font-weight-bold">Our Latest <span
                    class="text-amber-darken-2">Works</span></v-card-text>
        </v-card>

        <v-row no-gutters>
            <v-col cols="12" sm="6" v-for="(image, i) in images.gallery?.slice(0, 10)" :key="i" @click="navigate(image.id)">
                <v-hover>
                    <template v-slot:default="{ isHovering, props }">
                        <v-img :src="image.image" v-bind="props" cover max-height="600"
                            class="align-end justify-start"
                            :gradient="isHovering ? 'rgba(0,0,0,0.4), rgba(0,0,0,0.4)' : 'rgba(0,0,0,0), rgba(0,0,0,0)'">
                            <v-fade-transition>
                                <v-card v-if="isHovering" color="transparent">
                                    <v-card-text class="text-center font-weight-light text-h3 text-white"
                                        style="line-height: 1em;">{{ image.title }}</v-card-text>
                                    <v-card-text class="text-center text-white">{{ image.body }}</v-card-text>
                                </v-card>
                            </v-fade-transition>
                        </v-img>
                    </template>
                </v-hover>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import router from "@/router";
import { useGalleryStore } from "@/store/website/gallery";
import { ref } from "vue";

const images = ref(useGalleryStore())

const navigate = id => {
    router.push(`/${id}`)
}
</script>
