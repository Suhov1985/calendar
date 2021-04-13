<template>
  <div id="card" :ref="'card' + id" :class="'card' + ' ' + customClass" v-if="active !== null" v-click-outside="closePopup">
    <div class="title" v-if="event && event.name">{{event.name}}</div>
    <input type="text" v-model="eventName" placeholder="Event Title" v-if="!event || (event && !event.name)">
    <div class="date" v-if="event && event.date">{{getUserDate(event.date)}}</div>
    <input type="text" disabled readonly v-model="eventDate" placeholder="Event Date" v-if="!event || (event && !event.date)">
    <div class="names" v-if="event && event.names">
      <div class="participants">Participants:</div>
      {{event.names}}
    </div>
    <input type="text" v-model="eventNames" placeholder="Event Names" v-if="!event || (event && !event.names)">
    <textarea name="desc" v-model="eventDesc" placeholder="Event Description"></textarea>
    <div class="actions is-flex">
      <button @click.stop="createEvent">Save</button>
      <button @click.stop="deleteEvent">Delete</button>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapActions, mapState} from "vuex"

import clickOutside from '../common/directive'

export default {
  name: "Card",
  props: {
    event: {
      type: Object,
      default: () => {},
    },
    id: {
      type: Number,
      default: 0,
    },
    active: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      eventName: '',
      eventDate: '',
      eventNames: '',
      eventDesc: '',
      customClass: '',
      curDate: null,
      monthNames: ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ],
    }
  },
  mounted () {
    // Set description
    this.eventDesc = this.event !== null && this.event.desc ? this.event.desc : ''
    // Set date
    this.curDate = new Date(this.activeYear, this.activeMonth - 1, +this.id + 1)
    this.eventDate = (this.curDate.getDate() + ' ' + this.monthNames[this.curDate.getMonth()] + ' ' + this.curDate.getFullYear()).toString()

    // Chech position popup
    const cardPositions = this.$refs['card' + this.id].getBoundingClientRect()

    if(+cardPositions.left + +cardPositions.width > window.innerWidth) {
      this.customClass = 'left'
    }
  },
  computed: {
    ...mapState('common', ['activeYear', 'activeMonth', 'events']),
  },
  methods: {
    ...mapMutations('common', ['addEvent', 'loadLocalEvent']),
    ...mapActions('common', ['closeEditWindow']),
    // Create new event or update
    createEvent() {
      const event = {
        name: this.eventName ? this.eventName : '',
        date: this.curDate ? this.curDate : '',
        names: this.eventNames,
        desc: this.eventDesc,
      }
      const localEvents = this.events.concat()
      const eventIndex = this.findEventIndex()

      if(this.event !== null) {
        localEvents.splice(eventIndex, 1, )
      }

      localEvents.push(event)
      this.loadLocalEvent(localEvents)
      localStorage.setItem('events', JSON.stringify(localEvents))
      this.closeEditWindow()
    },
    // Find cur event
    findEventIndex() {
      const localEvents = this.events.concat()
      let eventIndex = null

      for (let i = 0; i < localEvents.length; i++) {
        const localDate = new Date(localEvents[i].date)

        if (localDate.getTime() === this.curDate.getTime()) {
          eventIndex = i
        }
      }

      return eventIndex
    },
    // Delete event from store and localStorage
    deleteEvent() {
      const localEvents = this.events.concat()
      const eventIndex = this.findEventIndex()

      localEvents.splice(eventIndex, 1, )
      this.loadLocalEvent(localEvents)
      localStorage.setItem('events', JSON.stringify(localEvents))
      this.closeEditWindow()
    },
    // Get user-friendly name of date
    getUserDate(date) {
      return new Date(date).getDate() + ' ' + this.monthNames[new Date(date).getMonth()]
    },
    closePopup() {
      this.closeEditWindow()
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.card
  width: 18.75rem
  padding: 1.5rem
  background: #fff
  box-shadow: 0px 10px 10px 2px rgba(34, 60, 80, 0.2)
  margin-left: 1.25rem
  position: absolute
  top: -1rem
  left: 100%
  z-index: 2
  border: 1px solid #d2d2d2
  cursor: default

  &:after
    content: ''
    width: 0
    height: 0
    border-style: solid
    border-width: 0.9375rem 1.25rem 0.9375rem 0
    border-color: transparent #fff transparent transparent
    position: absolute
    left: -0.9375rem
    top: 0.9375rem


  .close
    position: absolute
    top: 0.3125rem
    right: 0.3125rem
    cursor: pointer
    width: 0.625rem
    height: 0.625rem
    background: url("../../public/img/close.svg") center no-repeat
    background-size: cover
    z-index: 2

  &.left
    left: auto
    right: 100%
    margin-left: 0
    margin-right: 1.25rem
    &:after
      left: auto
      right: -0.9375rem
      transform: rotate(180deg)

  &.show
    display: flex

  .title
    font-size: 1.25rem
    font-weight: bold
    margin-bottom: 1.25rem
    cursor: default

  .date, names
    font-size: 0.875rem
    margin-bottom: 10px
    cursor: default

  .participants
    color: #666666
    margin-bottom: 5px

  textarea
    margin: 2.5rem 0 1.25rem
    height: 6.875rem
    resize: none

  input
    margin-bottom: 0.625rem

  input, textarea
    width: 100%

  button
    padding: 0.125rem 0.3125rem
    font-size: 0.75rem
    color: #000
    display: inline-block

    &:first-child
      margin-right: .5rem

@media screen and (max-width: 768px)
  .card, .card.left
    width: 18.75rem
    padding: 1.5rem
    background: #fff
    position: fixed
    top: 50%
    left: 50%
    right: 0
    margin: 10px 0 0 0
    transform: translate(-50%, -50%)
    &:after
      display: none

</style>
