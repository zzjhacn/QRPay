<template lang="html">
  <component :is="page"></component>
</template>

<script>
import URL from 'url'

import Order from './Order'
import Ali from './Ali'
import Wx from './Wx'

export default {
  name: 'Frame',
  components: {
    Order,
    Ali,
    Wx
  },
  computed: {
    page() {
      let u = URL.parse(location.href, true)
      if(u.query && u.query.code){
        return Wx
      }
      if(u.query && u.query.auth_code){
        return Ali
      }
      return Order
    }
  }
}
</script>

<style lang="css">
span{
  overflow-x: auto;
  word-wrap: break-word;
}
</style>
