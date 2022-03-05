<template>
  <component :is="selectedExampleComponent" />
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { examples } from '../examples'
import { SelectedExample } from './SelectedExample'

export default defineComponent({
  name: 'SelectedExampleView',
  props: {
    selectedExample: {
      type: Object as PropType<SelectedExample>,
      required: true,
    },
  },
  setup(props) {
    const selectedExampleComponent = computed(() => {
      const selectedExampleValue = props.selectedExample
      if (!selectedExampleValue) {
        return undefined
      }
      const exampleComponents = examples.get(selectedExampleValue.path)
      if (!exampleComponents) {
        return undefined
      }
      const example = exampleComponents.find(
        (component) => component.name === selectedExampleValue.name
      )
      return example?.component
    })

    return {
      selectedExampleComponent,
    }
  },
})
</script>

<style scoped lang="scss"></style>
