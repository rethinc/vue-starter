<template>
  <li>
    <div :style="nodeItemPadding">
      {{ exampleNode.name }}
    </div>
    <ul v-if="hasNodes || hasExamples">
      <li v-for="example in exampleNode.examples" :key="example.name">
        <RouterLink
          active-class="active-link"
          :to="`${path}/${example.name}`"
          :style="exampleItemPadding"
        >
          {{ example.name }}
        </RouterLink>
      </li>
      <li v-for="childNode in exampleNode.nodes" :key="childNode.name">
        <NavigationViewExampleNode
          :example-node="childNode"
          :parent-path="path"
        />
      </li>
    </ul>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { ExampleNode } from '../../queryExamples'

export default defineComponent({
  name: 'NavigationViewExampleNode',
  props: {
    exampleNode: {
      type: Object as PropType<ExampleNode>,
      required: true,
    },
    parentPath: {
      type: String as PropType<string>,
      default: '',
    },
  },
  setup(props) {
    const hasNodes = computed(() => props.exampleNode.nodes.length > 0)
    const hasExamples = computed(() => props.exampleNode.examples.length > 0)
    const path = computed(() => `${props.parentPath}/${props.exampleNode.name}`)
    const nodeItemPadding = computed(() => {
      const navigationLevel = props.parentPath.split('/').length
      return {
        'padding-left': `${navigationLevel * 10}px`,
      }
    })
    const exampleItemPadding = computed(() => {
      const navigationLevel = path.value.split('/').length
      return {
        'padding-left': `${navigationLevel * 10}px`,
      }
    })

    return {
      hasNodes,
      hasExamples,
      path,
      nodeItemPadding,
      exampleItemPadding,
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
