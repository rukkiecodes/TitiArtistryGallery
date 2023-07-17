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
    folder
    <v-dialog activator="parent" v-model="gallery.newFolderDialog" width="400" persistent="">
      <v-card rounded="lg">
        <v-card-text>
          <v-text-field v-model="gallery.folderTitle" hide-details variant="underlined" color="indigo-accent-4" label="Folder name" />
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn @click="gallery.newFolderDialog = false" color="red" class="text-capitalize">Cancel</v-btn>
          <v-btn @click="gallery.saveFolder" :loading="gallery.loading" color="indigo-accent-4" class="text-capitalize">Done</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- <v-dialog fullscreen activator="parent" v-model="gallery.folderDialog" scrollable persistent>
      <v-card rounded="none">
        <v-toolbar color="white" elevation="5">
          <v-toolbar-title>
            <span v-if="!showFolderTitleInput" @click="showFolderTitleInput = true" class="text-h4">{{ gallery.folderTitle
              != '' ? gallery.folderTitle : 'Folder title' }}</span>
            <v-text-field v-else @blur="showFolderTitleInput = false" @keypress.enter="showFolderTitleInput = false"
              v-model="gallery.folderTitle" hide-details placeholder="Folder name" variant="plain" density="compact"
              color="indigo-accent-4" />
          </v-toolbar-title>

          <v-spacer />

          <v-btn @click="gallery.saveFolder(proccessedFiles)" :loading="gallery.loading"
            :disabled="proccessedFiles.length < 1" class="text-capitalize" color="indigo-accent-4">Save images</v-btn>
        </v-toolbar>

        <v-card-text>
          <v-sheet v-on:dragover.prevent v-on:drop="handleFileDrop" color="white"
            class="drop-zone d-flex justify-center align-center" height="100%">
            <v-card v-if="proccessedFiles < 1" width="400" height="400" rounded="pill" color="indigo-lighten-5" flat
              class="d-flex flex-column justify-center align-center">
              <v-icon size="x-large">mdi-image-multiple-outline</v-icon>
              <span class="text-body-2">Drop files here</span>
            </v-card>

            <v-row v-else>
              <v-col v-for="(image, index) in proccessedFiles" :key="index" cols="12" sm="6" md="4">
                <v-card flat max-height="500">
                  <v-img :src="image.image" aspect-ratio="16/9" cover />
                </v-card>
              </v-col>
            </v-row>
          </v-sheet>
        </v-card-text>
      </v-card>
    </v-dialog> -->
  </v-btn>
</template>

<script>
import { useAdminGalleryStore } from '@/store/admin/gallery'

export default {
  data: () => ({
    previewImage: null,
    updateContent: ``,
    showTitleInput: false,
    showFolderTitleInput: false,
    rawFiles: [],
    proccessedFiles: []
  }),

  setup() {
    const gallery = useAdminGalleryStore()

    return {
      gallery
    }
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

    handleFileDrop(event) {
      event.preventDefault();

      const files = event.dataTransfer.files;

      this.rawFiles.push(...files)

      this.rawFiles.forEach(file => {
        this.proccessedFiles = [
          ...this.proccessedFiles,
          {
            image: URL.createObjectURL(file),
            file
          }
        ]
      })
    },
  }
}
</script>