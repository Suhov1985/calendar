import Vue from "vue"
import Vuex from "vuex"
import commonData from "./common"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    curMonth: null,
    daysInCurMonth: null,
  },
  mutations: {},
  actions: {},
  modules: {
    commonData
  },
})
