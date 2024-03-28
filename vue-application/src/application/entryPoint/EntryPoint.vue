<script setup lang="ts">
import IconView from '@/application/icons/IconView.vue'
import { IconColorizable, IconOriginal } from '@/application/icons/icons'
</script>

<template>
  <h1>re:thinc - vue starter</h1>
  <p>
    If you can see this you successfully installed the re:thinc vue starter
    <iconView :type="IconColorizable.Checkmark" class="style-text" />. We should
    take a moment, maybe grab a coffee, before continuing your new adventure
    also known as project.
  </p>
  <p>
    You can now
    <iconView :type="IconOriginal.BellCheckmark" class="style-text" /> change
    the entry point or start with your first use case by adding it in the
    "application" directory
  </p>
</template>

<style scoped lang="scss">
@import '../../assets/styles/colors';

p {
  color: $primary;
}
</style>
