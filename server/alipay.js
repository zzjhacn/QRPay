const {get, json2querystring} = require('./util')
const crypto = require('crypto')

//ALI
const ALI_CONFIG = require('./.config.alipay')

function signer(str) {
  // let sign = crypto.createSign('RSA-SHA1')
  let sign = crypto.createSign('RSA-SHA256')
  sign.update(str)
  return sign.sign(ALI_CONFIG.pk, 'base64')
}

function signAlipay(data) {
  let str = json2querystring(data)
  return signer(str)
}

function aliAck(resp) {
  let msg = `<biz_content>${ALI_CONFIG.pubKc}</biz_content><success>true</success>`
  let signstr = sign(msg)
  let respTxt = `<?xml version="1.0" encoding="GBK"?><alipay><response>${msg}</response><sign>${signstr}</sign><sign_type>RSA2</sign_type></alipay>`
  resp.writeHead(200, {'Content-Type': 'text/xml;charset=GBK'})
  resp.write(respTxt)
  resp.end()
}

function getAliUserId(authCode, cb) {
  let req = {
    app_id: ALI_CONFIG.appid,
    method: 'alipay.system.oauth.token',
    format: 'JSON',
    charset: 'GBK',
    sign_type: 'RSA2',
    timestamp: new Date().Format("yyyy-MM-dd hh:mm:ss"),
    version: '1.0',
    grant_type: 'authorization_code',
    code: authCode
  }
  req.sign = signAlipay(req)
  let str = json2querystring(req, encodeURIComponent)
  get('https://openapi.alipay.com/gateway.do?' + str, cb)
}

module.exports = {
  aliAck,
  getAliUserId
}
