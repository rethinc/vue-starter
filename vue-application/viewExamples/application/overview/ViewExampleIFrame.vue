<template>
  <iframe class="selected-example-i-frame-view" :src="exampleIFramePath" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'ViewExampleIFrame',
  setup() {
    const route = useRoute()
    const exampleIFramePath = computed(() => {
      return `/viewExampleIFrame${route.path}`
    })

    return {
      exampleIFramePath,
    }
  },
})
</script>

<style scoped lang="scss">
.selected-example-i-frame-view {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
