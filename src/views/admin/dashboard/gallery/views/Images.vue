<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="4">
        <ImageTray />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="4" md="3" v-for="folder in gallery.folders" :key="folder.id">
        <v-list class="py-0" density="compact" rounded="lg" elevation="2"
          @dblclick="$router.push(`/admin/dashboard/gallery/${folder.id}`)">
          <v-list-item :title="folder?.folderName" :subtitle="new Date(folder.createdAt?.seconds * 1000).toDateString()"
            density="compact">
            <!--  -->
            <template v-slot:append>
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn v-bind="props" color="transparent" flat icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list rounded="lg" density="compact" class="py-0">
                  <v-list-item :to="`/admin/dashboard/gallery/${folder.id}`" density="compact">
                    <v-list-item-title class="text-body-2">Open {{ folder?.folderName }}</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="deleteFolder(folder)" density="compact">
                    <v-list-item-title class="text-body-2 text-red">Delete {{ folder?.folderName }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>

    <v-row v-for="folder in gallery.folders" :key="folder.id">
      <AllimagesFromFolders :folder="folder" />
    </v-row>

    <v-divider class="my-10" />

    <v-row>
      <v-col v-for="image in gallery.gallery" :key="image.id" cols="12" sm="6" md="4" lg="3">
        <v-card @click="imageDialog = { active: true, ...image }" rounded="lg">
          <v-img :src="image?.image" aspect-ratio="16/9" cover />
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="imageDialog.active" width="600" scrollable>
      <v-card>
        <v-toolbar density="comfortable">
          <v-spacer />

          <v-btn icon @click="imageDialog.active = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text>
          <v-img :src="imageDialog.image" />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>
    
<script>
import ImageTray from '@/views/admin/dashboard/gallery/components/ImageTray.vue'
import AllimagesFromFolders from '../components/AllimagesFromFolders.vue';
import { useAdminGalleryStore } from "@/store/admin/gallery";
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '@/plugins/firebase';
import { deleteObject, getStorage, ref } from 'firebase/storage';
import { useAppStore } from '@/store/app';
const storage = getStorage()

export default {
  data: () => ({
    imageDialog: { active: false }
  }),

  setup() {
    const gallery = useAdminGalleryStore()
    const app = useAppStore()

    return {
      gallery,
      app
    }
  },

  components: {
    ImageTray,
    AllimagesFromFolders
  },

  methods: {
    async deleteFolder(prop) {
      const querySnapShot = await getDocs(collection(db, 'gallery', prop.id, 'images'))

      if (querySnapShot.docs.length >= 1) {
        querySnapShot.forEach(document => {
          const desertRef = ref(storage, document.data().imageLink)

          deleteObject(desertRef)
            .then(async () => {
              // File deleted successfully
              await deleteDoc(doc(db, 'gallery', prop.id, 'images', document.id))

              this.app.snackbar = {
                active: true,
                color: 'green',
                text: `image deleted successfully`,
                textColor: 'text-white'
              }
            }).catch((error) => {
            });
        })
      } else {
        await deleteDoc(doc(db, 'gallery', prop.id))
        this.app.snackbar = {
          active: true,
          color: 'green',
          text: `folder deleted successfully`,
          textColor: 'text-white'
        }
      }
    }
  }
}
</script>
  