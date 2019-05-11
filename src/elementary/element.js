import './element.sss';
import VueComponent from './VueComponent.vue';
import Vue from 'vue';

(function () {
  'use strict';
  // Call CubxPolymer Factory Method for registering /* @echo elementName */ Cubbles Component
  CubxComponent({
    is: '/* @echo elementName */',

    /**
     * Manipulate an element’s local DOM when the element is created. {{artifactId}}
     */
    created: function () {
    },

    /**
     * Manipulate an element’s local DOM when the element is created and initialized.
     */
    ready: function () {
      this.numberInput = this.querySelector('#slotNumber');
      this.numberInput.addEventListener('change', function(event) {
        this.setNumber(event.target.value);
      }.bind(this));
    },

    /**
     * Manipulate an element’s local DOM when the element is attached to the document.
     */
    connected: function () {
    },

    /**
     * Manipulate an element’s local DOM when the element is dettached to the document.
     */
    disconnected: function () {
    },

    /**
     * Manipulate an element’s local DOM when the cubbles framework is initialized and ready to work.
     */
    contextReady: function () {
      this.ready = true;
      this.attachVueComponent();
      this.updateNumberInput(0);
    },

    /**
     *  Observe the Cubbles-Component-Model: If value for slot 'number' has changed ...
     */
    modelNumberChanged: function (newValue) {
      if (this.ready) {
        this.vueComponent.number = newValue;
      }
    },

    updateNumberInput: function (number) {
      if (this.ready) {
        this.numberInput.value = number;
        // Set the new slot value using the model object to avoid an infinite loop calling setNumer()
        this.model.number = number;
        // Propagate the value, so that it is available when this slot is connected to another slot (in a compound component)
        this.repropagateNumber();
      }
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
