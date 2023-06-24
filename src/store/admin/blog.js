// Utilities
import { defineStore } from 'pinia'

export const useAdminBlogStore = defineStore('adminBlog', {
    state: () => ({
        image: null,
        title: '',
        body: '',

        loading: false
    }),

    actions: {
        savePost() {

        }
    }
})
