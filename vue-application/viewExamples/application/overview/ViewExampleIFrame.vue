<template>
  <iframe
    ref="exampleIFrame"
    class="selected-example-i-frame-view"
    :src="examplePath"
  />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'ViewExampleIFrame',
  setup() {
    const exampleIFrame = ref<HTMLIFrameElement>()
    const route = useRoute()
    const examplePath = computed(() => {
      return `/viewExample${route.path}`
    })

    return {
      exampleIFrame,
      examplePath,
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
