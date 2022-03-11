<template>
  <component :is="exampleComponent" v-if="exampleComponent" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { findExampleByPath } from '../../queryExamples'
import { exampleNodes } from '../../examples'

export default defineComponent({
  name: 'ViewExample',
  setup() {
    const route = useRoute()
    return {
      exampleComponent: computed(() => {
        const examplePath = route.query.examplePath as string
        const example = findExampleByPath(exampleNodes, examplePath)
        if (!example) {
          return undefined
        }
        return example.component
      }),
    }
  },
})
</script>
