<script setup lang="ts">
import { ExampleNavigationItem } from './mapRoutesToNavigationItems'

defineProps<{ exampleNavigationItem: ExampleNavigationItem }>()
</script>

<template>
  <RouterLink :to="exampleNavigationItem.routerPath" class="router-link">
    {{ exampleNavigationItem.name }}
  </RouterLink>
</template>

<style scoped lang="scss">
.router-link {
  text-decoration: none;
  color: grey;
  display: block;
  padding: 3px 0 3px 0;
}

.router-link-active {
  color: red;
}
</style>
