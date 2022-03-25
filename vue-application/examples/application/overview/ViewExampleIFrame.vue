<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const exampleIFramePath = computed(() => {
  return `${route.path}/example-iframe/?exampleRoute=${route.query.exampleRoute}`
})
</script>

<template>
  <iframe class="selected-example-i-frame-view" :src="exampleIFramePath" />
</template>

<style scoped lang="scss">
.selected-example-i-frame-view {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
