<template>
  <v-container>
    <v-card width="600" class="mx-auto" flat="">
      <v-card-text>
        <v-sheet @click="clickOnInput" color="grey" width="100%" min-height="200" rounded="lg"
          class="overflow-hidden d-flex align-center justify-center">
          <div v-if="!previewImage" class="d-flex flex-column align-center">
            <v-icon size="50">mdi-image-plus-outline</v-icon>
            <span>Add Image</span>
          </div>
          <v-img v-else :src="previewImage" cover />
        </v-sheet>
      </v-card-text>
      <input type="file" @change="setImage" style="display: none" id="fileInput">

      <v-card-text>
        <v-text-field v-model="blog.title" label="Post title" variant="underlined" color="indigo-darken-2" />

        <div class="editor" ref="editor" style="min-height: 300px;" />
      </v-card-text>
      <v-card-actions>
        <v-btn @click="savePost" :loading="blog.loading" class="bg-indigo-accent-4 text-white" rounded="lg" block>Save
          Post</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { useAdminBlogStore } from '@/store/admin/blog'
import Quill from 'quill'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  data: () => ({
    previewImage: null,
    updateContent: ``
  }),

  setup() {
    const blog = useAdminBlogStore()

    return {
      blog
    }
  },

  mounted() {
    this.$nextTick(() => {
      let options = {
        debug: false,
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],

            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],

            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],

            ['link', 'image'],
            ['clean']

          ]
        },
        placeholder: 'Compose an epic...',
        readOnly: false,
        theme: 'snow',
        height: '400px'
      };

      let quill = new Quill(this.$refs.editor, options)
      quill.on('text-change', () => {
        this.updateContent = quill.root.innerHTML
        this.blog.body = quill.root.innerHTML
      })
    })
  },

  methods: {
    clickOnInput() {
      document.querySelector('#fileInput').click()
    },

    setImage(e) {
      let file = e.target.files[0]

      if (!file) return

      this.previewImage = URL.createObjectURL(file)

      this.image = file

      this.blog.image = file
    },

    savePost() {
      this.blog.savePost()
    }
  }
}
</script>