export default {
  namespaced: true,
  state: () => ({
    monthShift: 0,
    events: [],
    activeYear: null,
    activeMonth: null,
    editeWindow: null,
    searchWindow: null,
  }),
  mutations: {
    setMonthShift (state, shift) {
      state.monthShift = shift
    },
    addEvent (state, event) {
      state.events.push(event)
      localStorage.setItem('events', JSON.stringify(state.events))
    },
    loadLocalEvent (state, events) {
      state.events = events
    },
    setActiveYear (state, year) {
      state.activeYear = year
    },
    setActiveMonth (state, month) {
      state.activeMonth = month
    },
    setEditeWindow (state, data) {
      state.editeWindow = data
    },
  },
  actions: {
    closeEditWindow ({ state }, id) {
      if(state.editeWindow !== null) {
        state.editeWindow = id ? id : null
      }
    },
    toggleSearchWindow ({ state }, data) {
      state.searchWindow = data
    },
  }
}
