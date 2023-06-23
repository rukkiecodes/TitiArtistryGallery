// Utilities
import { defineStore } from 'pinia'

export const useWebNavStore = defineStore('webNav', {
    state: () => ({
        drawer: false,
        routes: [
            {
                name: 'Home',
                to: '/home'
            },
            {
                name: 'Gallery',
                to: '/gallery'
            },
            {
                name: 'Blog',
                to: '/blog'
            },
            {
                name: 'Contact',
                to: '/contact'
            },
            {
                name: 'Booking',
                to: '/booking'
            },
        ]
    }),
})
