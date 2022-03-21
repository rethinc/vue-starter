import { RouteRecordRaw } from 'vue-router'

export interface ExampleNavigationItem {
  name: string
  routerPath: string
}

export interface PathNavigationItem {
  name: string
  children: NavigationItem[]
}

export type NavigationItem = ExampleNavigationItem | PathNavigationItem

export const isPathNavigationItem = (
  navigationItem: NavigationItem
): navigationItem is PathNavigationItem => {
  return 'children' in navigationItem
}

export const isExampleNavigationItem = (
  navigationItem: NavigationItem
): navigationItem is ExampleNavigationItem => {
  return 'routerPath' in navigationItem
}

export const mapRoutesToNavigationItems = (
  routes: RouteRecordRaw[]
): NavigationItem[] => {
  const navigationItems: NavigationItem[] = []
  routes.forEach((route) => {
    const pathSegments = route.path.slice(1, route.path.length).split('/')
    const path = route.path
    const existingPathNavigationItem = findPathNavigationItemForPath(
      pathSegments,
      navigationItems.filter(isPathNavigationItem)
    )
    if (existingPathNavigationItem) {
      existingPathNavigationItem.children.push(
        mapPathToNavigationItem(pathSegments, path)
      )
    } else {
      navigationItems.push(mapPathToNavigationItem(pathSegments, path))
    }
  })

  return navigationItems
}

const findPathNavigationItemForPath = (
  pathSegments: string[],
  pathNavigationItems: PathNavigationItem[]
): PathNavigationItem | undefined => {
  const foundPathNavigationItem = pathNavigationItems.find(
    (pathNavigationItem) => pathNavigationItem.name === pathSegments[0]
  )
  if (foundPathNavigationItem) {
    pathSegments.shift()
    const childPathNavigationItem = findPathNavigationItemForPath(
      pathSegments,
      foundPathNavigationItem.children.filter(isPathNavigationItem)
    )
    if (childPathNavigationItem) {
      return childPathNavigationItem
    }
    return foundPathNavigationItem
  }
}

const mapPathToNavigationItem = (
  remainingPathSegments: string[],
  completePath: string
): NavigationItem => {
  const pathSegment = remainingPathSegments.shift()
  if (remainingPathSegments.length === 0) {
    return {
      name: pathSegment,
      routerPath: completePath,
    } as ExampleNavigationItem
  }
  if (!pathSegment) {
    throw new Error(
      'Should never been reached, because of length check for remainingPathSegments'
    )
  }
  return {
    name: pathSegment,
    children: [mapPathToNavigationItem(remainingPathSegments, completePath)],
  }
}
