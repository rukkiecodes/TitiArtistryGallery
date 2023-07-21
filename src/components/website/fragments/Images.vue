<template>
    <v-container>
        <div class="render__copies__section">
            <div class="render__copies__section__card" v-for="image in paginatedGallery" :key="image.id">
                <v-card @click="viewImage = { active: true, ...image }" rounded="0" elevation="0" color="transparent">
                    <v-img class="render__all__copies__flex__card__text__image" :src="image?.image" />
                </v-card>
            </div>
        </div>
    </v-container>

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

    <!-- Pagination component -->
    <v-pagination v-model="currentPage" :length="totalPages" @input="changePage" />
</template>
  
<script setup>
import { useGalleryStore } from "@/store/website/gallery";
import { ref, computed } from "vue";

const _gallery = useGalleryStore();

const currentPage = ref(1);
const itemsPerPage = 50; // Number of items per page
const viewImage = ref({ active: false })

// Calculate the total number of pages based on the number of _gallery and itemsPerPage
const totalPages = computed(() => Math.ceil(_gallery.gallery?.length / itemsPerPage));

// Calculate the index of the first and last item to be displayed on the current page
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage);
const endIndex = computed(() => startIndex.value + itemsPerPage);

// Slice the _gallery array based on the startIndex and endIndex
const paginatedGallery = computed(() => _gallery.gallery?.slice(startIndex.value, endIndex.value));

// Function to handle page change
function changePage(page) {
    currentPage.value = page;
}
</script>
  
<style lang="scss" scoped>
@import '@/assets/style/gallery.scss'
</style>