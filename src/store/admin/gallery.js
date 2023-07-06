// Utilities
import { defineStore } from 'pinia'
import { useAppStore } from '../app'

import { auth, db } from '@/plugins/firebase'
import { addDoc, collection, doc, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore'
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage"

const app = useAppStore()

export const useAdminGalleryStore = defineStore('adminGallery', {
    state: () => ({
        image: null,
        title: '',
        body: ``,

        loading: false,

        gallery: []
    }),

    actions: {
        async savePost() {
            const id = await JSON.parse(localStorage.titiArtCollectionUser).uid

            if (this.image == null || this.title == '' || this.body == '') {
                app.snackbar = {
                    active: true,
                    text: 'Please fill the form to complete the gallery',
                    color: 'amber',
                    textColor: 'text-white'
                }
            } else {
                let file = this.image

                const storage = getStorage()

                let link = `gallery/${id}/${file.name}`

                const storageRef = ref(storage, link)

                const uploadTask = uploadBytesResumable(storageRef, file)

                this.loading = true

                uploadTask.on('state_changed', snapshot => { },
                    error => { },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref)
                            .then(async downloadURL => {
                                await addDoc(collection(db, 'gallery'), {
                                    image: downloadURL,
                                    imageLink: uploadTask.snapshot.ref.fullPath,
                                    title: this.title,
                                    body: this.body,
                                    dateCreated: serverTimestamp(),
                                })

                                this.loading = false

                                app.snackbar = {
                                    active: true,
                                    color: 'green',
                                    text: 'Image post saved successfully',
                                    textColor: 'text-white'
                                }
                            })
                            .catch(() => {
                                app.snackbar = {
                                    active: true,
                                    color: 'red',
                                    text: 'Image post was not saved',
                                    textColor: 'text-white'
                                }
                            })
                    })
            }
        },

        async getGallery() {
            const q = collection(db, "gallery")

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const gallery = [];
                querySnapshot.forEach((doc) => {
                    gallery.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });

                this.gallery = gallery
            });

            return unsubscribe
        }
    }
})
