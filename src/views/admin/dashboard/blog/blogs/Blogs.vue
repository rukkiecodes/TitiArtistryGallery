<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="4" md="4" v-for="blog in blog.blogs" :key="blog.id">
        <v-card rounded="lg" :to="`/admin/dashboard/blog/${blog.id}`">
          <v-img :src="blog?.image" aspect-ratio="1.5" cover />

          <v-card-title>{{ blog?.title }}</v-card-title>

          <v-card-text v-html="blog?.body.slice(0, 200) + '...'" />
        </v-card>
      </v-col>
    </v-row>

    <v-btn to="/admin/dashboard/blog/newBlog" position="absolute" location="bottom right"
      class="ma-5 bg-amber-darken-2 text-white" rounded="lg" elevation="10">Write a new Blog</v-btn>
  </v-container>
</template>
  
<script setup>
import { useAdminBlogStore } from "@/store/admin/blog";

const blog = useAdminBlogStore()
</script>
  