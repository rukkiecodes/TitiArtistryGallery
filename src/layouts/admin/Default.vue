<template>
  <v-app theme="light">
    <AppBar />
    <Drawer />

    <View />
  </v-app>
</template>

<script setup>
import { useAdminBlogStore } from '@/store/admin/blog'
import { onMounted } from 'vue'
import AppBar from './AppBar.vue'
import Drawer from './Drawer.vue'
import View from './View.vue'
import { useAdminGalleryStore } from '@/store/admin/gallery'

const blog = useAdminBlogStore()
const gallery = useAdminGalleryStore()

onMounted(() => { 
  blog.getBlogs()
  gallery.getGallery()
})
</script>
