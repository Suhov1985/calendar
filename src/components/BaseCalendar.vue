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
        <div class="day" v-for="(day, index) in cells" :key="index" :class="{'today': isToday((day+1) - curMonth.dayNumFirst)}">
          <template v-if="day < curMonth.dayNumFirst">
            {{getDayName(day)}} {{ (prevMonth.dayLast - prevMonth.dayNumLast) + day }}
          </template>
          <template v-if="day >= curMonth.dayNumFirst && day < curMonth.dayLast + curMonth.dayNumFirst">
            {{getDayName(day)}} {{ (day + (curMonth.dayNumFirst > 0 ? 1 : 0)) - curMonth.dayNumFirst }}
          </template>
          <template v-if="day >= curMonth.dayLast + curMonth.dayNumFirst">
            Last{{ (day + 1) - (curMonth.dayLast + curMonth.dayNumFirst) }}
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: "BaseCalendar",
  props: {
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
    let localMonthShift = localStorage.getItem('monthShift')
    if(localMonthShift){
      this.setMonthShift(+localMonthShift)
    }

    this.createCalendar()
  },
  computed: {
    ...mapState('common', ['monthShift']),
  },
  methods: {
    ...mapMutations('common', ['setMonthShift']),
    getPrevMonth(day) {
      this.setMonthShift(this.monthShift -= 1)
      localStorage.setItem('monthShift', this.monthShift)
      this.createCalendar()
    },
    getNextMonth(day) {
      this.setMonthShift(this.monthShift += 1)
      localStorage.setItem('monthShift', this.monthShift)
      this.createCalendar()
    },
    isToday(day) {
      return day === new Date().getDate() && this.curMonth.day.getFullYear() === new Date().getFullYear() && this.curMonth.day.getMonth() === new Date().getMonth()
    },
    createCalendar() {
      this.getMonth("curMonth", new Date().getFullYear(), new Date().getMonth() + this.monthShift)
      this.getMonth("prevMonth", new Date().getFullYear(), new Date().getMonth()-1 + this.monthShift)
      this.getMonth("nextMonth", new Date().getFullYear(), new Date().getMonth()+1 + this.monthShift)
    },
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
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.сalendar-wrap
  padding: 1.25rem 0
  b
    margin: 0 0.625rem
  .actions
    margin-bottom: 1rem
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

  .day
    width: 100%
    height: 9.375rem
    border: 1px solid #ddd
    display: inline-flex
    padding: 0.625rem
    box-sizing: border-box
    &.today
      background: #f4f4f4

</style>
