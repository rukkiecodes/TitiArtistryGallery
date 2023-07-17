// Utilities
import { defineStore } from 'pinia'
import { useAppStore } from '../app'

import { auth, db } from '@/plugins/firebase'
import { addDoc, arrayUnion, collection, doc, getDocs, onSnapshot, query, serverTimestamp, updateDoc, where } from 'firebase/firestore'
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage"

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
        folderTitle: 'drghdryj',
        images: []
    }),

    actions: {
        async savePost() {
            const id = await JSON.parse(localStorage.titiArtCollectionUser).uid

            if (this.image == null || this.title == '') {
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
                                    title: this.title,
                                    single: true,
                                    dateCreated: serverTimestamp(),
                                })

                                this.loading = false
                                this.imageDialog = false

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

            // const q = query(collection(db, 'gallery'), where('folderTitle', '==', this.folderTitle))

            // const querySnapshot = await getDocs(q)


            // if (querySnapshot.docs.length == 0) {

            //     let count = 0

            //     const setDocument = async () => {
            //         this.loading = true

            //         await addDoc(collection(db, 'gallery'), {
            //             image: null,
            //             imageLink: null,
            //             title: null,
            //             single: false,
            //             images: this.images,
            //             folderTitle: this.folderTitle,
            //             dateCreated: serverTimestamp(),
            //         })

            //         this.loading = false

            //         app.snackbar = {
            //             active: true,
            //             color: 'green',
            //             text: `${this.images.length} image${this.images.length == 1 ? '' : 's'} uploaded successfully`,
            //             textColor: 'text-white'
            //         }
            //     }

            //     const startUpload = ({ file }) => {
            //         let link = `gallery/${this.folderTitle}/${file.name}`

            //         const storageRef = ref(storage, link)

            //         const uploadTask = uploadBytesResumable(storageRef, file)

            //         this.loading = true

            //         uploadTask.on('state_changed', snapshop => { },
            //             error => { },
            //             () => {
            //                 getDownloadURL(uploadTask.snapshot.ref)
            //                     .then(async downloadURL => {
            //                         this.images.push({
            //                             image: downloadURL,
            //                             imageLink: uploadTask.snapshot.ref.fullPath,
            //                         })
            //                     })

            //                 count++

            //                 this.loading = false

            //                 if (count == files.length) {
            //                     this.loading = true
            //                     setDocument()
            //                 }
            //             })
            //     }

            //     files.forEach(file => {
            //         startUpload(file)
            //     })
            // }
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
