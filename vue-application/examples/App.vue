<script setup lang="ts">
import ExamplesNavigation from './application/ExamplesNavigation.vue'
</script>

<template>
  <ExamplesNavigation />
  <RouterView />
</template>

<style lang="scss">
html,
body,
#app {
  height: 100%;
  margin: 0;
}
</style>
