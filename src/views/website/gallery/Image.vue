<template>
  <v-container>
    <v-card width="600" class="mx-auto" color="transparent">
      <v-card-title>{{ image?.title }}</v-card-title>
      <v-card-text>{{ image?.body }}</v-card-text>

      <v-img :src="image?.image" cover />
    </v-card>
  </v-container>
</template>

<script>
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/plugins/firebase'
export default {
  data: () => ({
    image: null
  }),

  mounted() {
    this.$nextTick(() => {
      this.getImage(this.$route.params.id)
    })
  },

  methods: {
    async getImage(id) {
      let image = (await getDoc(doc(db, 'gallery', id))).data()

      this.image = image
    }
  }
}
</script>

<style></style>