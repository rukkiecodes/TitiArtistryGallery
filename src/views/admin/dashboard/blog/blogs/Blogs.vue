<template>
  <v-container>
    <v-toolbar color="amber" rounded="lg" class="mb-5 pr-4">
      <v-btn to="/admin/dashboard/blog/newBlog" class="ma-5 bg-amber-darken-2 text-white text-capitalize" rounded="lg"
        :icon="icon" height="45" elevation="0">
        <span v-if="!icon">Write a new Blog</span>
        <v-icon v-else>mdi-plus</v-icon>
      </v-btn>

      <v-text-field v-model="searchQuery" label="Search blogs" @input="updateSearch" hide-details density="compact"
        color="white" variant="solo" rounded="lg" prepend-inner-icon="mdi-magnify" />
    </v-toolbar>
    <!-- <v-row>
      <v-col cols="12">
      </v-col>
    </v-row> -->

    <v-row>
      <v-col cols="12" sm="4" md="4" v-for="blog in paginatedBlogs" :key="blog.id">
        <v-card rounded="lg" :to="`/admin/dashboard/blog/${blog.id}`">
          <v-img cover :src="blog?.image" style="max-height: 200px;" />

          <v-toolbar density="compact" color="transparent">
            <v-toolbar-title>{{ blog?.title }}</v-toolbar-title>

            <v-spacer />

            <v-chip>
              {{ new Date(blog?.dateCreated.seconds).toDateString() }}
            </v-chip>
          </v-toolbar>

          <v-card-text v-html="blog?.body.slice(0, 200) + '...'" />
        </v-card>
      </v-col>
    </v-row>

    <!-- Pagination component -->
    <v-pagination v-model="currentPage" :length="totalPages" @input="changePage" class="mt-5" active-color="amber" />
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
const paginatedBlogs = computed(() => filteredBlogs.value.slice(startIndex.value, endIndex.value));

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
