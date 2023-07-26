<template>
    <Head title="Welcome to LexiTidream"
        subtitle="Welcome to LexiTidream's Artistry Gallery! Discover our captivating collection of meticulously crafted moments frozen in time, celebrating the innate beauty that surrounds us. Join us on this visual journey where life takes shape through LexiTidream's visionary lens."
        :showCard="true" />
    <LatestWork />
    <About />


    <Contact />
</template>

<script setup>
import Head from '@/components/website/fragments/Head.vue'
import LatestWork from '@/components/website/home/LatestWork.vue'
import About from '@/components/website/home/About.vue'
import Contact from '@/components/website/home/Contact.vue'
import { useGalleryStore } from '@/store/website/gallery'
import { onMounted } from 'vue'

const gallery = useGalleryStore()

onMounted(() => { 
    // gallery.getGallery()
    // gallery.getFolders()
})
</script>
