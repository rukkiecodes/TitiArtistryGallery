<template>
    <v-container class="pt-10">
        <div class="render__copies__section">
            <div class="render__copies__section__card" v-for="blog in paginatedBlogs" :key="blog.id">
                <v-card :to="`/blog/${blog.id}`" class="mx-auto mb-5" color="transparent" flat>
                    <v-img :src="blog?.image" cover />
                    <v-card-title>{{ blog?.title }}</v-card-title>
                    <v-card-text>
                        <div v-html="blog?.body?.slice(0, 400)"></div>
                        <span class="font-weight-bold">Read More...</span>
                    </v-card-text>
                </v-card>
            </div>
        </div>

        <v-pagination v-model="currentPage" :length="totalPages" @input="changePage" active-color="indigo-accent-4"
            rounded="lg" />
    </v-container>
</template>

<script setup>
import { useBlogStore } from "@/store/website/blog";
import { ref, computed } from "vue";

const _blog = useBlogStore();

const currentPage = ref(1);
const itemsPerPage = 20; // Number of items per page

// Calculate the total number of pages based on the number of _blog and itemsPerPage
const totalPages = computed(() => Math.ceil(_blog.blogs?.length / itemsPerPage));

// Calculate the index of the first and last item to be displayed on the current page
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage);
const endIndex = computed(() => startIndex.value + itemsPerPage);

// Slice the _blog array based on the startIndex and endIndex
const paginatedBlogs = computed(() => _blog.blogs?.slice(startIndex.value, endIndex.value));

// Function to handle page change
function changePage(page) {
    currentPage.value = page;
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/blog.scss'
</style>