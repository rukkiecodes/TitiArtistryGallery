<template>
  <v-app>
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

const blog = useAdminBlogStore()

onMounted(() => { 
  blog.getBlogs()
})
</script>
