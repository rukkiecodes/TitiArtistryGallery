<template>
    <v-container fluid class="pa-0">
        <v-card flat class="text-center mt-16">
            <v-card-text class="text-h5 text-sm-h4 font-weight-bold">Our Latest <span>Works</span></v-card-text>
        </v-card>

        <v-row no-gutters>
            <v-col cols="12" sm="6" v-for="(image, i) in images" :key="i">
                <v-hover>
                    <template v-slot:default="{ isHovering, props }">
                        <v-img :src="image.image" v-bind="props" cover aspect-ratio="1.5" class="align-end justify-start"
                            :gradient="isHovering ? 'rgba(0,0,0,0.4), rgba(0,0,0,0.4)' : 'rgba(0,0,0,0), rgba(0,0,0,0)'">
                            <v-fade-transition>
                                <v-card v-if="isHovering" color="transparent">
                                    <v-card-text class="text-center font-weight-light text-h3 text-white" style="line-height: 1em;">{{ image.title }}</v-card-text>
                                    <v-card-text class="text-center text-white">{{ image.subTitle }}</v-card-text>
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
const images = [
    {
        image: 'https://res.cloudinary.com/rukkiecodes/image/upload/v1687297065/Titi%20Artistry%20Gallery/theregisti-HSXIp58yPyI-unsplash_pjns2x.jpg',
        title: 'Some random text',
        subTitle: 'Some random text'
    },
    {
        image: 'https://res.cloudinary.com/rukkiecodes/image/upload/v1687297065/Titi%20Artistry%20Gallery/theregisti-HSXIp58yPyI-unsplash_pjns2x.jpg',
        title: 'Some random text',
        subTitle: 'Some random text'
    },
    {
        image: 'https://res.cloudinary.com/rukkiecodes/image/upload/v1687297065/Titi%20Artistry%20Gallery/theregisti-HSXIp58yPyI-unsplash_pjns2x.jpg',
        title: 'Some random text',
        subTitle: 'Some random text'
    },
    {
        image: 'https://res.cloudinary.com/rukkiecodes/image/upload/v1687297065/Titi%20Artistry%20Gallery/theregisti-HSXIp58yPyI-unsplash_pjns2x.jpg',
        title: 'Some random text',
        subTitle: 'Some random text'
    }
]
</script>

<style></style>