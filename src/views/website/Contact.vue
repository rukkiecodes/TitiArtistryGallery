<template>
  <v-container>
    <v-card flat class="text-center my-16">
      <v-card-title class="text-h4 text-sm-h3">Contact</v-card-title>
    </v-card>
    <v-card width="800" flat class="mx-auto pa-0">
      <v-row>
        <v-col cols="12" sm="4">
          <v-card flat class="d-flex flex-column align-center justify-center text-center">
            <v-avatar variant="outlined" color="indigo-darken-4" size="70">
              <v-icon>mdi-map-marker</v-icon>
            </v-avatar>

            <v-card-text>
              <span class="text-grey-darken-4 text-body-1">13/2 Elizabeth St, Melbourne VIC 3000,
                Australia</span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4">
          <v-card flat class="d-flex flex-column align-center justify-center text-center">
            <v-avatar variant="outlined" color="indigo-darken-4" size="70">
              <v-icon>mdi-phone</v-icon>
            </v-avatar>

            <v-card-text>
              <span class="ml-4 text-grey-darken-4 text-body-1"><a href="tel:+1763-245-0896"
                  class="text-grey-darken-4">763-245-0896</a></span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4">
          <v-card flat class="d-flex flex-column align-center justify-center text-center">
            <v-avatar variant="outlined" color="indigo-darken-4" size="70">
              <v-icon>mdi-at</v-icon>
            </v-avatar>

            <v-card-text>
              <span class="ml-4 text-grey-darken-4 text-body-1"><a href="mailto:norjinta@ymail.com"
                  class="text-grey-darken-4">norjinta@ymail.com</a></span>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
    <v-card width="500" max-width="100%" class="mx-auto ma-0 pa-0 mt-16" flat>
      <v-card-title class="text-h4 text-sm-h4 text-center">Drop me a line</v-card-title>
      <ContactForm />
    </v-card>
  </v-container>
</template>
  
<script setup>
import ContactForm from '@/components/website/contact/ContactForm.vue'
</script>
