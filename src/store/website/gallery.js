// Utilities
import { defineStore } from 'pinia'
import { useAppStore } from '../app'

import { db } from '@/plugins/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'

const app = useAppStore()

export const useGalleryStore = defineStore('gallery', {
    state: () => ({
        image: null,
        title: '',
        body: ``,

        loading: false,

        gallery: [],
        folders: []
    }),

    actions: {
        async getGallery() {
            const q = query(collection(db, "gallery"), where('documentType', '==', 'file'))

            const snapshot = await getDocs(q)

            let array = []
            snapshot.forEach(doc => {
                array.push({
                    id: doc.id,
                    ...doc.data()
                })
            })

            this.gallery = array
        },

        async getFolders() {
            const q = query(collection(db, "gallery"), where('documentType', '==', 'folder'))

            const snapshot = await getDocs(q)
            const folders = [];
            snapshot.forEach((doc) => {
                folders.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            // this.folders = folders

            let collectiveImages = []

            folders.forEach(async document => {
                let snapshot = await getDocs(collection(db, "gallery", document.id, 'images'))

                snapshot.forEach(doc => {
                    collectiveImages.push({
                        id: doc.id,
                        ...doc.data()
                    })
                })
            })

            this.gallery = collectiveImages
        },
    }
})
