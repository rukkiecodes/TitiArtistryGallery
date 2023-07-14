<template>
  <v-btn class="text-grey-darken-4 text-capitalize mr-2" rounded="lg" prepend-icon="mdi-image-plus-outline">Upload
    image
    <v-dialog activator="parent" v-model="gallery.imageDialog" width="600" persistent scrollable>
      <v-card rounded="lg">
        <v-card-title v-if="!showTitleInput" @click="showTitleInput = !showTitleInput" class="text-h4 text-grey-darken-3">
          {{ gallery.title != '' ? gallery.title : 'Image title' }}
        </v-card-title>
        <v-card-text v-else @blur="showTitleInput = false">
          <v-text-field v-model="gallery.title" @keypress.enter="showTitleInput = false" color="indigo-accent-4"
            variant="underlined" placeholder="Image title" hide-details density="compact" />
        </v-card-text>
        <v-card-text style="max-height: 500px;">
          <v-sheet @click="clickOnInput" :color="previewImage ? '' : 'grey'" width="100%" min-height="200" rounded="lg"
            class="overflow-hidden d-flex align-center justify-center">
            <div v-if="!previewImage" class="d-flex flex-column align-center">
              <v-icon size="50">mdi-image-plus-outline</v-icon>
              <span>Add Image</span>
            </div>
            <v-img v-else :src="previewImage" cover />
          </v-sheet>
          <input type="file" accept="image/*" @change="setImage" id="fileInput" multiple="false" style="display: none">
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn class="text-capitalize" color="indigo-accent-4">Cancel</v-btn>
          <v-btn @click="gallery.savePost" :loading="gallery.loading" class="text-capitalize" color="indigo-accent-4"
            prepend-icon="mdi-tray-arrow-up">Save Image</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-btn>

  <v-btn class="text-grey-darken-4 text-capitalize" rounded="lg" prepend-icon="mdi-folder-plus-outline">Create
    folder</v-btn>
</template>

<script>
import { useAdminGalleryStore } from '@/store/admin/gallery'

export default {
  data: () => ({
    previewImage: null,
    updateContent: ``,
    showTitleInput: false
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
  }
}
</script>