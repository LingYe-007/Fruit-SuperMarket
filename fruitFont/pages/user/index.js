
// pages/test/test.js
const APP_ID = 'wx485285504034f7a6';//输入小程序appid  
const APP_SECRET = '8e6e45f981e0e7045e4ebc86f490b4f9';//输入小程序app_secret  
var OPEN_ID = ''//储存获取到openid  
var SESSION_KEY = ''//储存获取到session_key
var CODE=''  
Page({
  data:{
    label:"我的",
    user_info:"../../icons/user_info.png",
    images_list:[{url:"../../pages/pay/index",icon:"../../icons/wait_pay.png",text:"待付款",id:"1"},{url:"../../pages/good_list/index",icon:"../../icons/wait_buy.png",text:"待收货",id:"2"},{url:"../../pages/good_list/index",icon:"../../icons/wait_finish.png",text:"已完成",id:"3"},{url:".././",icon:"../../icons/return.png",text:"退款",id:"4"}],
    address_list:[{url:"",icon:"../../icons/pingtuan.png",text:"拼团订单"},{url:"",icon:"../../icons/address.png",text:"地址管理"},{url:"",icon:"../../icons/present.png",text:"我的赠品"},{url:"haha",icon:"../../icons/phone.png",text:"商家电话"}]
  }, 
  getOpenIdTap: function () {
    var that = this;
    wx.login({
      success: function (res) {
        wx.request({
          //获取openid接口  
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            appid: APP_ID,
            secret: APP_SECRET,
            js_code: res.code,
            grant_type: 'authorization_code'
          },
          method: 'GET',
          success: function (res) {
            console.log(res.data)
            OPEN_ID = res.data.openid;//获取到的openid  
            SESSION_KEY = res.data.session_key;//获取到session_key  
            console.log(OPEN_ID.length)
            console.log(SESSION_KEY.length)
            that.setData({
              openid: res.data.openid.substr(0, 10) + '********' + res.data.openid.substr(res.data.openid.length - 8, res.data.openid.length),
              session_key: res.data.session_key.substr(0, 8) + '********' + res.data.session_key.substr(res.data.session_key.length - 6, res.data.session_key.length)
            })
          }
        })
      }
    })
  },
  onLoad:function(){
    var that=this;
    wx.getUserInfo({
     success:function(res){
        var userInfo=res.userInfo
        that.setData({
          nickname:userInfo.nickName,
          avatarUrl:userInfo.avatarUrl
        })
     }
    })
  },
  goTo:function(){
    wx.redirectTo({
      url: '../auth/index',
    })
  },
  getCodeTap:function(){
    var that = this;
    wx.login({
      success: function (res) {
        CODE = res.code;//code  
        console.log(CODE)
        that.setData({
          code: CODE
        })
      }
    })
  }
}) 