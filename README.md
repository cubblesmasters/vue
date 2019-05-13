# @cubbles/typescript-boilerplate

This package contains a boilerplate to implement Cubbles components using [typescript](https://www.typescriptlang.org/). This package is build under the [webpack](https://webpack.js.org/) approach and uses [ts-loader](https://webpack.js.org/guides/typescript/) to compile the typescript code.

## Setup YOUR package on top of this template

### Step 1: GIT - Clone

```bash
git clone https://github.com/cubblesmasters/typescript.git <your-package-name>
```

### Step 2: GIT - Change the origin

```bash
git remote rm origin
git remote add origin git@github.com:<your-git>/<your-package-name>.git
git config master.remote origin
git config master.merge refs/heads/master
```

### Step 3: NPM - Init the package for your purposes

```bash
npm init
...
```

## The boilerplate base sample

If you check the `src` folder of this boilerplate, you will find a folder called `elementary` that contains the following files:

* **Manifest.elementary**: contains the definition of your elementary (Check [this](https://cubbles.gitbook.io/docs/terms-and-concepts/artifacts) for more information).
* **element.ts**: contains the logic of a Cubbles elementary coded using typescript.
* **element.html**: contains the view of the elementary.
* **element.sss**: contains the style definition of the elementary.
* **SHOWROOM.html**: a ready-to-run sample using the elementary.
* **cubx-component-defs.ts**: contains the interface definition for the object that you should pass to the [CubxComponent](https://cubbles.gitbook.io/docs/runtime-extension-rte/user-guide/cubbles-js-api/inside-interaction#the-cubxcomponent-object) object.
* **custom-d-ts**: declares a module to be able to import *.sss* style sheets in our typescript scripts.
* **toUpperCase.ts**: contains a function to convert string to upperCase. This script is just for demonstration purposes. So that you know how to use external functions, modules, interfaces, etc., in the logic of your elementary.

A demo of this component is available [online](https://cubbles.world/sandbox/cubbles-typescript-boilerplate@1.0.0-SNAPSHOT/cubbles-typescript-boilerplate-elementary/SHOWROOM.html).

## Considerations regarding the element.ts script

In the **element.ts** file the **CubxComponent** is declared as function, you should not remove that line to avoid TypeScript compilation errors. Also, we import the **CubxComponentPrototype** to assure that the object passed to the **CubxComponent** is as expected:

```typescript
import { CubxComponentPrototype } from "./cubx-component-defs";
// Declare the CubxComponent to make it available
declare function CubxComponent(prototype: CubxComponentPrototype): void;
```

Therefore, you should respect the **CubxComponentPrototype** interface. To aim that you can use the *as CubxComponentPrototype* expression when passing the object parameter to **CubxComponent**. This would allow you to respect the interface, but also to extend it according to your needs:

```typescript
// ...

// Define the component respecting the CubxComponentPrototype interface
CubxComponent({
  is: ...
} as CubxComponentPrototype)
```

## Development scripts

This boilerplate includes a set of scripts to build, locally deploy, validate and upload your webpackages using npm as follows:

```bash
npm run [script-name]
```

Also, you can install [ntl](https://www.npmjs.com/package/ntl) globally and then run it to access the scripts as shown below:

```bash
$ ntl
✔  Npm Task List - v3.0.0
? Select a task to run: (Use arrow keys)
❯ build
  build:watch
  build:prod
  clean
  upload
  upload:prod
  validate-manifest
(Move up and down to reveal more choices)
```

> For more information about available scripts check [this](https://cubbles.gitbook.io/docs/v/coder-template-doc/developing-vanilla-boilerplate/available-scripts).