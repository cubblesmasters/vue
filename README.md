# The Vue boilerplate for Cubbles

This package contains a boilerplate to implement Cubbles components that interact with [Vue](https://vuejs.org/) components.

## Setup YOUR package on top of this boilerplate

### Step 1: GIT - Clone

```bash
$ git clone https://github.com/cubblesmasters/vue.git <your-package-name>
```

### Step 2: GIT - Change the origin

```bash
$ git remote rm origin
$ git remote add origin git@github.com:<your-git>/<your-package-name>.git
$ git config master.remote origin
$ git config master.merge refs/heads/master
```

### Step 3: NPM - Init the package for your purposes

```bash
$ npm init
...
```

Now it's yours ... have fun ;-).

## Cubbles and Vue interaction

This boilerplate is ready to support Vue components. Since we employ [webpack](https://webpack.js.org/) and [vue-loader](https://vue-loader.vuejs.org/) to bundle scripts, you can develop Vue components in different files and then import them within the Cubbles component that you are developing. The build task will compile the code to be ready for browser use.

### Creating your Vue components

You should implement the Vue components that you need in the `src` folder. Create the *.vue* files that you require for your view components. A vue file would look similar to the one below:

```html
<template>
<!-- Root element (e.g. a div or an input) for the Vue component -->
</template>

<script>
export default {
    name: '...',
    props: {},
    data() { return ... },
    methods: { ... }
};
</script>
```

### Using your Vue components within an elementary Cubbles component

You should import the desired components and the needed Vue libraries in the script of your Cubbles component. Then, you can attach your Vue component when you need it (e.g. when the cubbles component is ready or after a slot value changes):

```javascript
import './element.sss';
import VueComponent from './VueComponent.vue';
import Vue from 'vue';

(function () {
  'use strict';
  // Call CubxPolymer Factory Method for registering /* @echo elementName */ Cubbles Component
  CubxComponent({
    is: '/* @echo elementName */',

    /**
     * Manipulate an element’s local DOM when the cubbles framework is initialized and ready to work.
     */
    contextReady: function () {
      this.ready = true;
      this.attachVueComponent();
    },

    attachVueComponent: function () {
      let VueComponentClass = Vue.extend(VueComponent);
      this.vueComponent = new VueComponentClass();
      this.vueComponent.$mount();
      this.vueComponent.onChangeCallback = (numberFromVue) => { this.updateNumberInput(numberFromVue) };
      this.$$('#vueComponent').appendChild(this.vueComponent.$el);
    }
  });
}());
```

#### Interaction via data props

A way to interact with your Vue component is through its `data`, for instance, after a slot value changes:

#########

```javascript
import MyReactComponent from './path-to-react-element'; // import the react component
import React from 'react';
import ReactDOM from 'react-dom';

(function () {
  'use strict';

  // Call CubxPolymer Factory Method for registiering /* @echo elementName */ Cubbles Component
  CubxComponent({
    is: '/* @echo elementName */',
    //...

    /**
     * Manipulate an element’s local DOM when the cubbles framework is initialized and ready to work.
     */
    contextReady: function () {
      this.ready = true;
      this._renderReactComponent();
    },

    /**
     *  Observe the Cubbles-Component-Model: If value for slot 'SlotId' has changed ...
     */
    modelSlotIdChanged: function (newValue) {
      if (this.ready) {
        this._renderReactComponent();
      }
    },

    _renderReactComponent: function () {
      // Render the react component
      ReactDOM.render(
        <MyReactComponent myPropValue={this.model.slotId}/>,
        this.querySelector('#reactRoot')
      );
    }
  });
}());
```

#### Accessing your React component's methods

To be able to access the methods of your React component, you need a way to refer to it. To aim that, you can add a `ref` callback and set a property of your Cubbles components. This property will be a reference to your React component, you can run any method, for instance, after a slot value changes:

```javascript
import MyReactComponent from './path-to-react-element'; // import the react component
import React from 'react';
import ReactDOM from 'react-dom';

(function () {
  'use strict';

  // Call CubxPolymer Factory Method for registiering /* @echo elementName */ Cubbles Component
  CubxComponent({
    is: '/* @echo elementName */',
    //...

    /**
     * Manipulate an element’s local DOM when the cubbles framework is initialized and ready to work.
     */
    contextReady: function () {
      this.ready = true;
      this._renderReactComponent();
    },

    /**
     *  Observe the Cubbles-Component-Model: If value for slot 'SlotId' has changed ...
     */
    modelSlotIdChanged: function (newValue) {
      if (this.ready) {
        this.myReactComponent.aMethodFromReactComponent();
      }
    },

    _renderReactComponent: function () {
      // Render the react component
      ReactDOM.render(
        <MyReactComponent ref={(reactComponentRef) => {this.myReactComponent = reactComponentRef}}/>,
        this.querySelector('#reactRoot')
      );
    }
  });
}());
```

### Accessing a Cubbles component from a React component

A way to access an elementary Cubbles component from a React component is by passing a reference to a method (e.g. the setter of a slot value) using a `myPropMethod`. In the React component you just need to call it; i.e. `this.props.myPropMethod()`:

```javascript
import MyReactComponent from './path-to-react-element'; // import the react component
import React from 'react';
import ReactDOM from 'react-dom';

(function () {
  'use strict';

  // Call CubxPolymer Factory Method for registiering /* @echo elementName */ Cubbles Component
  CubxComponent({
    is: '/* @echo elementName */',
    //...

    /**
     * Manipulate an element’s local DOM when the cubbles framework is initialized and ready to work.
     */
    contextReady: function () {
      this.ready = true;
      this._renderReactComponent();
    },

    _renderReactComponent: function () {
      // Render the react component
      ReactDOM.render(
        <MyReactComponent myPropMethod={this.setSlotId.bind(this)}/>,
        this.querySelector('#reactRoot')
      );
    }
  });
}());
```

### The boilerplate base sample

If you check the `src` folder of this boilerplate, you will find a folder called `elementary` folder that contains two scripts:

* **react-element.js**: contains the implementation of the React component that interacts with the Cubbles component.
* **element.js**: contains the logic of a Cubbles elementary that interacts with a React component. As you see, the React component and libraries are imported in the first lines of this file.

This sample implements a bidirectional interaction between a Cubbles component and a React component following the guidelines presented above. A demo of this component is available [online](https://cubbles.world/sandbox/cubbles-react-js-boilerplate@1.0.0-SNAPSHOT/cubbles-react-js-boilerplate-elementary/SHOWROOM.html).

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
