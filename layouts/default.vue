<template>
  <v-app class="layout-default">
    <v-app-bar height="60">
      <az-header />
    </v-app-bar>
    <v-main class="main-content">
      <az-breadcrumb />
      <NuxtPage />
    </v-main>
    <az-snackbar />
    <az-dialog />
  </v-app>
</template>
<style lang="scss" scoped>
.main-content {
  background-color: rgb(var(--v-theme-background));
}
</style>
