<template>
  <div class="view-examples-overview">
    <NavigationView class="navigation" />
    <ViewExampleIFrame />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavigationView from './NavigationView.vue'
import ViewExampleIFrame from './ViewExampleIFrame.vue'

export default defineComponent({
  name: 'ExamplesOverview',
  components: { ViewExampleIFrame, NavigationView },
})
</script>

<style scoped lang="scss">
.view-examples-overview {
  height: 100%;
  display: flex;
  flex-direction: row;

  .navigation {
    flex: 0 0 200px;
    overflow-y: auto;
  }
}
</style>
