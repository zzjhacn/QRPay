## 扫码付 （公众号支付 & 服务窗支付）

* 准备
  * 服务端配置
    - create file `./server/.config.alipay.js` , 内容 ：
      ```nodejs
      module.exports = {
        appid: 'app_id',
        pubK: '公钥',
        pk: '私钥'
      }
      ```

    - create file `./server/.config.wechat.js` , 内容 ：
      ```nodejs
      module.exports = {
        appid: 'app_id'
        secret: 'secret'
      }
      ```

  * 客户端配置

    修改配置`./src/pay/Cfg.js`
* 执行

  `npm install && npm run dev`
