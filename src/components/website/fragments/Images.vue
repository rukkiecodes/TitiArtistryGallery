<template>
    <v-row no-gutters>
        <v-col cols="12" sm="6" v-for="(image, i) in (slice < 10 ? images.gallery : images.gallery?.slice(0, 10))" :key="i">
            <v-hover>
                <template v-slot:default="{ isHovering, props }">
                    <v-img :src="image.image" v-bind="props" @click="viewImage = { active: true, ...image }" cover
                        max-height="500" class="align-end justify-start"
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

        <v-dialog v-model="viewImage.active" width="600" max-width="800">
            <v-card rounded="lg">
                <v-toolbar color="transparent" elevation="0" density="comfortable">
                    <v-spacer />
                    <v-btn @click="viewImage.active = false" icon>
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>

                <v-card-text>
                    <v-img :src="viewImage.image" />
                </v-card-text>
            </v-card>
        </v-dialog>
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

    data: () => ({
        viewImage: { active: false }
    }),

    setup() {
        const images = useGalleryStore()

        return {
            images
        }
    },
};
</script>