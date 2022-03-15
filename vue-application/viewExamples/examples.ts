import IconViewExample from './examples/shared/IconViewExample.vue'
import { Component } from 'vue'

export interface ExampleNode {
  name: string
  examples: Example[]
  nodes: ExampleNode[]
}

export interface Example {
  name: string
  component: Component
}

export const createExampleNode = (
  name: string,
  overrides: Partial<ExampleNode> = {}
): ExampleNode => {
  return {
    name,
    nodes: [],
    examples: [],
    ...overrides,
  }
}

export const exampleNodes = [
  createExampleNode('application', {
    nodes: [
      createExampleNode('shared', {
        examples: [{ name: 'icons', component: IconViewExample }],
      }),
    ],
  }),
]
