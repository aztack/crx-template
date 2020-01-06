<template lang="pug">
.cc-devtool-options
  h1 {{camelize name}} Devtool Settings
</template>

<style lang="styl">
p
  margin: 1em
  min-width: 20em
  text-align: center
</style>

<script>
  export default {
    name: '{{camelize name}}DevtollOptions',
    components: {},
    data () {
      return {
      }
    },
    mounted () {

    },
    methods: {
    }
  }
</script>
