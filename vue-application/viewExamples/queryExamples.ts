import { Component } from 'vue'

export interface ExampleRootNode {
  examples: Example[]
  nodes: ExampleNode[]
}

export interface ExampleNode {
  name: string
  examples: Example[]
  nodes: ExampleNode[]
}

export interface Example {
  name: string
  component: Component
}

export const createExampleRootNode = (
  overrides: Partial<ExampleRootNode> = {}
): ExampleRootNode => {
  return {
    nodes: [],
    examples: [],
    ...overrides,
  }
}

export const createExampleNode = (
  name: string,
  overrides: Partial<ExampleRootNode> = {}
): ExampleNode => {
  return {
    name,
    nodes: [],
    examples: [],
    ...overrides,
  }
}

export const findExampleByPath = (
  exampleNode: ExampleRootNode | ExampleNode,
  path: string
): Example | undefined => {
  const pathSegments = path.split('/')
  if (pathSegments.length > 1) {
    const childNodeName = pathSegments.shift()
    const childNode = exampleNode.nodes.find(
      (exampleNode: ExampleNode) => exampleNode.name === childNodeName
    )
    if (!childNode) {
      return undefined
    }
    return findExampleByPath(childNode, pathSegments.join('/'))
  }
  return exampleNode.examples.find((example) => example.name === path)
}
