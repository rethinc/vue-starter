import { defineComponent } from 'vue'

export const createExample = (name = 'exampleName') => ({
  name,
  component: defineComponent({}),
})
