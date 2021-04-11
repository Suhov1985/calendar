<template>
  <div class="fastAddEvent" v-if="active">
    <div class="close" @click="close"></div>
    <div class="input-wrap">
      <input type="text" v-model="eventInfo" placeholder="11 April, 14-00, Happy Birthday">
    </div>
    <button @click="createEvent">Create</button>
    <div class="error" v-if="error">Error format ({{error}}) look placeholder in input</div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: "FastAddEvent",
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      eventInfo: '',
      error: false,
    }
  },
  created () {
  },
  computed: {
    ...mapState('common', ['activeYear']),
  },
  methods: {
    ...mapMutations('common', ['addEvent']),
    //Функция добавления события в календарь с валиадцией. Дату можно вводить с указанием года или без.
    //Без указанного года будет подставлятся год текущего активного Месяца в календаре. Название месяца обязательно на англ.
    //Если Дата указана неверно то выводится ошибка с описанием.
    //Строка может содержать Дату (обязательно), время (необязательно), Название (необязательно)
    createEvent() {
      const str = this.eventInfo.split(',')
      const dateData = String(str[0]).split(' ')
      let eventDate = null
      let event = {}

      if(dateData[2] === undefined) {
        eventDate = new Date(str[0] + ' ' + this.activeYear)
      } else {
        eventDate = new Date(str[0])
      }

      if (eventDate.toString() === 'Invalid Date') {
        this.error = eventDate

        return false
      } else {
        this.error = false
      }

      if(str.length > 0){
        if(str[1] === undefined) {
          event = {
            date: eventDate.toString(),
            name: '',
            time: '',
            names: '',
            desc: '',
          }
        } else if(str[2] === undefined) {
          event = {
            date: eventDate.toString(),
            name: String(str[1]).trim (),
            time: '',
            names: '',
            desc: '',
          }
        } else {
          event = {
            date: eventDate.toString(),
            time: String (str[1]).trim (),
            name: String (str[2]).trim (),
            names: '',
            desc: '',
          }
        }
      }

      this.addEvent(event)
      this.eventInfo = ''
      this.close()
    },
    // Close popup
    close() {
      this.$emit('isShow', false)
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.fastAddEvent
  padding: 1.5625rem 1.25rem
  background: #fff
  box-shadow: 0px 10px 10px 2px rgba(34, 60, 80, 0.2)
  margin-top: 1.25rem
  position: absolute
  z-index: 2
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

  .error
    font-size: 0.75rem
    margin-top: 0.5rem
    color: red

  input
    width: 15rem
    margin-bottom: 0.625rem

  button
    padding: 0.125rem 0.3125rem
    font-size: 0.75rem
    color: #000
    display: inline-block

  .close
    position: absolute
    top: 0.3125rem
    right: 0.3125rem
    cursor: pointer
    width: 0.625rem
    height: 0.625rem
    background: url("../../public/img/close.svg") center no-repeat
    background-size: cover

</style>
