<template>
  <v-app>
    <AppBar />
    <Drawer />
    
    <View />
    
    <Footer />
  </v-app>
</template>

<script setup>
import AppBar from './AppBar.vue'
import View from './View.vue'
import Drawer from './Drawer.vue'
import Footer from './Footer.vue'
import { useGalleryStore } from '@/store/website/gallery';
import { onMounted } from 'vue';
import { useBlogStore } from '@/store/website/blog';

const gallery = useGalleryStore()
const blog = useBlogStore()

onMounted(() => {
  gallery.getGallery()
  gallery.getFolders()
  blog.getBlogs()
})
</script>
