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

export const findExampleByPath = (
  exampleNodes: ExampleNode[],
  path: string
): Example | undefined => {
  const pathSegments = path.split('/').filter((segment) => segment.length > 0)
  return findExampleByPathSegments(exampleNodes, pathSegments)
}

const findExampleByPathSegments = (
  exampleNodes: ExampleNode[],
  pathSegments: string[]
): Example | undefined => {
  const nodeName = pathSegments.shift()
  const foundNode = exampleNodes.find(
    (exampleNode: ExampleNode) => exampleNode.name === nodeName
  )
  if (!foundNode) {
    return undefined
  }
  if (pathSegments.length === 1) {
    const exampleName = pathSegments.shift()
    return foundNode.examples.find((example) => {
      return example.name === exampleName
    })
  }
  return findExampleByPathSegments(foundNode.nodes, pathSegments)
}
