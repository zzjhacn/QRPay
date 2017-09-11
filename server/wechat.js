const {get} = require('./util')
const _ = require('lodash')

//WX
const WECHAT_CONFIG = require('./.config.wechat')
const cfg = {
  appId: WECHAT_CONFIG.appid,
  ticket: '',
  ticketValid: _.now()
}

function getWxCfg(cb) {
  if (cfg && cfg.ticketValid < _.now()) {
    console.log('re-request ticket')
    get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + WECHAT_CONFIG.appid + '&secret=' + WECHAT_CONFIG.secret, (res) => {
      console.log(res)
      let token = JSON.parse(res)
      get('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + token.access_token + '&type=jsapi', (res) => {
        console.log(res)
        let ticket = JSON.parse(res)
        cfg.ticket = ticket.ticket
        cfg.ticketValid = _.now() + 7000000
        cb(cfg)
      })
    })
  } else {
    console.log('return cache')
    cb(cfg)
  }
}

function getWxOpenId(code, cb) {
  console.log('running getOpenId')
  let _url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + WECHAT_CONFIG.appid + '&secret=' + WECHAT_CONFIG.secret + '&code=' + code + '&grant_type=authorization_code'
  get(_url, cb)
}

module.exports = {
  getWxCfg,
  getWxOpenId
}
