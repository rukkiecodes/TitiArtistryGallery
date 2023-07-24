<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="5">
                <v-img :src="post?.image" />
            </v-col>
            <v-col cols="12" sm="7">
                <v-card color="transparent" flat>
                    <v-card-title>{{ post?.title }}</v-card-title>
                    <v-card-text>
                        <div v-html="post?.body"></div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { db } from '@/plugins/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default {
    data: () => ({
        post: null
    }),

    mounted() {
        this.getBlog(this.$route.params.id)
    },

    methods: {
        async getBlog(prop) {
            let post = (await getDoc(doc(db, 'blogs', prop))).data()

            this.post = post
        }
    }
}
</script>
