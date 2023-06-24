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
        <v-text-field v-model="blog.title" label="Post title" variant="underlined" color="amber-darken-2" />
        <v-textarea v-model="blog.blog" label="Post" placeholder="What's on your mind" variant="underlined"
          color="amber-darken-2" rows="9" auto-grow max-rows="100" />
      </v-card-text>
      <v-card-actions>
        <v-btn @click="blog.savePost" :loading="blog.loading" class="bg-amber-darken-2 text-white" rounded="lg" block>Save
          Post</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { useAdminBlogStore } from '@/store/admin/blog'
export default {
  data: () => ({
    previewImage: null
  }),

  setup() {
    const blog = useAdminBlogStore()

    return {
      blog
    }
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
    }
  }
}
</script>