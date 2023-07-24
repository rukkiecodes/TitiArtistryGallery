<template>
    <v-card flat rounded="lg" color="transparent">
        <v-card-text>
            <v-text-field v-model="contact.contact.name" label="Name" placeholder="John Doe" variant="underlined"
                color="indigo-accent-4" prepend-inner-icon="mdi-account-outline" />
            <v-text-field v-model="contact.contact.email" label="Email" placeholder="johnDoe@mail.com" variant="underlined"
                color="indigo-accent-4" prepend-inner-icon="mdi-at" />

            <v-textarea v-model="contact.contact.message" label="Your message" placeholder="What's on your mind"
                variant="underlined" color="indigo-accent-4" prepend-inner-icon="mdi-email-outline" rows="4" max-rows="8"
                auto-grow />
        </v-card-text>
        <v-card-actions>
            <v-spacer />
            <v-btn @click="contact.saveMessage" :loading="contact.loading" class="bg-indigo-accent-4" rounded="lg">
                Send message
            </v-btn>
        </v-card-actions>
    </v-card>
</template>


<script setup>
import { useContactStore } from '@/store/website/contact'

const contact = useContactStore()
</script>