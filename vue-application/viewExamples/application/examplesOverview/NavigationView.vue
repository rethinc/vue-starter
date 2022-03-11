<template>
  <ul class="navigation">
    <NavigationViewExampleNode
      v-for="exampleNode in exampleNodes"
      :key="exampleNode.name"
      :example-node="exampleNode"
    />
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { examples, exampleNodes } from '../../examples'
import NavigationViewExampleNode from './NavigationViewExampleNode.vue'

export default defineComponent({
  name: 'NavigationView',
  components: { NavigationViewExampleNode },

  setup() {
    return {
      examples,
      exampleNodes,
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
