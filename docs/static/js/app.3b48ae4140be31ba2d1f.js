webpackJsonp([1],{137:function(e,t,r){function n(e){r(371)}var a=r(42)(r(147),r(387),n,null,null);e.exports=a.exports},138:function(e,t,r){function n(e){r(373)}var a=r(42)(r(150),r(389),n,null,null);e.exports=a.exports},139:function(e,t,r){function n(e){r(374)}var a=r(42)(r(151),r(391),n,null,null);e.exports=a.exports},141:function(e,t,r){function n(e){r(370)}var a=r(42)(r(148),r(386),n,null,null);e.exports=a.exports},144:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(143),a=r(141),i=r.n(a),o=r(140),s=(r.n(o),r(142));n.a.use(s.a),new n.a({el:"#app",template:"<Frame/>",components:{Frame:i.a}})},145:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(377),a=r.n(n);t.default={props:{text:{type:String,required:!0},size:{type:Number,required:!1,default:256},color:{type:String,required:!1,default:"#000"},bgColor:{type:String,required:!1,default:"#FFF"},errorLevel:{type:String,validator:function(e){return"L"===e||"M"===e||"Q"===e||"H"===e},required:!1,default:"H"}},watch:{text:function(){this.clear(),this.makeCode(this.text)}},data:function(){return{qrCode:{}}},mounted:function(){this.qrCode=new a.a(this.$el,{text:this.text,width:this.size,height:this.size,colorDark:this.color,colorLight:this.bgColor,correctLevel:a.a.CorrectLevel[this.errorLevel]})},methods:{clear:function(){this.qrCode.clear()},makeCode:function(e){this.qrCode.makeCode(e)}}}},146:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(154),a=r.n(n),i=r(135),o=r.n(i);t.default=a()({name:"ObjViewer",props:{title:String,data:[Object,Array]},computed:{rData:function(){if(o.a.isString(this.data))try{return JSON.parse(this.data)}catch(e){return this.data}return this.data}}},"computed",{isArray:function(){return o.a.isArrayLikeObject(this.rData)},isObj:function(){return o.a.isPlainObject(this.rData)}})},147:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(138),a=r.n(n);t.default={name:"Ali",components:{PF:a.a},computed:{getUserIdData:function(){return{url:"getUserId",m:"getUserId"}}},methods:{getUserIdCallback:function(e){if(e.body.alipay_system_oauth_token_response)return e.body.alipay_system_oauth_token_response.user_id},orderSucc:function(e){return{txnId:e.body.reser_tran_id}},pay:function(e,t){!function(e){window.AlipayJSBridge?e&&e():document.addEventListener("AlipayJSBridgeReady",e,!1)}(function(){try{AlipayJSBridge.call("tradePay",{tradeNO:e.txnId},function(e){t(e)})}catch(e){alert(e)}})}}}},148:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(136),a=r.n(n),i=r(383),o=r.n(i),s=r(137),d=r.n(s),c=r(139),u=r.n(c);t.default={name:"Frame",components:{Order:o.a,Ali:d.a,Wx:u.a},computed:{page:function(){var e=a.a.parse(location.href,!0);return e.query&&e.query.code?u.a:e.query&&e.query.auth_code?d.a:o.a}}}},149:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){var n=r(96),a=r.n(n),i=r(137),o=(r.n(i),r(139)),s=(r.n(o),r(384)),d=r.n(s),c=r(135),u=r.n(c),l=r(95),p=(r.n(l),{wx:{name:"微信",clazz:"btn btn-success"},un:{name:"未知",clazz:"btn btn-danger"},ali:{name:"支付宝",clazz:"btn btn-info"}});t.default={name:"Order",data:function(){return{qr:l.aliRedirect,ua:navigator.userAgent,env:navigator.userAgent.toLowerCase().indexOf("micromessenger")>-1?"wx":navigator.userAgent.toLowerCase().indexOf("alipayclient")>-1?"ali":"un",goodsName:"测试abc",ryOrderId:""+u.a.now()}},computed:{envCN:function(){return p[this.env].name},clazz:function(){return p[this.env].clazz}},components:{QR:d.a},methods:{pay:function(){var t=new e(a()({goodsName:this.goodsName,ryOrderId:this.ryOrderId})).toString("base64");switch(this.env){case"wx":location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+l.wxAppid+"&redirect_uri="+encodeURIComponent(l.wxRedirect)+"&response_type=code&scope=snsapi_base&state="+t+"#wechat_redirect";break;case"ali":location.href="https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id="+l.aliAppid+"&redirect_uri="+encodeURIComponent(l.aliRedirect)+"&scope=auth_base&state="+t;break;default:console.log("can not pay.")}}}}}.call(t,r(97).Buffer)},150:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){var n=r(96),a=r.n(n),i=r(136),o=r.n(i),s=r(382),d=r.n(s),c=r(95);r.n(c);t.default={name:"PayFrame",props:{title:String,codeName:{type:String,required:!0},getUserIdData:{type:Object,required:!0},getUserIdCallback:{type:Function,required:!0},getUserIdFail:{type:Function,required:!1},orderType:{type:String,required:!0},orderSucc:{type:Function,required:!0},orderFail:{type:Function,required:!1},pay:{type:Function,required:!0}},components:{ObjViewer:d.a},data:function(){return{ul:location.href,getParams:{},userId:"1",userIdResp:{},orderInfo:{},orderInfoResp:{},payResp:{}}},mounted:function(){var t=this,r=o.a.parse(location.href,!0),n=new e(r.query.state,"base64").toString(),i=JSON.parse(n);this.getParams={goodsName:i.goodsName,ryOrderId:i.ryOrderId};var s=r.query[this.codeName],d=this.getUserIdFail||function(e){console.log(e),alert("获取用户信息失败\n"+a()(e))};s&&""!=s&&this.$http.post("/srv",_.extend(this.getUserIdData,{code:s})).then(function(e){try{t.userId=t.getUserIdCallback(e)}catch(e){alert(a()(e))}t.userIdResp=e},function(e){t.userIdResp=e,d(e)})},methods:{order:function(){var e=this,t=this.orderFail||function(e){console.log(e),alert("下单失败\n"+a()(e))};this.$http.post(cfg.orderUrl,{openid:this.userId,payType:this.orderType,goodsName:this.getParams.goodsName,ryOrderId:this.getParams.ryOrderId}).then(function(t){e.orderInfoResp=t,e.orderInfo=e.orderSucc(t)},function(r){e.orderInfoResp=r,t(r)})},doPay:function(){var e=this;this.pay(this.orderInfo,function(t){alert(a()(t)),e.payResp=t})}}}}.call(t,r(97).Buffer)},151:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(138),a=r.n(n);t.default={name:"Wx",components:{PF:a.a},computed:{getUserIdData:function(){return{url:"getOpenId",m:"getOpenId"}}},methods:{getUserIdCallback:function(e){if(e.body)return e.body.openid},orderSucc:function(e){var t=e.body;return{appId:t.sdk_appid,timeStamp:t.sdk_timestamp,nonceStr:t.sdk_noncestr,package:t.sdk_package,signType:t.sdk_signtype,paySign:t.sdk_paysign}},pay:function(e,t){var r=function(){console.log(e),WeixinJSBridge.invoke("getBrandWCPayRequest",e,function(e){console.log(e),t(e),e.err_msg})};"undefined"==typeof WeixinJSBridge?document.addEventListener?document.addEventListener("WeixinJSBridgeReady",r,!1):document.attachEvent&&(document.attachEvent("WeixinJSBridgeReady",r),document.attachEvent("onWeixinJSBridgeReady",r)):r()}}}},369:function(e,t){},370:function(e,t){},371:function(e,t){},372:function(e,t){},373:function(e,t){},374:function(e,t){},382:function(e,t,r){function n(e){r(369)}var a=r(42)(r(146),r(385),n,null,null);e.exports=a.exports},383:function(e,t,r){function n(e){r(372)}var a=r(42)(r(149),r(388),n,null,null);e.exports=a.exports},384:function(e,t,r){var n=r(42)(r(145),r(390),null,null,null);e.exports=n.exports},385:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return e.isArray||e.isObj?r("div",{staticClass:"card-body"},[r("div",{staticClass:"card"},[r("div",{staticClass:"card-header"},[e._v("\n      "+e._s(e.title)+"\n    ")]),e._v(" "),r("div",{staticClass:"card-block"},e._l(e.rData,function(e,t){return r("ObjViewer",{key:this._uid,attrs:{title:t,data:e}})}))])]):r("div",{staticClass:"input-group"},[r("span",{staticClass:"input-group-addon col-4"},[e._v(e._s(e.title))]),e._v(" "),r("span",{staticClass:"form-control"},[e._v(e._s(e.data))])])},staticRenderFns:[]}},386:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)(e.page,{tag:"component"})},staticRenderFns:[]}},387:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("PF",{attrs:{title:"支付宝支付","code-name":"auth_code","get-user-id-data":e.getUserIdData,getUserIdCallback:e.getUserIdCallback,"order-type":"1302","order-succ":e.orderSucc,pay:e.pay}})},staticRenderFns:[]}},388:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"card"},[r("div",{staticClass:"card-header"},[e._v("\n    这里是订单页\n  ")]),e._v(" "),r("div",{staticClass:"card-block"},[e._v("\n    可以显示订单信息，所处位置也无所谓"),r("br"),e._v(" "),r("div",{staticClass:"input-group"},[r("span",{staticClass:"input-group-addon"},[e._v("订单号")]),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.ryOrderId,expression:"ryOrderId"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:e.ryOrderId},on:{input:function(t){t.target.composing||(e.ryOrderId=t.target.value)}}})]),e._v("\n    当前的用户环境为 "),r("em",[r("b",[e._v(e._s(e.envCN))])]),r("br"),e._v("\n    当前UserAgent为 "),r("em",[r("b",[e._v(e._s(e.ua))])]),r("br"),e._v(" "),r("QR",{staticStyle:{align:"center"},attrs:{text:e.qr,size:200,color:"blue"}})],1),e._v(" "),r("div",{staticClass:"card-footer"},[r("span",[e._v("这个按钮的链接应该是")]),r("br"),e._v(" "),r("button",{class:e.clazz,attrs:{type:"button",disabled:"un"===e.env},on:{click:e.pay}},[e._v(e._s(e.envCN)+" - 支付")])])])},staticRenderFns:[]}},389:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"card"},[r("div",{staticClass:"card-header"},[e._v("\n    "+e._s(e.title)+"\n  ")]),e._v(" "),r("div",{staticClass:"card-block"},[e.ul?r("ObjViewer",{attrs:{title:"URL",data:e.ul}}):e._e(),e._v(" "),e.getParams?r("ObjViewer",{attrs:{title:"getParams",data:e.getParams}}):e._e(),e._v(" "),e.userId?r("ObjViewer",{attrs:{title:"userId",data:e.userId}}):e._e(),e._v(" "),e.userIdResp?r("ObjViewer",{attrs:{title:"userIdResp",data:e.userIdResp}}):e._e(),e._v(" "),e.orderInfo?r("ObjViewer",{attrs:{title:"orderInfo",data:e.orderInfo}}):e._e(),e._v(" "),e.orderInfoResp?r("ObjViewer",{attrs:{title:"orderInfoResp",data:e.orderInfoResp}}):e._e(),e._v(" "),e.payResp?r("ObjViewer",{attrs:{title:"payResp",data:e.payResp}}):e._e()],1),e._v(" "),r("div",{staticClass:"card-footer"},[r("button",{staticClass:"btn btn-success",attrs:{type:"button"},on:{click:e.order}},[e._v("下单")]),e._v(" "),r("button",{staticClass:"btn btn-success",attrs:{type:"button"},on:{click:e.doPay}},[e._v("支付")])])])},staticRenderFns:[]}},390:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("div")},staticRenderFns:[]}},391:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("PF",{attrs:{title:"微信宝支付","code-name":"code","get-user-id-data":e.getUserIdData,getUserIdCallback:e.getUserIdCallback,"order-type":"1202","order-succ":e.orderSucc,pay:e.pay}})},staticRenderFns:[]}},393:function(e,t){},95:function(e,t){e.exports={orderUrl:"",wxAppid:"",wxRedirect:"",aliAppid:"",aliRedirect:""}}},[144]);
//# sourceMappingURL=app.3b48ae4140be31ba2d1f.js.map