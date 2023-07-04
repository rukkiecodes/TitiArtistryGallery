// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    snackbar: {
      active: false,
      text: '',
      color: '',
      textColor: ''
    }
  }),
})
