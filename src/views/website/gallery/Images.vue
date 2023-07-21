<template>
  <Head title="Our Gallery" class="mb-5" />
  <Images :slice="0" />
</template>

<script setup>
import Images from '@/components/website/fragments/Images.vue'
import Head from '@/components/website/fragments/Head.vue'
</script>