<template>
  <ViewExample />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ViewExample from '../application/viewExample/ViewExample.vue'

export default defineComponent({
  name: 'App',
  components: { ViewExample },
})
</script>

<style lang="scss">
@import '../../src/assets/styles/global.scss';
</style>
