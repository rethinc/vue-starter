<script setup lang="ts">
import {
  isExampleNavigationItem,
  isPathNavigationItem,
  NavigationItem,
} from './mapRoutesToNavigationItems'

const props = withDefaults(
  defineProps<{
    navigationItem: NavigationItem
    navigationLevel?: number
  }>(),
  {
    navigationLevel: 0,
  }
)

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
</script>

<template>
  <li>
    <div v-if="pathNavigationItem" :style="itemPadding">
      {{ pathNavigationItem.name }}
    </div>
    <div v-if="exampleNavigationItem">
      <RouterLink :to="exampleNavigationItem.routerPath" class="router-link">
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

<style scoped lang="scss">
li,
ul {
  padding: 0;
  margin: 0;
  list-style: none;
  color: white;
}

li {
  padding: 3px 0 3px 0;
}

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
