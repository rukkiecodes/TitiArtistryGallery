<template>
    <v-container class="mt-16">
        <v-card flat class="text-center mb-5">
            <v-card-text class="text-h5 text-sm-h4 font-weight-bold">About <span
                    class="text-amber-darken-2">Titi</span></v-card-text>
        </v-card>

        <v-row>
            <v-col cols="12" sm="6" order="1" order-sm="0">
                <v-card flat>
                    <v-tabs v-model="tab" bg-color="white" color="amber-darken-2">
                        <v-tab value="one">My Style</v-tab>
                        <v-tab value="two">Mission</v-tab>
                        <v-tab value="three">Vision</v-tab>
                    </v-tabs>

                    <v-card-text>
                        <v-window v-model="tab">
                            <v-window-item value="one">
                                "Immerse in Titi's Artistry Gallery: Where Timeless Moments Unfold"
                                Step into a world where the fusion of photojournalism, fine-art photography, and a touch of
                                fashion converge. Titi's Artistry Gallery showcases a unique vision that draws inspiration
                                from the interplay of light, vibrant colors, vintage aesthetics, and innovative
                                perspectives. But above all, it is the essence of the individuals captured through the lens
                                that breathes life into each photograph. Discover the artistry that celebrates the beauty
                                and personalities of the families we photograph, creating a visual tapestry of cherished
                                memories that will endure for generations to come.
                            </v-window-item>

                            <v-window-item value="two">
                                "Embrace the Essence of Titi's Artistry Gallery: Where Light and Color Ignite Meaning"
                                In a world devoid of photography, our existence would lose its significance without the
                                interplay of light and color. These elements awaken our senses, unlocking our minds and
                                giving voice to our passions. Titi's Artistry Gallery captures this essence, drawing
                                inspiration from the captivating dance between light and color. Our photographs are infused
                                with the techniques of black & white processing, reminiscent of vintage aesthetics, and
                                imbued with a creative perspective that pushes boundaries. But at the heart of it all lies
                                the profound connection with the individuals we photograph—their personalities serving as
                                the beating heart that fuels our artistry. Discover a realm where moments are transformed
                                into timeless masterpieces, telling stories that resonate with depth and meaning.
                            </v-window-item>

                            <v-window-item value="three">
                                "Unveiling Titi's Artistry Gallery: Where Light, Color, and Personalities Converge"
                                Step into a realm where photography thrives, capturing the essence of light, color, and
                                vibrant personalities. Titi's Artistry Gallery blends photojournalism and fine-art
                                photography, with a touch of fashion and creative lighting. Inspired by black & white
                                processing, vintage photos, and a creative perspective, our work transcends boundaries. Each
                                frame is a testament to the unique personalities we photograph, weaving stories that
                                resonate deeply. Discover a visual journey where artistry meets soul, crafting everlasting
                                moments of human beauty.
                            </v-window-item>
                        </v-window>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6">
                <v-card elevation="10" rounded="lg">
                    <v-img
                        src="https://res.cloudinary.com/rukkiecodes/image/upload/v1687310138/Titi%20Artistry%20Gallery/theregisti-HSXIp58yPyI-unsplash_xuvst8.jpg"
                        cover aspect-ratio="1.5" />
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from "vue";

const tab = ref(null)
</script>
