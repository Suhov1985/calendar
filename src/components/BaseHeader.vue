<template>
  <section class="header">
    <div class="container">
      <div class="is-flex">
        <div class="btns">
          <button class="primary">Add</button>
          <button class="primary">Update</button>
        </div>
        <div class="search">
          <div class="icon">
            <img src="../../public/img/search.png" alt="Icon">
          </div>
          <input type="text" v-model="searchText">
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "BaseHeader",
  props: {
  },
  data() {
    return {
      searchText: '',
    }
  },
  created () {
  },
  methods: {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.header
  padding: 3.125rem 0 1.25rem
  background: #f4f4f4
  box-shadow: 0px 10px 10px 2px rgba(34, 60, 80, 0.2)

.is-flex
  width: 100%
  justify-content: space-between

.search
  display: flex
  align-items: center
  .icon
    margin-right: 0.625rem
    img
      width: 20px

.btns
  button
    margin-right: 0.625rem

</style>
