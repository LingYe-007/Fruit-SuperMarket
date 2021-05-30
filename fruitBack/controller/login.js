const e = require('express');
const exec = require('../config/mysql')
const login=(params)=>{
    let code =params.code;
    let encryptedData=params.encryptedData;
    let iv=params.iv;
    let appid="wx485285504034f7a6";
    let secret='93db769ade693327e6bbcf99a0dcd1a1';
    let grant_type="authorization_code";
    // 请求获取openid
    let url = "https://api.weixin.qq.com/sns/jscode2session?grant_type="+grant_type+"&appid="+appid+"&secret="+secret+"&js_code="+code;
    let openid,sessionKey;
    let https = require("https");
   var result=https.get(url, (res) => {
    res.on('data', (d) => {
        // console.log('返回的信息: ', JSON.parse(d));
        openid = JSON.parse(d).openid;//得到openid
        sessionKey = JSON.parse(d).session_key;
        return openid,sessionKey//得到session_key
    }).on('error', (e) => {
        return e;
        // console.error(e);
        // console.log(openid)
    });
  
});
}
module.exports = {
    login
}