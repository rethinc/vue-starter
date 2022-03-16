<template>
  <li>
    <div v-if="pathNavigationItem" :style="itemPadding">
      {{ pathNavigationItem.name }}
    </div>
    <div v-if="exampleNavigationItem">
      <RouterLink
        active-class="active-link"
        :to="exampleNavigationItem.routerPath"
        :style="itemPadding"
      >
        {{ exampleNavigationItem.name }}
      </RouterLink>
    </div>

    <ul v-if="pathNavigationItem">
      <NavigationItemView
        v-for="child in pathNavigationItem.children"
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
  isExampleNavigationItem,
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
    const childrenNavigationLevel = props.navigationLevel + 1
    const pathNavigationItem = isPathNavigationItem(props.navigationItem)
      ? props.navigationItem
      : undefined
    const exampleNavigationItem = isExampleNavigationItem(props.navigationItem)
      ? props.navigationItem
      : undefined
    return {
      pathNavigationItem,
      exampleNavigationItem,
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
