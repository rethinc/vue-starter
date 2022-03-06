<template>
  <ul class="view-examples-navigation">
    <li v-for="[path, pathExamples] in examples" :key="path" class="title">
      {{ path }}
      <ul>
        <li v-for="example in pathExamples" :key="example.name" class="link">
          <router-link :to="`/${path}/${example.name}`">
            {{ example.name }}
          </router-link>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { examples } from '../examples'

export default defineComponent({
  name: 'ViewExamplesNavigation',
  emits: ['update:selectedExample'],
  setup() {
    return {
      examples,
    }
  },
})
</script>

<style scoped lang="scss">
ul,
li {
  padding: 0;
  list-style: none;
}

.view-examples-navigation {
  background-color: salmon;
  padding: 0;
  margin: 0;

  .title {
    margin: 10px 0 0 10px;
    font-weight: bold;

    ul {
      margin: 3px 0;
    }
  }
  .link {
    font-weight: normal;
    a {
      display: block;
      padding: 2px 0;
      text-decoration: none;
      color: dimgrey;
    }

    .router-link-active {
      color: inherit;
    }
  }
}
</style>
