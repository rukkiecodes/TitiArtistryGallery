<template>
    <div class="render__copies__section__card"
        v-for="image in images" :key="image.id">
        <v-card @click="viewImage = { active: true, ...image }" rounded="0" elevation="0" color="transparent">
            <v-img class="render__all__copies__flex__card__text__image" :src="image?.image" />
        </v-card>
    </div>
</template>

<script>
export default {
    props: {
        images: {
            type: Array,
            default: []
        },
    },

    mounted() {
        this.getImages()
    },

    methods: {
        async getImages() {
            console.log(this.images)
        }
    }
}
</script>