// Utilities
import { defineStore } from 'pinia'
import { useAppStore } from '../app'

import { db } from '@/plugins/firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

const app = useAppStore()

export const useContactStore = defineStore('contact', {
    state: () => ({
        contact: {
            name: '',
            email: '',
            message: ''
        },

        loading: false
    }),

    actions: {
        async saveMessage() {
            this.loading = true

            await addDoc(collection(db, 'messages'), {
                ...this.contact,
                sentAt: serverTimestamp()
            })

            this.loading = false

            app.snackbar = {
                active: true,
                text: 'Your message has been sent',
                color: 'green',
                textColor: 'text-white'
            }

            this.contact = {
                name: '',
                email: '',
                message: ''
            }
        }
    }
})
