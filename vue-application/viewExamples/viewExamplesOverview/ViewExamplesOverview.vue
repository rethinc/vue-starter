<template>
  <div class="view-examples-overview">
    <ViewExamplesNavigation class="navigation" />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ViewExamplesNavigation from './ViewExamplesNavigation.vue'

export default defineComponent({
  name: 'ViewExamplesOverview',
  components: { ViewExamplesNavigation },
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
