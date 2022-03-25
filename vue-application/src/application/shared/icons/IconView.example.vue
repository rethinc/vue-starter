<script setup lang="ts">
import { computed, ref } from 'vue'
import IconView from './IconView.vue'
import { IconColorizable, IconOriginal } from './icons'

const colors = ['#F00', '#0F0', '#00F']
let currentColorIndex = 0
const iconsColorizableStyle = ref({
  color: colors[currentColorIndex],
})

const changeColor = () => {
  currentColorIndex = (currentColorIndex + 1) % 3
  iconsColorizableStyle.value = { color: colors[currentColorIndex] }
}

const firstColorizableIcon = computed((): IconColorizable => {
  const firstKey = Object.keys(IconColorizable)[0]
  return IconColorizable[firstKey as keyof typeof IconColorizable]
})

const firstOriginalIcon = computed((): IconOriginal => {
  const firstKey = Object.keys(IconOriginal)[0]
  return IconOriginal[firstKey as keyof typeof IconOriginal]
})
</script>

<template>
  <h1>IconView</h1>
  <h2>Original icons</h2>
  <div style="display: flex">
    <IconView
      v-for="type in IconOriginal"
      :key="type"
      :type="type"
      class="icon-example"
    />
  </div>

  <h2>Colorizable icons</h2>

  <div style="display: flex">
    <IconView
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
    <IconView :type="firstOriginalIcon" style="width: 200px; height: 200px" />

    <div style="width: 200px; height: 200px; border: 1px solid green">
      <IconView :type="firstOriginalIcon" />
    </div>
  </div>

  <h3>style-text</h3>
  <p>Sizes will be adapted by current font-size value of parent element</p>
  <p class="text-example">
    <IconView :type="firstColorizableIcon" class="style-text" />
    sed do eiusmod tempor incididunt ut labore et dolore
    <IconView :type="firstOriginalIcon" class="style-text" /> magna aliqua.
  </p>
  <p class="text-example-larger">
    <IconView :type="firstColorizableIcon" class="style-text" />
    sed do eiusmod tempor incididunt ut labore et dolore
    <IconView :type="firstOriginalIcon" class="style-text" /> magna aliqua.
  </p>
</template>

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
