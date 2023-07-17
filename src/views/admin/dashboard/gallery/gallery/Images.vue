<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="4">
        <NewImage />
      </v-col>
      <v-col cols="12" sm="8">
        <v-text-field v-model="searchQuery" label="Search images" @input="updateSearch" hide-details density="compact"
          color="indigo-accent-4" variant="underlined" rounded="lg" prepend-inner-icon="mdi-magnify" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="4" md="3" v-for="folder in gallery.folders" :key="folder.id">
        <v-card rounded="lg">
          <v-card-text class="d-flex justify-space-between">
            <span class="text-caption">{{ folder?.folderName?.slice(0, 15) }}{{ folder?.folderName.length >= 15 ? '...' :
              '' }}</span>

            <span class="text-caption">{{ new Date(folder.createdAt.nanoseconds).toDateString() }}</span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Pagination component -->
    <!-- <v-pagination v-model="currentPage" :length="totalPages" @input="changePage" class="mt-5" active-color="indigo" /> -->
  </v-container>
</template>
  
<script setup>
import NewImage from '@/views/admin/dashboard/gallery/NewImage.vue'
import { useAdminGalleryStore } from "@/store/admin/gallery";
import { ref, computed } from 'vue'
import { useDisplay } from 'vuetify'

const { name } = useDisplay()

const gallery = useAdminGalleryStore()

const currentPage = ref(1);
const itemsPerPage = 12; // Number of items per page

// Calculate the total number of pages based on the number of gallery and itemsPerPage
const totalPages = computed(() => Math.ceil(filteredGallry.length / itemsPerPage));

// Calculate the index of the first and last item to be displayed on the current page
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage);
const endIndex = computed(() => startIndex.value + itemsPerPage);

// Search functionality
const searchQuery = ref('');
const filteredGallry = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  if (query === '') return gallery.gallery;
  return gallery.gallery.filter((gallery) => {
    return gallery.title.toLowerCase().includes(query) ||
      gallery.title.toLowerCase().includes(query);
  });
});

console.log(filteredGallry)

// Slice the gallerys array based on the startIndex and endIndex
const paginatedGallery = computed(() => filteredGallry.value.slice(startIndex.value, endIndex.value));

// Function to handle page change
function changePage(page) {
  currentPage.value = page;
}

// Function to update search query
function updateSearch() {
  currentPage.value = 1; // Reset to first page when search query changes
}

const icon = computed(() => {
  // name is reactive and
  // must use .value
  switch (name.value) {
    case 'xs': return true
    case 'sm': return false
    case 'md': return false
    case 'lg': return false
    case 'xl': return false
    case 'xxl': return false
  }

  return undefined
})
</script>
