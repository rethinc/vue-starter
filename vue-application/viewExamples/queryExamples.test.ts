import { defineComponent } from 'vue'
import { createExampleNode, findExampleByPath } from './queryExamples'

describe('queryExamples', () => {
  describe('findExampleByPath', () => {
    it('should return example when found in path', () => {
      const expectedExample = createExample('ExampleComponent')
      const exampleNode = createExampleNode('exampleNode', {
        examples: [expectedExample],
      })

      const example = findExampleByPath(
        [exampleNode],
        'exampleNode/ExampleComponent'
      )

      expect(example).toBe(expectedExample)
    })

    it('should return undefined when example node not found', () => {
      const exampleNode = createExampleNode('otherNode', {
        examples: [createExample('OtherComponent')],
      })
      const example = findExampleByPath(
        [exampleNode],
        'exampleNode/ExampleComponent'
      )

      expect(example).toBeUndefined()
    })

    it('should return undefined when example not found in example node', () => {
      const exampleNode = createExampleNode('exampleNode', {
        examples: [createExample('OtherComponent')],
      })
      const example = findExampleByPath(
        [exampleNode],
        'exampleNode/ExampleComponent'
      )

      expect(example).toBeUndefined()
    })

    it('should return nested example when found in path', () => {
      const expectedExample = createExample('ExampleComponent')
      const exampleNode = createExampleNode('nodeLevel1', {
        nodes: [
          createExampleNode('nodeLevel2', {
            examples: [expectedExample],
          }),
        ],
      })

      const example = findExampleByPath(
        [exampleNode],
        'nodeLevel1/nodeLevel2/ExampleComponent'
      )

      expect(example).toBe(expectedExample)
    })

    const createExample = (name = 'exampleName') => ({
      name,
      component: defineComponent({}),
    })
  })
})
