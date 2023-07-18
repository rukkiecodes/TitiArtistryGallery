<template>
  <v-container v-if="gallery">
    <FolderPreview v-if="gallery?.documentType == 'folder'" />
    <ImagePreview v-else />
  </v-container>
</template>
  
<script>
import FolderPreview from '@/views/admin/dashboard/gallery/views/fragments/FolderPreview.vue'
import ImagePreview from '@/views/admin/dashboard/gallery/views/fragments/ImagePreview.vue'

import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/plugins/firebase'

import { useAppStore } from '@/store/app'

export default {
  data: () => ({
    gallery: null
  }),

  components: {
    ImagePreview,
    FolderPreview
  },

  setup() {
    const app = useAppStore()

    return {
      app
    }
  },

  mounted() {
    this.getImage(this.$route.params.id)
  },

  methods: {
    async getImage(id) {
      let gallery = (await getDoc(doc(db, 'gallery', id))).data()

      this.gallery = gallery
    },
  }
}
</script>
