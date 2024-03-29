<script setup lang="ts">
import NavigationView from './application/NavigationView.vue'
</script>

<template>
  <NavigationView class="navigation" />
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
