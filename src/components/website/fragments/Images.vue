<template>
    <v-row no-gutters>
        <v-col cols="12" sm="6" v-for="(image, i) in (slice < 10 ? images.gallery : images.gallery?.slice(0, 10))" :key="i">
            <v-hover>
                <template v-slot:default="{ isHovering, props }">
                    <v-img :src="image.image" v-bind="props" @click="navigate(image.id)" cover max-height="500"
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
</template>

<script>
import { useGalleryStore } from '@/store/website/gallery';
import gallery from '@/views/website/gallery';
import router from '@/router';

export default {
    props: {
        slice: {
            type: Number,
            default: 10,
        }
    },

    setup() {
        const images = useGalleryStore()

        return {
            images
        }
    },

    methods: {
        navigate(id) {
            router.push(`/gallery/${id}`)
        }
    }
};
</script>