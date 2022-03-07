<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div v-if="icon" class="icon" v-html="icon" />
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { iconByType, IconType } from './icons'

export default defineComponent({
  name: 'IconView',
  props: {
    type: {
      type: String as PropType<IconType>,
      required: true,
    },
  },
  setup(props) {
    const icon = computed<string>(() => {
      return iconByType(props.type)
    })
    return {
      icon,
    }
  },
})
</script>

<style lang="scss" scoped>
.icon {
  display: inline-flex;
  width: 100%;
  height: 100%;

  :deep(svg) {
    width: 100%;
    height: 100%;
  }
}

.style-text {
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
