<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <v-icon icon="mdi-circle-slice-6" />

      Essentials Preset
    </v-app-bar-title>

    <v-spacer />

    <v-menu open-on-hover>
      <template v-slot:activator="{ props }">
        <v-btn class="text-capitalize text-grey-darken-4" rounded="lg" v-bind="props" prepend-icon="mdi-tray-arrow-up">
          Upload
        </v-btn>
      </template>
      <v-list density="compact" class="py-0" rounded="lg">
        <v-list-item density="compact" to="/admin/dashboard/blog">
          <v-list-item-title>Blog post</v-list-item-title>
        </v-list-item>
        <v-list-item density="compact" to="/admin/dashboard/gallery">
          <v-list-item-title>Gallery</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>
