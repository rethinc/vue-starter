<template>
  <iframe
    ref="exampleIFrame"
    class="selected-example-i-frame-view"
    src="/view-examples-content/"
  />
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  onUnmounted,
  PropType,
  ref,
  toRefs,
  watch,
} from 'vue'
import { SelectedExample } from './SelectedExample'
import {
  createSelectedExampleMessage,
  ViewExamplesMessage,
} from './ViewExamplesMessage'

export default defineComponent({
  name: 'SelectedExampleIFrameView',
  props: {
    selectedExample: {
      type: Object as PropType<SelectedExample>,
      required: true,
    },
  },
  setup(props) {
    const { selectedExample } = toRefs(props)
    const exampleIFrame = ref<HTMLIFrameElement>()
    let exampleViewMounted = false

    const sendSelectedExampleToIFrame = (selectedExample: SelectedExample) => {
      exampleIFrame.value?.contentWindow?.postMessage(
        createSelectedExampleMessage(selectedExample)
      )
    }

    const messageEventListener = (event: MessageEvent<ViewExamplesMessage>) => {
      if (event.data.type === 'ExampleViewMountedMessage') {
        exampleViewMounted = true
        sendSelectedExampleToIFrame(selectedExample.value)
      }
      if (event.data.type === 'ExampleViewUnmountedMessage') {
        exampleViewMounted = false
      }
    }

    watch(selectedExample, (selectedExample) => {
      if (exampleViewMounted) {
        sendSelectedExampleToIFrame(selectedExample)
      }
    })

    onMounted(() => {
      window.addEventListener('message', messageEventListener)
    })

    onUnmounted(() => {
      window.removeEventListener('message', messageEventListener)
    })

    return {
      exampleIFrame,
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
