const url = require('url')
const {get, post, json2querystring} = require('./util')
const {getWxCfg, getWxOpenId} = require('./wechat')
const {aliAck, getAliUserId} = require('./alipay')
const _ = require('lodash')

function server(request, response) {
  let u = url.parse(request.url, true)
  let params = u.query

  console.log('get params: ')
  console.log(params)

  let rawReq = ''
  request.on('data', (d) => {
    rawReq += d
  })

  let dftResp = function(data) {
    response.writeHead(200, {'Content-Type': 'text/plain'})
    response.write(data, "binary")
    response.end()
  }

  request.on('end', () => {
    console.log('post params: \n' + rawReq)
    if (rawReq && rawReq != '') {
      try {
        _.extend(params, JSON.parse(rawReq))
      } catch (e) {
        console.log(e)
      }
    }

    if (!params.url) {
      console.log('request wrong')
      response.writeHead(200, {'Content-Type': 'text/plain'})
      response.write('wrong request!', "binary")
      response.end()
      return
    }

    console.log('responsing...')

    switch (params.m) {
      case 'aliAck':
        aliAck(response);
        break
      case 'getCfg':
        getWxCfg(dftResp);
        break
      case 'getOpenId':
        getWxOpenId(params.code, dftResp);
        break
      case 'getUserId':
        getAliUserId(params.code, dftResp);
        break
      case 'post':
        post(params.url, params.d || {}, resp);
        break
      default:
        get(params.url, resp)
    }
  })

}

module.exports = server
