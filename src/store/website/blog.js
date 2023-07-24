// Utilities
import { defineStore } from 'pinia'
import { useAppStore } from '../app'

import { db } from '@/plugins/firebase'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'

const app = useAppStore()

export const useBlogStore = defineStore('blog', {
    state: () => ({
        image: null,
        title: '',
        body: ``,

        loading: false,

        blogs: []
    }),

    actions: {
        async getBlogs() {
            const q = query(collection(db, "blogs"), orderBy('dateCreated', 'desc'))

            const snapshot = await getDocs(q)

            const blogs = [];
            snapshot.forEach((doc) => {
                blogs.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            this.blogs = blogs
        }
    }
})
