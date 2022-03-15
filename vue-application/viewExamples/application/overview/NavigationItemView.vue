<template>
  <li>
    <div v-if="isPath" :style="itemPadding">
      {{ navigationItem.name }}
    </div>
    <div v-else>
      <RouterLink
        active-class="active-link"
        :to="navigationItem.routerPath"
        :style="itemPadding"
      >
        {{ navigationItem.name }}
      </RouterLink>
    </div>

    <ul v-if="isPath">
      <NavigationItemView
        v-for="child in navigationItem.children"
        :key="child.name"
        :navigation-item="child"
        :navigation-level="childrenNavigationLevel"
      />
    </ul>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import {
  isPathNavigationItem,
  NavigationItem,
} from './mapRoutesToNavigationItems'

export default defineComponent({
  name: 'NavigationItemView',
  props: {
    navigationItem: {
      type: Object as PropType<NavigationItem>,
      required: true,
    },
    navigationLevel: {
      type: Number as PropType<number>,
      default: 0,
    },
  },
  setup(props) {
    const itemPadding = {
      'padding-left': `${props.navigationLevel * 10}px`,
    }
    const isPath = isPathNavigationItem(props.navigationItem)
    const childrenNavigationLevel = props.navigationLevel + 1

    return {
      isPath,
      itemPadding,
      childrenNavigationLevel,
    }
  },
})
</script>

<style scoped lang="scss">
li,
ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

li {
  padding: 3px 0 3px 0;
}

a {
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
