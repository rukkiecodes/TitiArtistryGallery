<template>
    <v-container class="mt-16">
        <v-card flat class="text-center mb-5">
            <v-card-text class="text-h5 text-sm-h4 font-weight-bold">Contact <span
                    class="text-amber-darken-2">Titi</span></v-card-text>
        </v-card>
        <ContactForm />
    </v-container>
</template>

<script setup>
import ContactForm from '@/components/website/contact/ContactForm.vue'
</script>
