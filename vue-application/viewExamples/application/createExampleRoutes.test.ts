import { createExampleNode } from '../queryExamples'

import { createExample } from '../queryExamples.test.factories'
import { createExampleRoutes } from './createExampleRoutes'

describe('createExampleRoutes', () => {
  it('should create route for examples', () => {
    const exampleNodes = [
      createExampleNode('nodeName', {
        examples: [
          createExample('ExampleComponent1'),
          createExample('ExampleComponent2'),
        ],
      }),
    ]

    const routes = createExampleRoutes(exampleNodes)

    expect(routes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: '/nodeName/ExampleComponent1' }),
        expect.objectContaining({ path: '/nodeName/ExampleComponent2' }),
      ])
    )
  })

  it('should create route for node siblings', () => {
    const exampleNodes = [
      createExampleNode('node-1', {
        examples: [createExample('ExampleComponent-1')],
      }),
      createExampleNode('node-2', {
        examples: [createExample('ExampleComponent-2')],
      }),
    ]

    const routes = createExampleRoutes(exampleNodes)

    expect(routes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: '/node-1/ExampleComponent-1' }),
        expect.objectContaining({ path: '/node-2/ExampleComponent-2' }),
      ])
    )
  })

  it('should create path hierarchy for examples', () => {
    const exampleNodes = [
      createExampleNode('nodeLevel-1', {
        nodes: [
          createExampleNode('nodeLevel-2-1', {
            examples: [createExample('ExampleComponent-2-1')],
          }),
          createExampleNode('nodeLevel-2-2', {
            examples: [createExample('ExampleComponent-2-2')],
          }),
        ],
      }),
    ]

    const routes = createExampleRoutes(exampleNodes)

    expect(routes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: '/nodeLevel-1/nodeLevel-2-1/ExampleComponent-2-1',
        }),
        expect.objectContaining({
          path: '/nodeLevel-1/nodeLevel-2-2/ExampleComponent-2-2',
        }),
      ])
    )
  })
})
