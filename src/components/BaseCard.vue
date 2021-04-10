<template>
  <div class="card">
    Card
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    event: {
      type: Object,
      default: () => {},
    },
  },
  created () {
    this.getEvent()
  },
  methods: {
    getEvent() {
      console.log ('event')
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">

</style>
