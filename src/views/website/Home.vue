<template>
    <Head title="Welcome to LexiTidream"
        subtitle="Welcome to Titi's Artistry Gallery! Discover our captivating collection of meticulously crafted moments frozen in time, celebrating the innate beauty that surrounds us. Join us on this visual journey where life takes shape through Titi's visionary lens."
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
</script>
