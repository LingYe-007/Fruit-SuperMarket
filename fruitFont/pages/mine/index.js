// pages/mine/index.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    label:"新增地址",
    name:"",
    phone:"",
    address:"",
    add_inf:""
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
  name:function(e){
    this.setData({
      name:e.detail.value
    })
  },
  phone:function(e){
    this.setData({
      phone:e.detail.value
    })
  },
  address:function(e){
    this.setData({
      address:e.detail.value
    })
  },
  add_inf:function(e){
    this.setData({
      add_inf:e.detail.value
    })
  },
  back:function(){
    wx.reLaunch({
      url: '../../pages/address/index',
    })
  },
  ctrl_s:function(){
    var that=this
    wx.request({
      url: 'http://localhost:3000/address',
      data:{
        openid:app.openid,
        name:that.data.name,
        phone:that.data.phone,
        address:that.data.address,
        add_inf:that.data.add_inf
      },
      success(res){
        console.log(res)
        wx.reLaunch({
          url: '../../pages/address/index',
        })
      }
    })
  }
})