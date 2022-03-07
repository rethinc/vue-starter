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

Changes to the starter app can be done directly in die `./vue-application` folder. 
Added npm dependencies must also be added in the `createNewVueApplication` function inside `./build-environment.sh`