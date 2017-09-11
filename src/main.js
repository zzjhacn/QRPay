import Vue from 'vue'
import Frame from './pay/Frame'

import 'babel-polyfill'
import resource from 'vue-resource'
Vue.use(resource)

new Vue({
  el: '#app',
  template: '<Frame/>',
  components: { Frame }
})
