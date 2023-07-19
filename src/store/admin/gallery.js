// Utilities
import { defineStore } from 'pinia'
import { useAppStore } from '../app'

import { db } from '@/plugins/firebase'
import { addDoc, collection, onSnapshot, query, serverTimestamp, where } from 'firebase/firestore'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"

const app = useAppStore()

const storage = getStorage()

export const useAdminGalleryStore = defineStore('adminGallery', {
    state: () => ({
        image: null,
        title: '',

        loading: false,

        imageDialog: null,
        folderDialog: false,
        newFolderDialog: false,

        gallery: [],
        folders: [],
        folder: [],
        folderTitle: '',
        images: []
    }),

    actions: {
        async savePost() {
            const id = await JSON.parse(localStorage.titiArtCollectionUser).uid

            if (this.image == null) {
                app.snackbar = {
                    active: true,
                    text: 'Please fill the form to complete the gallery',
                    color: 'indigo',
                    textColor: 'text-white'
                }
            } else {
                let file = this.image

                let link = `gallery/${file.name}`

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
                                    fileType: file.type,
                                    documentType: 'file',
                                    createdAt: serverTimestamp()
                                })

                                this.loading = false
                                this.imageDialog = false

                                app.snackbar = {
                                    active: true,
                                    color: 'green',
                                    text: 'Image saved successfully',
                                    textColor: 'text-white'
                                }
                            })
                            .catch(() => {
                                app.snackbar = {
                                    active: true,
                                    color: 'red',
                                    text: 'Image was not saved',
                                    textColor: 'text-white'
                                }
                            })
                    })
            }
        },

        async saveFolder() {
            const id = await JSON.parse(localStorage.titiArtCollectionUser).uid



            if (this.folderTitle == '') {
                app.snackbar = {
                    active: true,
                    color: 'red',
                    text: 'Please enter a folder name',
                    textColor: 'text-white'
                }

                return
            } else {
                this.loading = true

                await addDoc(collection(db, 'gallery'), {
                    documentType: 'folder',
                    folderName: this.folderTitle,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp()
                })

                this.loading = false
                this.newFolderDialog = false
            }
        },

        async getFolders() {
            const q = query(collection(db, "gallery"), where('documentType', '==', 'folder'))

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const folders = [];
                querySnapshot.forEach((doc) => {
                    folders.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });

                this.folders = folders
            });

            return unsubscribe
        },

        async getGallery() {
            const q = query(collection(db, "gallery"), where('documentType', '==', 'file'))

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
