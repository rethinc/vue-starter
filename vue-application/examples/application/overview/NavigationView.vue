<script setup lang="ts">
import { exampleRoutes } from '@examples/routes'
import NavigationItemView from './NavigationItemView.vue'
import { mapRoutesToNavigationItems } from './mapRoutesToNavigationItems'

const navigationItems = mapRoutesToNavigationItems(exampleRoutes)
</script>

<template>
  <ul class="navigation">
    <NavigationItemView
      v-for="navigationItem in navigationItems"
      :key="navigationItem.name"
      :navigation-item="navigationItem"
    />
  </ul>
</template>

<style scoped lang="scss">
.navigation {
  background-color: salmon;
  padding: 0;
  margin: 0;
}
</style>
