<template>
  <div id="app" @click="closeEditeWindow">
    <BaseHeader />
    <BaseCalendar  />
  </div>
</template>

<script>
import BaseHeader from "./components/BaseHeader"
import BaseCalendar from "./components/BaseCalendar"
import {mapMutations} from "vuex"

export default {
  name: "App",
  components: {
    BaseHeader,
    BaseCalendar,
  },
  methods: {
    ...mapMutations('common', ['closeEditeWindow']),
  },
}
</script>

<style lang="sass">
@import "src/assets/css/app"
</style>
