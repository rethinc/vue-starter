<template>
  <div class="view-examples-overview">
    <NavigationView class="navigation" />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavigationView from './NavigationView.vue'

export default defineComponent({
  name: 'ExamplesOverview',
  components: { NavigationView },
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
