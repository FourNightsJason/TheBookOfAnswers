import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Helpers from 'muse-ui/lib/Helpers'

Vue.config.productionTip = false;
Vue.use(Helpers)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
