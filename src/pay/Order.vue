<template lang="html">
  <div class="card">
    <div class="card-header">
      这里是订单页
    </div>
    <div class="card-block">
      可以显示订单信息，所处位置也无所谓<br />
      <div class="input-group">
        <span class="input-group-addon">订单号</span>
        <input class="form-control" type="text" v-model="ryOrderId">
      </div>
      当前的用户环境为 <em><b>{{envCN}}</b></em><br />
      当前UserAgent为 <em><b>{{ua}}</b></em><br />
      <QR :text="qr" :size="200" color="blue" style="align:center" />
    </div>
    <div class="card-footer">
      <span>这个按钮的链接应该是</span><br />
      <button type="button" :class="clazz" @click="pay" :disabled="env === 'un'">{{envCN}} - 支付</button>
    </div>
  </div>
</template>

<script>
import Ali from './Ali'
import Wx from './Wx'
import QR from 'vue-qrcode-component'
import _ from 'lodash'
import {wxAppid, wxRedirect, aliAppid, aliRedirect} from './Cfg'

let MAP = {
  wx: {
    name: '微信',
    clazz: 'btn btn-success'
  },
  un: {
    name: '未知',
    clazz: 'btn btn-danger'
  },
  ali: {
    name: '支付宝',
    clazz: 'btn btn-info'
  }
}
export default {
  name: 'Order',
  data() {
    return {
      qr: aliRedirect,
      ua: navigator.userAgent,
      env: navigator.userAgent.toLowerCase().indexOf('micromessenger') > -1 ? 'wx' : (navigator.userAgent.toLowerCase().indexOf('alipayclient') > -1 ? 'ali' : 'un'),
      goodsName: '测试abc', // 携带的业务数据
      ryOrderId: '' + _.now() // 携带的业务数据
    }
  },
  computed: {
    envCN() {
      return MAP[this.env].name
    },
    clazz() {
      return MAP[this.env].clazz
    }
  },
  components: {
    QR
  },
  methods: {
    pay() {
      let state = new Buffer(JSON.stringify({
        goodsName: this.goodsName,
        ryOrderId: this.ryOrderId
      })).toString('base64')
      switch (this.env) {
        case 'wx':
          location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + wxAppid + '&redirect_uri=' + encodeURIComponent(wxRedirect) +
            '&response_type=code&scope=snsapi_base&state=' + state + '#wechat_redirect'
          break;
        case 'ali':
          location.href = 'https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=' + aliAppid + '&redirect_uri=' + encodeURIComponent(aliRedirect) + '&scope=auth_base&state=' + state
          break;
        default:
          console.log('can not pay.')
      }
    }
  }
}
</script>

<style lang="css">
</style>
