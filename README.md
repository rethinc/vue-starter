#vue starter

Setups a re:thinc opinionated vue environment for web client development

## Usage

Install nvm [https://github.com/nvm-sh/nvm#installing-and-updating](https://github.com/nvm-sh/nvm#installing-and-updating)


### Manual Installation
Checkout repository in project root and run from project root:

`<npm-version>` can be found in vue-starter/.nvmrc

```
nvm install <npm-version>
vue-starter/build-environment.sh <project-name>
cp -r vue-starter/build/{*,.[^.]*} .
rm -rf vue-starter
```

## Development

Install nvm [https://github.com/nvm-sh/nvm#installing-and-updating](https://github.com/nvm-sh/nvm#installing-and-updating)

Install node with version used in project
```
nvm install
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

### Dependencies

Check for updated dependencies
```
npx npm-check-updates
```

Update version in package.json
```
npx npm-check-updates -u
```

Updated modules and package-lock file
```
npm update
```