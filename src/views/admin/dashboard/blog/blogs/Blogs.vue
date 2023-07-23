<template>
  <v-container>
    <v-toolbar color="white" rounded="lg" class="mb-5" flat>
      <v-btn to="/admin/dashboard/blog/newBlog" class="ml-0 mr-1 bg-white text-white text-capitalize" rounded="lg"
        :icon="icon" elevation="4">
        <span class="text-grey-darken-3" v-if="!icon">Write a new Blog</span>
        <v-icon color="grey-darken-3" v-else>mdi-plus</v-icon>
      </v-btn>

      <v-text-field v-model="searchQuery" label="Search blogs" @input="updateSearch" hide-details density="comfortable"
        color="indigo-darken-2" variant="underlined" prepend-inner-icon="mdi-magnify" />
    </v-toolbar>

    <v-row>
      <v-col cols="12" sm="4" md="4" v-for="blog in paginatedBlogs" :key="blog.id">
        <v-card rounded="lg" :to="`/admin/dashboard/blog/${blog.id}`">
          <v-img cover :src="blog?.image" style="max-height: 200px;" />

          <v-card-title class="grey-darken-3">{{ blog?.title }}</v-card-title>
          <v-card-subtitle>{{ new Date(blog?.dateCreated?.seconds * 1000).toDateString() }}</v-card-subtitle>

          <v-card-text class="text-body-2" v-html="blog?.body?.slice(0, 200) + '...'" />
        </v-card>
      </v-col>
    </v-row>

    <!-- Pagination component -->
    <v-pagination v-if="blog.blogs.length >= 12" v-model="currentPage" :length="totalPages" @input="changePage"
      class="mt-5" active-color="indigo" />
  </v-container>
</template>
  
<script setup>
import { useAdminBlogStore } from "@/store/admin/blog";
import { ref, computed } from 'vue'
import { useDisplay } from 'vuetify'

const { name } = useDisplay()

const blog = useAdminBlogStore()

const currentPage = ref(1);
const itemsPerPage = 12; // Number of items per page

// Calculate the total number of pages based on the number of blogs and itemsPerPage
const totalPages = computed(() => Math.ceil(filteredBlogs.length / itemsPerPage));

// Calculate the index of the first and last item to be displayed on the current page
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage);
const endIndex = computed(() => startIndex.value + itemsPerPage);

// Search functionality
const searchQuery = ref('');
const filteredBlogs = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  if (query === '') return blog.blogs;
  return blog.blogs.filter((blog) => {
    return blog.title.toLowerCase().includes(query) ||
      blog.title.toLowerCase().includes(query);
  });
});

// Slice the blogs array based on the startIndex and endIndex
const paginatedBlogs = computed(() => filteredBlogs.value?.slice(startIndex.value, endIndex.value));

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
