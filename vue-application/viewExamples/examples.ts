import IconViewExample from './examples/shared/IconViewExample.vue'
import { createExampleNode, Example } from './queryExamples'

export const examples = new Map<string, Example[]>([
  ['Shared', [{ name: 'Icons', component: IconViewExample }]],
])

export const exampleNodes = [
  createExampleNode('application', {
    nodes: [
      createExampleNode('shared', {
        examples: [{ name: 'icons', component: IconViewExample }],
      }),
    ],
  }),
]
