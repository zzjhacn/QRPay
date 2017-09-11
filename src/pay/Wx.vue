<template lang="html">
  <PF title="微信宝支付" code-name="code" :get-user-id-data="getUserIdData" :getUserIdCallback="getUserIdCallback" order-type="1202" :order-succ="orderSucc" :pay="pay"/>
</template>

<script>
import PF from './PayFrame'
export default {
  // extends: PF,
  name: 'Wx',
  components: {
    PF
  },
  computed: {
    getUserIdData() {
      return {
        url: 'getOpenId',
        m: 'getOpenId',
      }
    }
  },
  methods: {
    getUserIdCallback(res) {
      if (res.body) {
        return res.body.openid
      }
    },
    orderSucc(res) {
      let q = res.body
      return {
        appId: q.sdk_appid, //公众号名称，由商户传入
        timeStamp: q.sdk_timestamp, //时间戳，自1970年以来的秒数
        nonceStr: q.sdk_noncestr, //随机串
        package: q.sdk_package,
        signType: q.sdk_signtype, //微信签名方式：
        paySign: q.sdk_paysign //微信签名
      }
    },
    pay(req, cb) {
      let onBridgeReady = function() {
        console.log(req)
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', req,
          function(res) {
            console.log(res)
            cb(res)
            if (res.err_msg == "get_brand_wcpay_request:ok") {} // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
          }
        )
      }
      if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
          document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
          document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
        }
      } else {
        onBridgeReady()
      }
    }
  }
}
</script>

<style lang="css">
</style>
