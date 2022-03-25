<script setup lang="ts">
import NavigationView from './NavigationView.vue'
import ViewExampleIFrame from './ViewExampleIFrame.vue'
</script>

<template>
  <div class="view-examples-overview">
    <NavigationView class="navigation" />
    <ViewExampleIFrame />
  </div>
</template>

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
