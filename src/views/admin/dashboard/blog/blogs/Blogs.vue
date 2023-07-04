<template>
  <v-container>
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

    <v-btn to="/admin/dashboard/blog/newBlog" position="absolute" location="bottom right"
      class="ma-5 bg-amber-darken-2 text-white" rounded="lg" elevation="10">Write a new Blog</v-btn>

    <!-- Pagination component -->
    <v-pagination v-model="currentPage" :length="totalPages" @input="changePage" />
  </v-container>
</template>
  
<script setup>
import { useAdminBlogStore } from "@/store/admin/blog";
import { ref, computed } from 'vue'

const blog = useAdminBlogStore()

const currentPage = ref(1);
const itemsPerPage = 12; // Number of items per page


// Calculate the total number of pages based on the number of blogs and itemsPerPage
const totalPages = computed(() => Math.ceil(blog.blogs.length / itemsPerPage));

// Calculate the index of the first and last item to be displayed on the current page
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage);
const endIndex = computed(() => startIndex.value + itemsPerPage);

// Slice the blogs array based on the startIndex and endIndex
const paginatedBlogs = computed(() => blog.blogs.slice(startIndex.value, endIndex.value));

// Function to handle page change
function changePage(page) {
  currentPage.value = page;
}
</script>
