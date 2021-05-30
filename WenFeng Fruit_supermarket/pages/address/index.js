// pages/address/index.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      label:"地址列表",
      active:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var that=this;
      wx.request({
        url: 'http://localhost:3000/address/query',
        success(res){
          that.setData({
            myaddress:res.data
          })
          if(that.data.myaddress!=null){
            that.setData({
              active:false
            })
          }
        }
      })
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
  addaddress:function(){
    wx.redirectTo({
      url: '../../pages/mine/index',
    })
  },
  back:function(){
    wx.reLaunch({
      url: '../../pages/order/index',
    })
  },
  choose:function(e){
    var that=this
    var id=e.currentTarget.dataset.index;
    console.log(id)
    app.name=that.data.myaddress[id].name
    app.phone=that.data.myaddress[id].phone
    app.address=that.data.myaddress[id].address+that.data.myaddress[id].add_inf
    app.add_inf=that.data.myaddress[id].add_inf
    wx.reLaunch({
      url: '../../pages/order/index',
    })
  }
})