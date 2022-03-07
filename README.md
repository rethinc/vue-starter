#vue starter

Setups a re:thinc opinionated vue environment for web client development

## Usage

Make sure node with version >= 17.6.0 is installed on your system. You can use nvm [https://github.com/nvm-sh/nvm#installing-and-updating](https://github.com/nvm-sh/nvm#installing-and-updating) for easily installing node version.

### Remote Installation

```
curl https://raw.githubusercontent.com/rethinc/vue-starter/main/install-remotly.sh | bash -s <product-name>
```

### Manual Installation
Checkout repository in project root and run from project root:

`<npm-version>` can be found in vue-starter/.nvmrc

```
nvm install <npm-version>
vue-starter/build-environment.sh <product-name>
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

Check code format issues
```
npm run lint
```

Automatically format code in whole project
```
npm run format
```

Run jest test runner in watch mode
```
npm run test
```

### Views

Add view examples component in `view-examples/examples/shared` and register it in `view-examples/examples.ts`

Run view examples app
```
npm run viewExamples
```
open browser at [http://localhost:3001](http://localhost:3001)

### SVG Icons

Place colorizable (color will be defined in css) icons in the `src/assets/icons/colorizable` and others in `src/assets/icons/regular`

After icon changes generate the icon provider file with the command:
```
npm run generateIcons
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

## Docker

run docker locally
```
docker build -t vue-starter .
docker run -dp 8080:80 --name vue-starter vue-starter
```

open browser at [http://localhost:8080](http://localhost:8080)