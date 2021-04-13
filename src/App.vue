<template>
  <div id="app">
    <BaseHeader />
    <BaseCalendar  />
  </div>
</template>

<script>
import BaseHeader from "./components/BaseHeader"
import BaseCalendar from "./components/BaseCalendar"

export default {
  name: "App",
  components: {
    BaseHeader,
    BaseCalendar,
  },

}
</script>

<style lang="sass">
@import "src/assets/css/app"
</style>
