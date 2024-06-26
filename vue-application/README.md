# {{productName}}

## Issues
- Eslint package can't be updated to latest '9.x.x' version, because the package 'typescript-eslint' has eslint 8.56.x as a peer dependency. For a fresh install downgrade eslint to ^8.56.0" to get a working application again.

## Development

Install nvm [https://github.com/nvm-sh/nvm#installing-and-updating](https://github.com/nvm-sh/nvm#installing-and-updating)

Install and initialize node with version used in project
```
nvm install
npm install
```

Run app locally in development mode
```
npm run dev
```
open browser at [http://localhost:3000](http://localhost:3000)

Build app locally (bundle will be created in `/dist` folder)
```
npm run build
```

Check code format issues
```
npm run lint
```

Fix automatically fixable format/lint issues
```
npm run fix-lint-errors
```

Check typescript types
```
npm run check-types
```

Run vitest test runner in watch mode
```
npm run test
```

Check format/lint issues, typescript types and run tests
```
npm run verify
```

### Views

To add a new example add a vue component file next to the component with a `.example.vue` suffix (e.g MyButton.example.vue).

To view the examples run the dev server
```
npm run dev
```
and open browser at (**trailing '/' is important**)
[http://localhost:3000/examples/](http://localhost:3000/examples/)

### SVG Icons

Place colorizable (color will be defined in css) icons in the `src/application/shared/icons/assets/svg-colorizable` and others in `src/application/shared/icons/assets/svg-original`

After icon changes generate the icon provider file with the command:
```
npm run generate-icons
```

### Dependencies

Check updates for package in package.json
```
npm run check-dependencies
```

Update all package versions in package.json
```
npm run update-dependencies
```

Updated modules and package-lock file
```
npm update
```

## Docker

run docker locally
```
docker build -t {{productName}} .
docker run -dp 8080:80 --name {{productName}} {{productName}}
```

open browser at [http://localhost:8080](http://localhost:8080)
