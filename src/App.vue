<template>
  <div id="app">
    <BaseHeader />
    <BaseCalendar />
    <BaseCard />
  </div>
</template>

<script>
import BaseHeader from "./components/BaseHeader"
import BaseCalendar from "./components/BaseCalendar"
import BaseCard from "./components/BaseCard"

export default {
  name: "App",
  components: {
    BaseCard,
    BaseHeader,
    BaseCalendar,
  },
}
</script>

<style lang="sass">
@import "src/assets/css/app"
</style>
