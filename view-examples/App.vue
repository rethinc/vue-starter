<template>
  <ViewExamplesOverview />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ViewExamplesOverview from './view-examples-overview/ViewExamplesOverview.vue'

export default defineComponent({
  name: 'App',
  components: {
    ViewExamplesOverview,
  },
  setup() {
    return {}
  },
})
</script>

<style lang="scss">
html,
body,
#app {
  height: 100%;
  margin: 0;
}
</style>
