import { Component } from 'vue'
import IconViewExample from './examples/shared/IconViewExample.vue'

export interface Example {
  name: string
  component: Component
}

export const examples = new Map<string, Example[]>([
  ['Shared', [{ name: 'Icons', component: IconViewExample }]],
])
