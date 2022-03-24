declare module '@examples/routes' {
  import { RouteRecordRaw } from 'vue-router'

  export const exampleRoutes: RouteRecordRaw[]
}

declare module '@examples/globalPlugins' {
  import { Plugin } from 'vue'

  export const globalPlugins: Plugin[]
}
