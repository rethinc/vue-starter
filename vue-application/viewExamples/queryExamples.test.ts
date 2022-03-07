import { defineComponent } from 'vue'
import {
  createExampleNode,
  createExampleRootNode,
  ExampleRootNode,
  findExampleByPath,
} from './queryExamples'

describe('queryExamples', () => {
  describe('findByPath', () => {
    const expectedExample = {
      name: 'ExampleComponent',
      component: defineComponent({}),
    }

    it('should return example when found in path', () => {
      const exampleRootNode: ExampleRootNode = createExampleRootNode({
        examples: [expectedExample],
      })

      const example = findExampleByPath(exampleRootNode, 'ExampleComponent')

      expect(example).toBe(expectedExample)
    })

    it('should return undefined when component not found in path', () => {
      const exampleRootNode: ExampleRootNode = createExampleRootNode()

      const example = findExampleByPath(exampleRootNode, 'ExampleComponent')

      expect(example).toBeUndefined()
    })

    it('should return nested example when found in path', () => {
      const exampleRootNode: ExampleRootNode = createExampleRootNode({
        nodes: [
          createExampleNode('exampleNode', { examples: [expectedExample] }),
        ],
      })

      const example = findExampleByPath(
        exampleRootNode,
        'exampleNode/ExampleComponent'
      )

      expect(example).toBe(expectedExample)
    })

    it('should return undefined when nested example not found in path', () => {
      const exampleRootNode: ExampleRootNode = createExampleRootNode({
        nodes: [createExampleNode('exampleNode')],
      })

      const example = findExampleByPath(
        exampleRootNode,
        'exampleNode/ExampleComponent'
      )

      expect(example).toBeUndefined()
    })
  })
})
