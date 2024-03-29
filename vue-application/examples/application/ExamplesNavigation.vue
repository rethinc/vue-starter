<script setup lang="ts">
import { exampleRoutes } from '@examples/routes'
import { ref } from 'vue'
import NavigationItemView from './NavigationItemView.vue'
import { mapRoutesToNavigationItems } from './mapRoutesToNavigationItems'

const navigationItems = mapRoutesToNavigationItems(exampleRoutes)
let showNavigation = ref<boolean>(false)

const onClickToggle = () => {
  showNavigation.value = !showNavigation.value
}
</script>

<template>
  <div class="navigation" :class="{ showNavigation: showNavigation }">
    <button class="style-header" @click="onClickToggle">
      Toggle Navigation
    </button>
    <ul v-if="showNavigation">
      <NavigationItemView
        v-for="navigationItem in navigationItems"
        :key="navigationItem.name"
        :navigation-item="navigationItem"
      />
    </ul>
  </div>
</template>

<style scoped lang="scss">
.navigation {
  z-index: calc(9e999);
  position: fixed;
  right: 0;
  bottom: 0;
  background-color: #252b30;

  &.showNavigation {
    top: 0;
    width: 100%;
  }

  ul {
    margin: 0;
    padding: 0;
  }
}
</style>
