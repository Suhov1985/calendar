<template>
  <div id="app">
    <img alt="Vue logo" src="src/assets/img/logo.png" />
    <Card />
  </div>
</template>

<script>
import Card from "./components/card"

export default {
  name: "App",
  components: {
    Card,
  },
}
</script>

<style lang="sass">
@import "src/assets/css/app"
</style>
