<template>
  <v-container>
    <v-sheet min-height="90vh" class="d-flex align-center" color="transparent">
      <v-row>
        <v-col cols="12" sm="6">
          <v-card width="500" max-width="100%" class="mx-auto ma-0 pa-0" flat color="transparent">
            <v-card-title class="text-h4 text-sm-h4 text-center">Drop me a line</v-card-title>
            <ContactForm />
          </v-card>
        </v-col>
        <v-col cols="12" sm="6">
          <ContactDetailes />
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>
  
<script setup>
import ContactForm from '@/components/website/contact/ContactForm.vue'
import ContactDetailes from '@/components/website/contact/ContactDetailes.vue'
</script>
