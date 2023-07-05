// Utilities
import { defineStore } from 'pinia'
import { useAppStore } from '../app'

import { db } from '@/plugins/firebase'
import { collection, getDocs } from 'firebase/firestore'

const app = useAppStore()

export const useGalleryStore = defineStore('gallery', {
    state: () => ({
        image: null,
        title: '',
        body: ``,

        loading: false,

        gallery: []
    }),

    actions: {
        async getGallery() {
            const q = collection(db, "gallery")

            const snapshot = await getDocs(collection(db, 'gallery'))

            let array = []
            snapshot.forEach(doc => {
                array.push({
                    id: doc.id,
                    ...doc.data()
                })
            })

            this.gallery = array
        }
    }
})
