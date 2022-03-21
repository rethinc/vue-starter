<template>
  <RouterLink
    :to="routeLocation"
    active-class="active-link"
    class="router-link"
  >
    {{ exampleNavigationItem.name }}
  </RouterLink>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { ExampleNavigationItem } from './mapRoutesToNavigationItems'
import { RouteLocationRaw, useRoute } from 'vue-router'

export default defineComponent({
  props: {
    exampleNavigationItem: {
      type: Object as PropType<ExampleNavigationItem>,
      required: true,
    },
  },
  setup(props) {
    const route = useRoute()
    const routeLocation = computed(
      (): RouteLocationRaw => ({
        path: route.path,
        query: {
          exampleRoute: props.exampleNavigationItem.routerPath,
        },
      })
    )
    return { routeLocation }
  },
})
</script>

<style scoped lang="scss">
.router-link {
  text-decoration: none;
  color: dimgrey;
  display: block;
  padding: 3px 0 3px 0;

  &:hover {
    color: lightblue;
  }

  &.active-link {
    color: darkgreen;
  }
}
</style>
