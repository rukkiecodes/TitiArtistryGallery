<template>
    <v-col v-if="images.length >= 1" cols="12">
        <v-card flat>
            <v-card-title class="text-grey-darken-3">{{ folderData?.folderName }}</v-card-title>
            <v-card-subtitle>{{ new Date(folderData?.createdAt?.seconds * 1000).toDateString() }}</v-card-subtitle>
        </v-card>
    </v-col>
    <v-col v-for="image in images" :key="image.id" cols="12" sm="6" md="3">
        <v-card @click="displayDialog = { active: true, ...image }" rounded="lg" elevation="0">
            <v-img :src="image?.image" cover max-height="200" class="align-start justify-end" />
        </v-card>
    </v-col>

    <v-dialog v-model="displayDialog.active" width="600" scrollable>
        <v-card rounded="lg">
            <v-toolbar density="comfortable" color="transparent">
                <v-spacer />
                <v-btn icon @click="displayDialog = { active: false }">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>

            <v-card-text class="d-flex justify-center">
                <v-img :src="displayDialog?.image" class="align-start justify-end" />
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import { db } from '@/plugins/firebase';
import { collection, deleteDoc, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore';

import { useAppStore } from '@/store/app'

export default {
    props: {
        folder: {
            type: Object,
            default: [],
        },
    },

    setup() {
        const app = useAppStore()

        return {
            app
        }
    },

    data: () => ({
        images: [],
        folderData: null,
        displayDialog: {
            active: false
        }
    }),

    mounted() {
        this.getCurrentFolderInfo(this.folder?.id)
        this.getImages(this.folder?.id)
    },

    methods: {
        async getCurrentFolderInfo(props) {
            let folder = (await getDoc(doc(db, 'gallery', props))).data()

            this.folderData = folder
        },

        async getImages(props) {
            const q = query(collection(db, "gallery", props, 'images'), where('fileType', '==', 'image/jpeg'))

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
        }
    }
}
</script>
