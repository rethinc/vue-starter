<template>
  <RouterLink
    :to="exampleNavigationItem.routerPath"
    active-class="active-link"
    class="router-link"
  >
    {{ exampleNavigationItem.name }}
  </RouterLink>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ExampleNavigationItem } from './mapRoutesToNavigationItems'

export default defineComponent({
  props: {
    exampleNavigationItem: {
      type: Object as PropType<ExampleNavigationItem>,
      required: true,
    },
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
