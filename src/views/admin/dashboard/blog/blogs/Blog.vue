<template>
  <v-container>
    <v-card width="600" class="mx-auto" flat="">
      <v-card-text>
        <v-sheet @click="clickOnInput" color="grey" width="100%" min-height="200" rounded="lg"
          class="overflow-hidden d-flex align-center justify-center">
          <v-img :src="blog?.image" cover />
        </v-sheet>
      </v-card-text>
      <input type="file" @change="setImage" style="display: none" id="fileInput">

      <v-card-title class="d-flex">
        <span>
          <v-icon class="mr-4" size="x-small">mdi-pencil</v-icon>
          {{ blog?.title }}

          <v-dialog v-model="titleDialog" activator="parent" width="400">
            <v-card rounded="lg">
              <v-card-text>
                <v-text-field variant="underlined" label="Post title" v-model="blog.title" color="amber-darken-4" />
              </v-card-text>

              <v-card-actions>
                <v-btn @click="saveTitle" block color="amber-darken-3">Save title</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </span>

        <v-spacer />

        <v-btn @click="deletePost" :loading="deleteLoading" prepend-icon="mdi-trash-can" rounded="pill" color="red"
          flat>Delete post</v-btn>
      </v-card-title>

      <v-card-text v-html="blog?.body" @click="openBodyDialog" class="mt-5" />

      <v-dialog v-model="bodyDialog" width="600" scrollable>
        <v-card rounded="lg">
          <v-card-text class="pa-0" style="max-width: 400;">
            <div class="editor" ref="editor" style="min-height: 300px;" />
          </v-card-text>

          <v-card-actions>
            <v-btn @click="saveBody" block color="amber-darken-3">Save post</v-btn>
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
    blog: null,
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
    this.getBlog(this.$route.params.id)

    if (this.bodyDialog) this.renderWYSIWYG()

  },

  methods: {
    async getBlog(id) {
      let blog = (await getDoc(doc(db, 'blogs', id))).data()

      this.blog = blog
    },

    clickOnInput() {
      document.querySelector('#fileInput').click()
    },

    async setImage(e) {
      let file = e.target.files[0]

      if (!file) return

      this.blog.image = URL.createObjectURL(file)

      // upload file

      const id = await JSON.parse(localStorage.titiArtCollectionUser).uid

      let link = `blog/${id}/${file.name}`

      const storageRef = ref(storage, link)

      const uploadTask = uploadBytesResumable(storageRef, file)

      const startUpload = (id) => {
        uploadTask.on('state_changed', snapshot => { },
          error => { },
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then(async downloadURL => {
                await updateDoc(doc(db, 'blogs', id), {
                  image: downloadURL,
                  imageLink: uploadTask.snapshot.ref.fullPath,
                })

                this.app.snackbar = {
                  active: true,
                  color: 'green',
                  text: 'Blog image changes successfully',
                  textColor: 'text-white'
                }

                this.getBlog(this.$route.params.id)
              })
              .catch(() => { })
          })
      }

      if (this.blog.imageLink) {
        const desertRef = ref(storage, this.blog.imageLink)

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
      await updateDoc(doc(db, 'blogs', this.$route.params.id), {
        title: this.blog.title
      })

      this.titleDialog = false
    },

    async saveBody() {
      await updateDoc(doc(db, 'blogs', this.$route.params.id), {
        body: this.blog.body
      })

      this.bodyDialog = false
    },

    openBodyDialog() {
      this.bodyDialog = true

      setTimeout(() => {
        this.renderWYSIWYG()
      }, 500)
    },

    renderWYSIWYG() {
      let options = {
        debug: false,
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],

            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],

            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],

            ['link', 'image'],
            ['clean']

          ]
        },
        placeholder: 'Compose an epic...',
        readOnly: false,
        theme: 'snow',
        height: '400px'
      };

      let quill = new Quill(this.$refs.editor, options)

      quill.root.innerHTML = this.blog.body

      quill.on('text-change', () => {
        this.blog.body = quill.root.innerHTML
      })
    },

    deletePost() {
      const desertRef = ref(storage, this.blog.imageLink)

      this.deleteLoading = true


      deleteObject(desertRef)
        .then(async () => {
          await deleteDoc(doc(db, 'blogs', this.$route.params.id))
          this.$router.go(-1)
          this.deleteLoading = false
        }).catch(() => {
          this.deleteLoading = false
        });
    }
  }
}
</script>
