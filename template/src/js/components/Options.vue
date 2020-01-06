<template lang="pug">
.{{name}}-options
  h1 {{camelize name}} Settings
</template>

<style lang="styl">
p
  margin: 1em
  min-width: 20em
  text-align: center
</style>

<script>
  export default {
    name: '{{camelize name}}Options',
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
