<template>
  <h1>IconView</h1>
  <h2>Original icons</h2>
  <icon-view
    v-for="type in IconOriginal"
    :key="type"
    :type="type"
    class="icon-example"
  />

  <h2>Colorizable icons</h2>

  <div>
    <icon-view
      v-for="type in IconColorizable"
      :key="type"
      :type="type"
      :style="iconsColorizableStyle"
      class="icon-example"
    />
  </div>
  <button class="change-color-button" @click.prevent="changeColor">
    Change Color
  </button>

  <h2>Styles</h2>
  Styles are defined with the css 'class' attribute

  <h3>default</h3>
  <p>Sizes can be defined on icon element or its parent</p>
  <div style="display: flex">
    <icon-view
      :type="IconOriginal.BellCheckmark"
      style="width: 200px; height: 200px"
    />

    <div style="width: 200px; height: 200px; border: 1px solid green">
      <icon-view :type="IconOriginal.BellCheckmark" />
    </div>
  </div>

  <h3>style-text</h3>
  <p>Sizes will be adapted by current font-size value of parent element</p>
  <p class="text-example">
    <icon-view :type="IconColorizable.Checkmark" class="style-text" />
    sed do eiusmod tempor incididunt ut labore et dolore
    <icon-view :type="IconOriginal.BellCheckmark" class="style-text" /> magna
    aliqua.
  </p>
  <p class="text-example-larger">
    <icon-view :type="IconColorizable.Checkmark" class="style-text" />
    sed do eiusmod tempor incididunt ut labore et dolore
    <icon-view :type="IconOriginal.BellCheckmark" class="style-text" /> magna
    aliqua.
  </p>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import IconView from './IconView.vue'
import { IconColorizable, IconOriginal } from './icons'

export default defineComponent({
  name: 'IconViewExample',
  components: { IconView },
  setup: () => {
    const colors = ['#F00', '#0F0', '#00F']
    let currentColorIndex = 0
    const iconsColorizableStyle = ref({
      color: colors[currentColorIndex],
    })

    const changeColor = () => {
      currentColorIndex = (currentColorIndex + 1) % 3
      iconsColorizableStyle.value = { color: colors[currentColorIndex] }
    }

    return {
      IconOriginal,
      IconColorizable,
      changeColor,
      iconsColorizableStyle,
    }
  },
})
</script>

<style lang="scss" scoped>
.icon-example {
  width: 30px;
  height: 30px;
}

.change-color-button {
  margin-top: 10px;
}

.text-example {
  color: salmon;
  font-size: 14px;
}
.text-example-larger {
  color: salmon;
  font-size: 18px;
}
</style>
