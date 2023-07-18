<template>
  <v-container>
    <v-toolbar color="white" elevation="0">
      <v-toolbar-title>
        <span v-if="!showFolderTitleInput" @click="showFolderTitleInput = true" class="text-h4">{{ folderData?.folderName
          != '' ? folderData?.folderName : 'Folder title' }}</span>
        <v-text-field v-else @blur="showFolderTitleInput = false" @keypress.enter="updateTitle"
          v-model="folderData.folderName" hide-details placeholder="Folder name" variant="plain" density="compact"
          color="indigo-accent-4" />
      </v-toolbar-title>

      <v-spacer />

      <v-btn v-if="images.length == 0" @click="saveFolder(proccessedFiles)" :loading="loading"
        :disabled="proccessedFiles.length < 1" class="text-capitalize" color="indigo-accent-4">Save images</v-btn>

      <v-btn v-else class="text-capitalize" color="grey-darken-4" prepend-icon="mdi-image-plus-outline">
        Add images

        <v-dialog v-model="addMoreDialog" activator="parent" scrollable fullscreen persistent>
          <v-card flat rounded="0">
            <v-toolbar color="white" elevation="5" density="comfortable">
              <v-btn icon @click="addMoreDialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>{{ folderData?.folderName
                != '' ? folderData?.folderName : 'Folder title' }}</v-toolbar-title>

              <v-spacer />

              <v-btn @click="saveFolder(proccessedFiles)" :loading="loading" :disabled="proccessedFiles.length < 1"
                class="text-capitalize" color="indigo-accent-4">Save images</v-btn>
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
        </v-dialog>
      </v-btn>
    </v-toolbar>

    <v-card rounded="none" flat>
      <v-card-text>
        <v-sheet v-if="images.length == 0" v-on:dragover.prevent v-on:drop="handleFileDrop" color="white"
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

        <v-row v-else>
          <v-col cols="12" sm="6" md="4" v-for="(image, i) in images" :key="i">
            <v-hover>
              <template v-slot:default="{ isHovering, props }">
                <v-card @click="displayDialog = { active: true, ...image }"
                  class="overflow-hidden pa-0 ma-0 d-flex justify-center" flat color="transparent" rounded="lg">
                  <v-img v-if="image?.fileType == 'image/jpeg'" :src="image?.image" v-bind="props" cover max-height="200"
                    class="align-start justify-end"
                    :gradient="isHovering ? 'rgba(0,0,0,0.4), rgba(0,0,0,0.4)' : 'rgba(0,0,0,0), rgba(0,0,0,0)'">
                    <v-fade-transition>
                      <v-card v-if="isHovering" color="transparent" flat>
                        <v-card-actions>
                          <v-spacer />
                          <v-btn @click="deleteImage(image)" icon color="white">
                            <v-icon>mdi-trash-can-outline</v-icon>
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-fade-transition>
                  </v-img>

                  <video v-else width="100">
                    <source :src="image?.image" type="video/mp4">
                    Your browser does not support HTML video.
                  </video>
                </v-card>
              </template>
            </v-hover>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-dialog v-model="displayDialog.active" width="600" scrollable>
      <v-card rounded="lg">
        <v-toolbar density="comfortable" color="transparent">
          <v-spacer />
          <v-btn icon @click="displayDialog = { active: false }">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text class="d-flex justify-center">
          <v-img v-if="displayDialog?.fileType == 'image/jpeg'" :src="displayDialog?.image"
            class="align-start justify-end"
            :gradient="isHovering ? 'rgba(0,0,0,0.4), rgba(0,0,0,0.4)' : 'rgba(0,0,0,0), rgba(0,0,0,0)'" />

          <video v-else width="500" controls autoplay>
            <source :src="displayDialog?.image" type="video/mp4">
            Your browser does not support HTML video.
          </video>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { useAdminGalleryStore } from '@/store/admin/gallery'
import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db } from '@/plugins/firebase'
import { getDownloadURL, getStorage, uploadBytesResumable, ref, deleteObject } from 'firebase/storage'
import { useAppStore } from '@/store/app'

const storage = getStorage()

export default {
  data: () => ({
    showFolderTitleInput: false,
    rawFiles: [],
    proccessedFiles: [],
    folderData: null,
    loading: false,
    images: [],
    addMoreDialog: false,
    displayDialog: {
      active: false
    }
  }),

  setup() {
    const gallery = useAdminGalleryStore()
    const app = useAppStore()

    return {
      gallery,
      app
    }
  },

  mounted() {
    this.getCurrentFolderInfo(this.$route.params.id)
    this.getImages(this.$route.params.id)
  },

  methods: {
    async updateTitle() {
      this.showFolderTitleInput = false

      await updateDoc(doc(db, 'gallery', this.$route.params.id), {
        folderName: this.folderData.folderName
      })
    },

    async getCurrentFolderInfo(props) {
      let folder = (await getDoc(doc(db, 'gallery', props))).data()

      this.folderData = folder
    },

    async getImages(props) {
      const q = collection(db, "gallery", props, 'images')

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const images = [];
        querySnapshot.forEach((doc) => {
          images.push({
            id: doc.id,
            ...doc.data()
          });
        });
        this.images = images
      });

      return unsubscribe
    },

    clickOnInput() {
      document.querySelector('#fileInput').click()
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

    async saveFolder() {
      if (this.folderData == '') {
        this.app.snackbar = {
          active: true,
          color: 'red',
          text: 'Please enter a folder name',
          textColor: 'text-white'
        }

        return
      }

      let files = this.rawFiles

      files.forEach(file => {
        let link = `gallery/${this.folderData.folderName}/${file.name}`

        const storageRef = ref(storage, link)

        const uploadTask = uploadBytesResumable(storageRef, file)

        this.loading = true

        uploadTask.on('state_changed', snapshot => { },
          error => { },
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then(async downloadURL => {
                await addDoc(collection(db, 'gallery', this.$route.params.id, 'images'), {
                  image: downloadURL,
                  imageLink: uploadTask.snapshot.ref.fullPath,
                  fileType: file.type,
                  createdAt: serverTimestamp()
                })
              })
            this.loading = false
            this.addMoreDialog = false

            this.app.snackbar = {
              active: true,
              color: 'green',
              text: `image uploaded successfully`,
              textColor: 'text-white'
            }
          })
      })
    },

    deleteImage(image) {
      const desertRef = ref(storage, image.imageLink)

      // Delete the file
      deleteObject(desertRef)
        .then(async () => {
          // File deleted successfully
          await deleteDoc(doc(db, 'gallery', this.$route.params.id, 'images', image.id))

          this.app.snackbar = {
            active: true,
            color: 'green',
            text: `image deleted successfully`,
            textColor: 'text-white'
          }
        }).catch((error) => {
          // Uh-oh, an error occurred!
          // this.app.snackbar = {
          //   active: true,
          //   color: 'red',
          //   text: `error deleting this image`,
          //   textColor: 'text-white'
          // }
        });
    }
  }
}
</script>