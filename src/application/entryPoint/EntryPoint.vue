<template>
  <h1>re:thinc - vue starter</h1>
  <p>
    If you can see this you successfully installed the re:thinc vue starter
    <iconView :type="IconColorizable.Checkmark" class="style-text" />. We should
    take a moment, maby grab a coffee, before continuing your new adventure also
    known as project.
  </p>
  <p>
    You can now
    <iconView :type="IconOriginal.BellCheckmark" class="style-text" /> change
    the entry point or start with your first use case by adding it in the
    "application" directory
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import IconView from '@/application/shared/icons/IconView.vue'
import {
  IconColorizable,
  IconOriginal,
} from '@/application/shared/icons/IconProvider'

export default defineComponent({
  name: 'EntryPoint',
  components: { IconView },
  setup() {
    return {
      IconColorizable,
      IconOriginal,
    }
  },
})
</script>

<style scoped>
p {
  color: #333;
}
</style>
