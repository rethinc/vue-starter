<template>
  <ul class="navigation">
    <NavigationItemView
      v-for="navigationItem in navigationItems"
      :key="navigationItem.name"
      :navigation-item="navigationItem"
    />
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavigationItemView from './NavigationItemView.vue'
import { mapRoutesToNavigationItems } from './mapRoutesToNavigationItems'
import { exampleRoutes } from '@examples/routes'

export default defineComponent({
  name: 'NavigationView',
  components: { NavigationItemView },

  setup() {
    const navigationItems = mapRoutesToNavigationItems(exampleRoutes)
    return {
      navigationItems,
    }
  },
})
</script>

<style scoped lang="scss">
.navigation {
  background-color: salmon;
  padding: 0;
  margin: 0;
}
</style>
