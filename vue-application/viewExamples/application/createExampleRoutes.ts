import { RouteRecordRaw } from 'vue-router'
import { ExampleNode } from '../queryExamples'
import ViewExampleIFrame from '../application/viewExample/ViewExampleIFrame.vue'

export const createExampleRoutes = (
  exampleNodes: ExampleNode[]
): RouteRecordRaw[] => {
  return exampleNodes.flatMap((exampleNode) =>
    createExampleRoutesFromExampleNode(exampleNode)
  )
}

const createExampleRoutesFromExampleNode = (
  exampleNode: ExampleNode,
  parentPath = ''
): RouteRecordRaw[] => {
  const path = `${parentPath}/${exampleNode.name}`
  const exampleRoutes = exampleNode.examples.map((example) => ({
    path: `${path}/${example.name}`,
    component: ViewExampleIFrame,
    props: { selectedExample: { path, name: example.name } },
  }))
  const exampleNodeRoutes = exampleNode.nodes.flatMap((exampleNode) =>
    createExampleRoutesFromExampleNode(exampleNode, path)
  )
  return [...exampleRoutes, ...exampleNodeRoutes]
}
