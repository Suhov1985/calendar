export default {
  namespaced: true,
  state: () => ({
    monthShift: 0,
    event: null,
  }),
  mutations: {
    setMonthShift (state, shift) {
      state.monthShift = shift
    },
  },
  actions: {}
}
