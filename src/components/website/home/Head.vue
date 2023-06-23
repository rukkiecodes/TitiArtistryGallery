<template>
    <v-container>
        <v-sheet height="93vh" class="pa-0 ma-0 d-flex align-center justify-center">
            <v-row align="center">
                <v-col cols="12" sm="5">
                    <v-card flat>
                        <v-card-title class="text-h4 text-sm-h3 ">Welcome</v-card-title>
                        <v-card-text>Titi's Artistry Gallery: A Fusion of Life and Art Through Photography. Explore our
                            captivating collection of meticulously crafted moments frozen in time, each conveying emotions,
                            igniting imagination, and celebrating the innate beauty that surrounds us. Join us on this
                            visual journey where life takes shape through Titi's visionary lens.</v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" sm="7">
                    <v-card rounded="lg" elevation="10">
                        <v-carousel :show-arrows="false" hide-delimiters hide-delimiter-background cycle interval="5000">
                            <v-carousel-item v-for="(image, i) in images" :key="i" :src="image" cover />
                        </v-carousel>
                    </v-card>
                </v-col>
            </v-row>
        </v-sheet>
    </v-container>
</template>

<script setup>
const images = [
    'https://res.cloudinary.com/rukkiecodes/image/upload/v1687297065/Titi%20Artistry%20Gallery/theregisti-HSXIp58yPyI-unsplash_pjns2x.jpg',
    'https://res.cloudinary.com/rukkiecodes/image/upload/v1687297065/Titi%20Artistry%20Gallery/theregisti-HSXIp58yPyI-unsplash_pjns2x.jpg',
    'https://res.cloudinary.com/rukkiecodes/image/upload/v1687297065/Titi%20Artistry%20Gallery/theregisti-HSXIp58yPyI-unsplash_pjns2x.jpg',
    'https://res.cloudinary.com/rukkiecodes/image/upload/v1687297065/Titi%20Artistry%20Gallery/theregisti-HSXIp58yPyI-unsplash_pjns2x.jpg',
    'https://res.cloudinary.com/rukkiecodes/image/upload/v1687297065/Titi%20Artistry%20Gallery/theregisti-HSXIp58yPyI-unsplash_pjns2x.jpg',
]
</script>
