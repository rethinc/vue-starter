<script setup lang="ts">
import { computed } from 'vue'
import { iconByType, IconType } from './icons'

const props = defineProps<{
  type: IconType
}>()

const icon = computed<string>(() => iconByType(props.type))
</script>

<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div v-if="icon" class="icon" v-html="icon" />
</template>

<style lang="scss" scoped>
.icon {
  width: 100%;
  height: 100%;

  :deep(svg) {
    display: block;
    width: 100%;
    height: 100%;
  }
}

.style-text {
  display: inline;
  width: 1em;
  height: 1em;

  :deep(svg) {
    width: 1em;
    height: 1em;
    top: 0.125em;
    position: relative;
  }
}
</style>
