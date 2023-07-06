// Utilities
import { defineStore } from 'pinia'
import { useAppStore } from '../app'

import { auth, db } from '@/plugins/firebase'
import { addDoc, collection, doc, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore'
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage"

const app = useAppStore()

export const useAdminBlogStore = defineStore('adminBlog', {
    state: () => ({
        image: null,
        title: '',
        body: ``,

        loading: false,

        blogs: []
    }),

    actions: {
        async getBlogs() {
            const q = collection(db, "blogs")

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const blogs = [];
                querySnapshot.forEach((doc) => {
                    blogs.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });

                this.blogs = blogs
            });

            return unsubscribe
        }
    }
})
