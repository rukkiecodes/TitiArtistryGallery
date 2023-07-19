// Utilities
import { defineStore } from 'pinia'

export const useAdminNavStore = defineStore('adminNav', {
    state: () => ({
        drawer: true,
        mini: false,
        routes: [
            {
                name: 'Website',
                to: '/admin/dashboard/website',
                icon: 'mdi-web',
                subRoute: true
            },
            {
                name: 'Blog',
                to: '/admin/dashboard/blog',
                icon: 'mdi-post-outline',
                subRoute: false
            },
            {
                name: 'Gallery',
                to: '/admin/dashboard/gallery',
                icon: 'mdi-image-multiple-outline',
                subRoute: false
            },
        ]
    }),
})
