import IconViewExample from './examples/shared/IconViewExample.vue'
import { createExampleNode } from './queryExamples'

export const exampleNodes = [
  createExampleNode('application', {
    nodes: [
      createExampleNode('shared', {
        examples: [{ name: 'icons', component: IconViewExample }],
      }),
    ],
  }),
]
