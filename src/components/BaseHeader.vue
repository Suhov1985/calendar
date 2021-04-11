<template>
  <section class="header">
    <div class="container">
      <div class="is-flex">
        <div class="btns">
          <button class="primary" @click="showFastAddEvent = !showFastAddEvent">Add</button>
          <button class="primary" @click="update">Update</button>
          <FastAddEvent :active="showFastAddEvent" @isShow="isShowFastAddEvent"/>
        </div>
        <div class="search">
          <div class="icon">
            <img src="../../public/img/search.png" alt="Icon">
          </div>
          <input type="text" v-model="searchText">
          <div class="search-list" v-if="showFindList">
            <div class="search-item" v-for="(event, index) in findList" :key="index" @click="searchText = ''">
              <div class="search-title">{{event.name}}</div>
              <div class="search-date" v-if="event.date">{{getUserDate(event.date)}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import FastAddEvent from "./FastAddEvent"
import {mapState} from "vuex"
export default {
  name: "BaseHeader",
  props: {
  },
  components: {
    FastAddEvent,
  },
  data() {
    return {
      searchText: '',
      showFastAddEvent: false,
      showFindList: false,
      monthNames: ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ],
    }
  },
  created () {
  },
  computed: {
    ...mapState('common', ['events']),
    // Filter find events
    findList() {
      let events = this.searchText ? this.events.concat() : []
      return events.filter(el => el.name.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1)
    }
  },
  watch: {
    // Watching var and show or hide list with results
    'findList'(val) {
      this.showFindList = val.length > 0
    }
  },
  methods: {
    // Delete events and active calendar from vuex and store
    update() {
      localStorage.removeItem('events')
      localStorage.removeItem('monthShift')
      window.location = '/'
    },
    // Get user-friendly name of date
    getUserDate(date) {
      return new Date(date).getDate() + ' ' + this.monthNames[new Date(date).getMonth()]
    },
    isShowFastAddEvent(e) {
      this.showFastAddEvent = e
    }
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
  position: relative
  .icon
    margin-right: 0.625rem
    img
      width: 20px

  &-list
    position: absolute
    top: 100%
    left: 2.25rem
    right: 0
    z-index: 2
    padding: 0.3125rem
    background: #fff
    box-shadow: 0px 10px 10px 2px rgba(34, 60, 80, 0.2)
    margin-top: 1.25rem
    &:after
      content: ''
      width: 0
      height: 0
      border-style: solid
      border-width: 0 15px 20px 15px
      border-color: transparent transparent #fff transparent
      position: absolute
      top: -15px
      left: 0.9375rem
      z-index: -1

  &-title
    font-weight: bold

  &-date
    color: #747474
    margin-top: 0.3125rem

  &-item
    padding: 0.3125rem 0.625rem
    color: #262626
    cursor: pointer
    font-size: 1rem
    &:hover
      background: #27a1ff
      color: #fff
      .search-date
        color: #fff

.btns
  button
    margin-right: 0.625rem


@media screen and (max-width: 370px)
  .search
    input
      max-width: 100px

</style>
