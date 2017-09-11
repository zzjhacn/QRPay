<template lang="html">
<div class="card">
  <div class="card-header">
    {{title}}
  </div>
  <div class="card-block">
    <ObjViewer title="URL" :data="ul" v-if="ul" />
    <ObjViewer title="getParams" :data="getParams" v-if="getParams" />
    <ObjViewer title="userId" :data="userId"  v-if="userId"/>
    <ObjViewer title="userIdResp" :data="userIdResp"  v-if="userIdResp"/>
    <ObjViewer title="orderInfo" :data="orderInfo"  v-if="orderInfo"/>
    <ObjViewer title="orderInfoResp" :data="orderInfoResp"  v-if="orderInfoResp"/>
    <ObjViewer title="payResp" :data="payResp"  v-if="payResp"/>
  </div>
  <div class="card-footer">
    <button type="button" class="btn btn-success" @click="order">下单</button>
    <button type="button" class="btn btn-success" @click="doPay">支付</button>
  </div>
</div>
</template>

<script>
import URL from 'url'
import ObjViewer from '@/comps/ObjViewer'
import {orderUrl} from './Cfg'

export default {
  name: 'PayFrame',
  props: {
    title: String,
    codeName: {type: String, required: true},
    getUserIdData: {type: Object, required: true},
    getUserIdCallback: {type: Function, required: true},
    getUserIdFail: {type: Function, required: false},
    orderType: {type: String, required: true},
    orderSucc: {type: Function, required: true},
    orderFail: {type: Function, required: false},
    pay: {type: Function, required: true}
  },
  components: {
    ObjViewer
  },
  data() {
    return {
      ul: location.href,
      getParams: {
      },
      userId: '1',
      userIdResp: {},
      orderInfo: {},
      orderInfoResp: {},
      payResp: {}
    }
  },
  mounted() {
    let u = URL.parse(location.href, true)
    let state = new Buffer(u.query.state, 'base64').toString()
    let oinfo = JSON.parse(state)
    this.getParams = {
      goodsName: oinfo.goodsName,
      ryOrderId: oinfo.ryOrderId
    }
    let code = u.query[this.codeName]
    let fail = this.getUserIdFail || function(err) {
      console.log(err)
      alert("获取用户信息失败\n" + JSON.stringify(err))
    }
    if (code && code != '') {
      this.$http.post('/srv', _.extend(this.getUserIdData, {
        code: code
      })).then((res) => {
        try {
          this.userId = this.getUserIdCallback(res)
        } catch (e) {
          alert(JSON.stringify(e))
        }
        this.userIdResp = res
      }, (err) => {
        this.userIdResp = err
        fail(err)
      })
    }
  },
  methods: {
    order() {
      let fail = this.orderFail || function(err) {
        console.log(err)
        alert("下单失败\n" + JSON.stringify(err))
      }
      this.$http.post(cfg.orderUrl, {
        openid: this.userId,
        payType: this.orderType,
        goodsName: this.getParams.goodsName,
        ryOrderId: this.getParams.ryOrderId
      }).then((res) => {
        this.orderInfoResp = res
        this.orderInfo = this.orderSucc(res)
      }, (err) => {
        this.orderInfoResp = err
        fail(err)
      })
    },
    doPay(){
      this.pay(this.orderInfo, (res) => {
        alert(JSON.stringify(res))
        this.payResp = res
      })
    }
  }
}
</script>

<style lang="css">
</style>
