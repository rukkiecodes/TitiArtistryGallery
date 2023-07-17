<template>
  <v-container>
    <v-card width="600" class="mx-auto" flat="">
      <v-card-text>
        <v-sheet @click="clickOnInput" color="grey" width="100%" min-height="200" rounded="lg"
          class="overflow-hidden d-flex align-center justify-center">
          <v-img :src="gallery?.image" cover />
        </v-sheet>
      </v-card-text>
      <input type="file" @change="setImage" style="display: none" id="fileInput">

      <v-card-title class="d-flex">
        <span>
          <v-icon class="mr-4" size="x-small">mdi-pencil</v-icon>
          {{ gallery?.title }}

          <v-dialog v-model="titleDialog" activator="parent" width="400">
            <v-card rounded="lg">
              <v-card-text>
                <v-text-field variant="underlined" label="Post title" v-model="gallery.title" color="indigo-darken-4" />
              </v-card-text>

              <v-card-actions>
                <v-btn @click="saveTitle" block color="indigo-darken-3">Save title</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </span>

        <v-spacer />

        <v-btn @click="deletePost" :loading="deleteLoading" prepend-icon="mdi-trash-can" rounded="pill" color="red"
          flat>Delete post</v-btn>
      </v-card-title>

      <v-card-text v-html="gallery?.body" @click="this.bodyDialog = true" class="mt-5" />

      <v-dialog v-model="bodyDialog" width="400" scrollable>
        <v-card rounded="lg">
          <v-card-text>
            <v-textarea v-model="gallery.body" label="What would you like to say about this image" rows="3" max-rows="8"
              variant="underlined" color="indigo-darken-2" />
          </v-card-text>

          <v-card-actions>
            <v-btn @click="saveBody" block color="indigo-darken-3">Save post</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-container>
</template>
  
<script>
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/plugins/firebase'

import Quill from 'quill'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { getStorage, uploadBytesResumable, ref, getDownloadURL, deleteObject } from 'firebase/storage'
import { useAppStore } from '@/store/app'

const storage = getStorage()

export default {
  data: () => ({
    gallery: null,
    titleDialog: false,
    bodyDialog: false,
    deleteLoading: false
  }),

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

    clickOnInput() {
      document.querySelector('#fileInput').click()
    },

    async setImage(e) {
      let file = e.target.files[0]

      if (!file) return

      this.gallery.image = URL.createObjectURL(file)

      // upload file

      const id = await JSON.parse(localStorage.titiArtCollectionUser).uid

      let link = `gallery/${id}/${file.name}`

      const storageRef = ref(storage, link)

      const uploadTask = uploadBytesResumable(storageRef, file)

      const startUpload = (id) => {
        uploadTask.on('state_changed', snapshot => { },
          error => { },
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then(async downloadURL => {
                await updateDoc(doc(db, 'gallery', id), {
                  image: downloadURL,
                  imageLink: uploadTask.snapshot.ref.fullPath,
                })

                this.app.snackbar = {
                  active: true,
                  color: 'green',
                  text: 'Image changed successfully',
                  textColor: 'text-white'
                }

                this.getImage(this.$route.params.id)
              })
              .catch(() => { })
          })
      }

      if (this.gallery.imageLink) {
        const desertRef = ref(storage, this.gallery.imageLink)

        deleteObject(desertRef)
          .then(() => {
            startUpload(this.$route.params.id)
          }).catch((error) => {
            // startUpload()
          });
      }
      else startUpload(this.$route.params.id)
    },

    async saveTitle() {
      await updateDoc(doc(db, 'gallery', this.$route.params.id), {
        title: this.gallery.title
      })

      this.titleDialog = false
    },

    async saveBody() {
      await updateDoc(doc(db, 'gallery', this.$route.params.id), {
        body: this.gallery.body
      })

      this.bodyDialog = false
    },

    deletePost() {
      const desertRef = ref(storage, this.gallery.imageLink)

      this.deleteLoading = true


      deleteObject(desertRef)
        .then(async () => {
          await deleteDoc(doc(db, 'gallery', this.$route.params.id))
          this.$router.go(-1)
          this.deleteLoading = false
        }).catch(() => {
          this.deleteLoading = false
        });
    }
  }
}
</script>
