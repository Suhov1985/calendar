import Vue from "vue"
import App from "./App.vue"
import store from "./store"

Vue.config.productionTip = false

// eslint-disable-next-line vue/require-name-property
new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app")
