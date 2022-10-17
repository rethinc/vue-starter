import { describe, it, expect } from 'vitest'
import { RouteRecordRaw } from 'vue-router'
import { defineComponent } from 'vue'
import {
  mapRoutesToNavigationItems,
  NavigationItem,
} from './mapRoutesToNavigationItems'

describe('mapRoutesToNavigationItems', () => {
  it('should map route with one path segment to example navigation item', () => {
    const routePath1 = '/example1'
    const routePath2 = '/example2'

    const navigationItems = mapRoutesToNavigationItems([
      createRouteWithPath(routePath1),
      createRouteWithPath(routePath2),
    ])

    const expectedRoutes: NavigationItem[] = [
      { name: 'example1', routerPath: routePath1 },
      { name: 'example2', routerPath: routePath2 },
    ]
    expect(navigationItems).toStrictEqual(expectedRoutes)
  })

  it('should map path with two segments to path with example navigation items', () => {
    const routePath = '/path/example'

    const navigationItems = mapRoutesToNavigationItems([
      createRouteWithPath(routePath),
    ])

    const expectedRoutes: NavigationItem[] = [
      {
        name: 'path',
        children: [{ name: 'example', routerPath: routePath }],
      },
    ]
    expect(navigationItems).toStrictEqual(expectedRoutes)
  })

  it('should map path segments to path navigation items with example navigation item at the end', () => {
    const routePath = '/path-1/path-2/example'

    const navigationItems = mapRoutesToNavigationItems([
      createRouteWithPath(routePath),
    ])

    const expectedRoutes: NavigationItem[] = [
      {
        name: 'path-1',
        children: [
          {
            name: 'path-2',
            children: [{ name: 'example', routerPath: routePath }],
          },
        ],
      },
    ]
    expect(navigationItems).toStrictEqual(expectedRoutes)
  })

  it('should map path segments only once', () => {
    const exampleName1 = 'example1'
    const exampleName2 = 'example2'
    const routePath1 = `/path/${exampleName1}`
    const routePath2 = `/path/${exampleName2}`

    const navigationItems = mapRoutesToNavigationItems([
      createRouteWithPath(routePath1),
      createRouteWithPath(routePath2),
    ])

    const expectedRoutes: NavigationItem[] = [
      {
        name: 'path',
        children: [
          { name: exampleName1, routerPath: routePath1 },
          { name: exampleName2, routerPath: routePath2 },
        ],
      },
    ]
    expect(navigationItems).toStrictEqual(expectedRoutes)
  })

  const createRouteWithPath = (path: string): RouteRecordRaw => ({
    path: path,
    component: defineComponent({}),
  })
})
