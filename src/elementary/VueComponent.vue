<template>
<div>
    <label for="slotNumberVue">Slot 'number'</label>
    <input type="range" id="slotNumberVue" v-model="number" v-on:change="numberChanged">
</div>
</template>

<script>
export default {
    name: 'VueCompoent',
    props: {
        onChangeCallback: Function
    },
    data() {
       return {
           number: 0
       }
    },
    methods: {
        numberChanged() {
            this.onChangeCallback(this.number);
        }
    }
};
</script>