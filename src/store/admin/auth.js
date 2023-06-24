// Utilities
import { auth } from '@/plugins/firebase'
import router from '@/router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        email: 'LexiTidream@gmail.com',
        password: 'LexiTidream@001@!',

        loading: false
    }),

    actions: {
        authenticateUser() {
            if (this.email == '' || this.password == '') return

            this.loading = true

            signInWithEmailAndPassword(auth, this.email, this.password)
                .then(user => {
                    console.log(user)
                    this.loading = false

                    localStorage.titiArtCollectionUser = user.user
                    router.push('/admin/dashboard')
                })
                .catch(error => {
                    console.log(error)
                    this.loading = false
                })
        }
    }
})
