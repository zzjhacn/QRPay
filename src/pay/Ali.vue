<template lang="html">
<PF title="支付宝支付" code-name="auth_code" :get-user-id-data="getUserIdData" :getUserIdCallback="getUserIdCallback" order-type="1302" :order-succ="orderSucc" :pay="pay"/>
</template>

<script>
import PF from './PayFrame'
export default {
  // extends: PF,
  name: 'Ali',
  components: {
    PF
  },
  computed: {
    getUserIdData() {
      return {
        url: 'getUserId',
        m: 'getUserId',
      }
    }
  },
  methods: {
    getUserIdCallback(res) {
      if (res.body.alipay_system_oauth_token_response) {
        return res.body.alipay_system_oauth_token_response.user_id
      }
    },
    orderSucc(res) {
      return {txnId: res.body.reser_tran_id}
    },
    pay(req, cb) {
      function ready(callback) {
        // 如果jsbridge已经注入则直接调用
        if (window.AlipayJSBridge) {
          callback && callback();
        } else {
          // 如果没有注入则监听注入的事件
          document.addEventListener('AlipayJSBridgeReady', callback, false);
        }
      }
      ready(function() {
        try {
          AlipayJSBridge.call("tradePay", {
            tradeNO: req.txnId
          }, function(result) {
            cb(result);
          });
        } catch (e) {
          alert(e)
        }
      });
    }
  }
}
</script>

<style lang="css">
</style>
