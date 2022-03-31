<script setup lang="ts">
import { computed } from 'vue'
import { RouteLocationRaw, useRoute } from 'vue-router'
import { ExampleNavigationItem } from './mapRoutesToNavigationItems'

const props = defineProps<{ exampleNavigationItem: ExampleNavigationItem }>()

const route = useRoute()
const routeLocation = computed(
  (): RouteLocationRaw => ({
    path: route.path,
    query: {
      exampleRoute: props.exampleNavigationItem.routerPath,
    },
  })
)
const additionalClasses = computed(() => {
  if (route.query.exampleRoute === props.exampleNavigationItem.routerPath) {
    return 'active'
  }
  return ''
})
</script>

<template>
  <RouterLink
    :to="routeLocation"
    class="router-link"
    :class="additionalClasses"
  >
    {{ exampleNavigationItem.name }}
  </RouterLink>
</template>

<style scoped lang="scss">
.router-link {
  text-decoration: none;
  color: dimgrey;
  display: block;
  padding: 3px 0 3px 0;

  &:hover {
    color: lightblue;
  }

  &.active {
    color: darkgreen;
  }
}
</style>
