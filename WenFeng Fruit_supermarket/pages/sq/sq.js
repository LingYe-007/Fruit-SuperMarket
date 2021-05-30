// pages/sq/sq.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
      label:"授权登录",
      isLogin:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  login:function(){
    var that=this;
    wx.showLoading({
      title: '正在登录···',
    })
    wx.switchTab({
      url: '../../pages/index/index',
    })
    wx.login({
      success:function(res){
        
        let code = res.code;
        console.log(code)
        if(code){
          wx.getSetting({
            success: function (res) {
              console.log(res)
              if (res.authSetting['scope.userInfo']){ 
               wx.getUserInfo({
                withCredentials: true,
                success:res=>{
                  console.log("res")
                  console.log("我能执行")
                  wx.request({
                    url: 'http://localhost:3000/login',
                    data:{
                      "code": code,
                      "encryptedData": res.encryptedData,
                      "iv": res.iv
                    },
                  success(res){
                    // console.log(res.data)
                    // that.setData({
                    //   openid:res.data
                    // })
                    app.globalData.openid=res.data;
                    wx.switchTab({
                      url: '../../pages/index/index',
                    })
                  }
                  })
                  // app.globalData.userInfo = res.userInfo;
                }
               })
           
            }}
          })
        }
    }})

  }
})