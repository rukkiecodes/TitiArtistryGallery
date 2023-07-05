<template>
  <v-container>
    <v-card width="600" class="mx-auto" flat="">
      <v-card-text>
        <v-sheet @click="clickOnInput" color="grey" width="100%" min-height="200" rounded="lg"
          class="overflow-hidden d-flex align-center justify-center">
          <div v-if="!previewImage" class="d-flex flex-column align-center">
            <v-icon size="50">mdi-image-plus-outline</v-icon>
            <span>Add Image</span>
          </div>
          <v-img v-else :src="previewImage" cover />
        </v-sheet>
      </v-card-text>
      <input type="file" @change="setImage" style="display: none" id="fileInput">

      <v-card-text>
        <v-text-field v-model="gallery.title" label="Image title" variant="underlined" color="amber-darken-2" />

        <v-textarea v-model="gallery.body" label="What would you like to say about this image" rows="3" max-rows="8"
          variant="underlined" color="amber-darken-2" />
      </v-card-text>
      <v-card-actions>
        <v-btn @click="savePost" :loading="gallery.loading" class="bg-amber-darken-2 text-white" rounded="lg" block>Save
          Image</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { useAdminGalleryStore } from '@/store/admin/gallery'

export default {
  data: () => ({
    previewImage: null,
    updateContent: ``
  }),

  setup() {
    const gallery = useAdminGalleryStore()

    return {
      gallery
    }
  },

  mounted() {
    this.$nextTick(() => { })
  },

  methods: {
    clickOnInput() {
      document.querySelector('#fileInput').click()
    },

    setImage(e) {
      let file = e.target.files[0]

      if (!file) return

      this.previewImage = URL.createObjectURL(file)

      this.image = file

      this.gallery.image = file
    },

    savePost() {
      this.gallery.savePost()
    }
  }
}
</script>