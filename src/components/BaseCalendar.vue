<template>
  <section class="сalendar-wrap">
    <div class="container">
      <div class="actions">
        <button @click="getPrevMonth">
          <span class="icon left"></span>
        </button>
        <b>{{monthNames[curMonth.day.getMonth()] + ' ' + curMonth.day.getFullYear()}}</b>
        <button @click="getNextMonth">
          <span class="icon right"></span>
        </button>
      </div>
      <div class="calendar">
        <div class="day-wrap" v-for="(day, index) in cells" :key="index" :class="{'today': isToday((day+1) - curMonth.dayNumFirst)}">
          <div class="day prevMonth" v-if="day < curMonth.dayNumFirst">
            <div class="dayName"><span>{{getDayName(day)}}</span> {{ (prevMonth.dayLast - prevMonth.dayNumLast) + day }}</div>
          </div>
          <div class="day"
               v-if="day >= curMonth.dayNumFirst && day < curMonth.dayLast + curMonth.dayNumFirst"
               :class="{'with-event': hasEvent[day - curMonth.dayNumFirst] !== null}"
               @click.stop="showEditeEvent(day - curMonth.dayNumFirst)"
          >
            <div class="dayName"><span>{{getDayName(day)}}</span> {{ (day + (curMonth.dayNumFirst > 0 ? 1 : 0)) - curMonth.dayNumFirst }}</div>
            <div class="event-info" v-if="hasEvent[day - curMonth.dayNumFirst] !== null">
              <div class="title" v-if="hasEvent[day - curMonth.dayNumFirst].name">{{hasEvent[day - curMonth.dayNumFirst].name}}</div>
              <div class="desc" v-if="hasEvent[day - curMonth.dayNumFirst].desc">{{hasEvent[day - curMonth.dayNumFirst].desc}}</div>
            </div>
            <template v-if="editeWindow === day - curMonth.dayNumFirst">
              <BaseCard
                :ref="'edit' + (day - curMonth.dayNumFirst)"
                :id="day - curMonth.dayNumFirst"
                :event="hasEvent[day - curMonth.dayNumFirst]"
                :active="editeWindow"
              />
            </template>
          </div>
          <div class="day nextMonth" v-if="day >= curMonth.dayLast + curMonth.dayNumFirst">
            <div class="dayName">{{ (day + 1) - (curMonth.dayLast + curMonth.dayNumFirst) }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import BaseCard from "./BaseCard"

export default {
  name: "BaseCalendar",
  components: {
    BaseCard,
  },
  data() {
    return {
      cells: 35,
      prevMonth: {
        dayLast: null,
        day: null,
        dayNumFirst: null,
        dayNumLast: null,
      },
      curMonth: {
        dayLast: null,
        day: null,
        dayNumFirst: null,
        dayNumLast: null,
      },
      nextMonth: {
        dayLast: null,
        day: null,
        dayNumFirst: null,
        dayNumLast: null,
      },
      monthNames: ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ],
    }
  },
  created () {
    // Get active month from localStorage
    const localMonthShift = localStorage.getItem('monthShift')

    // Set active month to Store
    if(localMonthShift){
      this.setMonthShift(+localMonthShift)
    }

    // Get events from localStorage
    const localEvents = JSON.parse(localStorage.getItem('events'))

    // Set events to Store
    if(localEvents && localEvents.length > 0){
      this.loadLocalEvent(localEvents)
    }

    this.createCalendar()
  },
  computed: {
    ...mapState('common', ['monthShift', 'events', 'activeYear', 'activeMonth', 'editeWindow']),
    // Get current event
    hasEvent() {
      let events = []

      for (let x = 0; x < this.curMonth.dayLast; x++) {
        let event = null
        if (this.events.length > 0) {
          for (let i = 0; i < this.events.length; i++) {
            let date = new Date(this.activeYear, this.activeMonth-1, (x + 1))
            const localDate = new Date(this.events[i].date)
            if (localDate.getTime() === new Date(date).getTime()) {
              event = this.events[i]
            }
          }
        }
        events.push(event)
      }

      return events
    },
  },
  methods: {
    ...mapMutations('common', ['setMonthShift', 'setActiveYear', 'setActiveMonth', 'loadLocalEvent', 'closeEditeWindow', 'setEditeWindow']),
    // Activated editeEvent Popup
    showEditeEvent(id) {
      if(this.editeWindow !== null) {
        this.closeEditeWindow(id)
      } else {
        this.setEditeWindow(id)
      }
    },
    // Change active month to prev Month
    getPrevMonth(day) {
      this.setMonthShift(this.monthShift -= 1)
      localStorage.setItem('monthShift', this.monthShift)
      this.createCalendar()
    },
    // Change active month to next Month
    getNextMonth(day) {
      this.setMonthShift(this.monthShift += 1)
      localStorage.setItem('monthShift', this.monthShift)
      this.createCalendar()
    },
    // Check if today
    isToday(day) {
      return day === new Date().getDate() && this.curMonth.day.getFullYear() === new Date().getFullYear() && this.curMonth.day.getMonth() === new Date().getMonth()
    },
    // Create Calendar
    createCalendar() {
      this.getMonth("curMonth", new Date().getFullYear(), new Date().getMonth() + this.monthShift)
      this.getMonth("prevMonth", new Date().getFullYear(), new Date().getMonth()-1 + this.monthShift)
      this.getMonth("nextMonth", new Date().getFullYear(), new Date().getMonth()+1 + this.monthShift)
    },
    // Get user-friendly name of date
    getDayName(day) {
      let name = ''

      switch (day){
        case 1:
          name = 'Monday,'
          break
        case 2:
          name = 'Tuesday,'
          break
        case 3:
          name = 'Wednesday,'
          break
        case 4:
          name = 'Thursday,'
          break
        case 5:
          name = 'Friday,'
          break
        case 6:
          name = 'Saturday,'
          break
        case 7:
          name = 'Sunday,'
          break
        default:
          break
      }

      return name
    },
    // Function init variables
    getMonth(id, year, month) {
      let monthObj = {}

      switch (id){
        case 'prevMonth':
          monthObj = this.prevMonth
          break
        case 'nextMonth':
          monthObj = this.nextMonth
          break
        default:
          monthObj = this.curMonth
          break
      }

      monthObj.dayLast = new Date(year,month+1,0).getDate()
      monthObj.day = new Date(year,month,monthObj.dayLast)
      monthObj.dayNumLast = new Date(monthObj.day.getFullYear(),monthObj.day.getMonth(),monthObj.dayLast).getDay()
      monthObj.dayNumFirst = new Date(monthObj.day.getFullYear(),monthObj.day.getMonth(),1).getDay()
      this.setActiveYear(monthObj.day.getFullYear())
      this.setActiveMonth(monthObj.day.getMonth())
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.сalendar-wrap
  padding: 1.25rem 0
  max-width: 100%
  overflow: visible
  b
    margin: 0 0.625rem
  .actions
    margin-bottom: 1rem
    display: flex
    align-items: center
    button
      background: transparent
      border: 1px solid #dfdfdf
      padding: 5px
      font-size: 0
    .icon
      display: inline-flex
      width: 5px
      height: 5px
      background: url("../../public/img/angle-right.svg") center no-repeat
      background-size: cover
      &.left
        transform: rotate(180deg)

.calendar
  display: grid
  grid-template-columns: repeat(7, minmax(9.375rem, 1fr))
  grid-gap: 0

  .day-wrap
    width: 100%
    height: 9.375rem
    display: inline-flex
    box-sizing: border-box
    position: relative

    .day
      display: flex
      width: 100%
      padding: 0.625rem
      border: 1px solid #ddd
      flex-direction: column
      cursor: pointer

      &:hover
        background: #e5f1f9
        border: 1px solid #8abfe9

      .event-info
        margin-top: 10px
        display: flex
        flex-direction: column
        .title
          font-size: 1rem
          font-weight: bold
          width: 6.25rem
          overflow: hidden
          text-overflow: ellipsis
          display: inline-block
          white-space: nowrap
        .desc
          font-size: 1rem
          font-weight: bold
          width: 6.25rem
          overflow: hidden
          text-overflow: ellipsis
          display: inline-block
          white-space: nowrap

      &.with-event
        background: #c2e4fe

    .prevMonth, .nextMonth
      opacity: .5
      cursor: default

    &.today
      background: #f4f4f4
      .dayName
        font-weight: bold

@media screen and (max-width: 768px)
  .calendar
    grid-template-columns: repeat(7, minmax(4.375rem, 1fr))
    .day-wrap
      width: 100%
      height: 4.375rem
      .day
        padding: 0.25rem
        box-sizing: border-box
        .event-info
          margin: 0
          .title
            width: 3.5rem
            overflow: hidden
            text-overflow: ellipsis
            display: inline-block
            white-space: nowrap
          .desc
            width: 3.5rem
            overflow: hidden
            text-overflow: ellipsis
            display: inline-block
            white-space: nowrap


        .dayName
          display: flex
          flex-direction: column
          span
            width: 3.5rem
            overflow: hidden
            text-overflow: ellipsis
            display: inline-block
            white-space: nowrap

@media screen and (max-width: 370px)
  .calendar
    grid-template-columns: repeat(7, minmax(3rem, 1fr))
    .day-wrap
      width: 100%
      height: 3rem
      .day
        padding: 0.125rem
        .event-info
          .title
            display: none
          .desc
            display: none

</style>
