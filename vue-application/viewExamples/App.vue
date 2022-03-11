<template>
  <ExamplesOverview />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ExamplesOverview from './application/examplesOverview/ExamplesOverview.vue'

export default defineComponent({
  name: 'App',
  components: {
    ExamplesOverview,
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
