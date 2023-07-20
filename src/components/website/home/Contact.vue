<template>
    <v-container class="mt-16">
        <v-card flat class="text-center mb-5" color="transparent">
            <v-card-text class="text-h5 text-sm-h4 font-weight-bold">Contact <span
                    class="text-indigo-accent-4">LexiTindream</span></v-card-text>
        </v-card>

        <v-row>
            <v-col cols="12" sm="6">
                <ContactForm />
            </v-col>
            <v-col cols="12" sm="6">
                <ContactDetailes />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import ContactForm from '@/components/website/contact/ContactForm.vue'
import ContactDetailes from '@/components/website/contact/ContactDetailes.vue'
</script>
