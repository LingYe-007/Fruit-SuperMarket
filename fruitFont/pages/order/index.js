// pages/order/index.j
var app=getApp()
var util=require("../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    multiArray: [['今天', '明天', '3-2', '3-3', '3-4', '3-5'], [0, 1, 2, 3, 4, 5, 6], [0, 10, 20]],
  label:"购物车",
  active:true,
  address:"请您选择收货地址",
  phone:"15826900126",
  now:"",
  addtion:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var TIME = util.formatTime(new Date());
    that.setData({
      now:TIME
    })
    wx.request({
      url: 'http://localhost:3000/shoppingCart/query',
      success(res){
        console.log(res.data)
        let total=0;
        let total1=0;
        for(var i=0;i<res.data.length;i++){
          var price=parseFloat(res.data[i].price);
          var number=parseFloat(res.data[i].number);
          res.data[i].price=res.data[i].price*res.data[i].number
          total=total+res.data[i].price
          total1=total
        }
        total=total+3;
        total1=total1+6;
        that.setData({
          goods:res.data,
          tal:total,
          total:total,
          total1:total1
        })
      }
    })

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
    if(app.address!=null){
      that.setData({
        address:app.address,
        active:false
      })
    }
    var that=this;
    var TIME = util.formatTime(new Date());
    that.setData({
      now:TIME
    })
    wx.request({
      url: 'http://localhost:3000/shoppingCart/query',
      success(res){
        console.log(res.data)
        let total=0;
        let total1=0;
        for(var i=0;i<res.data.length;i++){
          var price=parseFloat(res.data[i].price);
          var number=parseFloat(res.data[i].number);
          res.data[i].price=res.data[i].price*res.data[i].number
          total=total+res.data[i].price
          total1=total
        }
        total=total+3;
        total1=total1+6;
        that.setData({
          goods:res.data,
          tal:total,
          total:total,
          total1:total1
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  },
  addition:function(e){
    var that=this;
    console.log(e.detail.value)
    that.setData({
    addtion:e.detail.value
  })},
  pickerTap:function() {
    var date = new Date();

    var monthDay = ['今天','明天'];
    var hours = [];
    var minute = [];

    // 月-日
    for (var i = 2; i <= 28; i++) {
      var date1 = new Date(date);
      date1.setDate(date.getDate() + i);
      var md = (date1.getMonth() + 1) + "-" + date1.getDate();
      monthDay.push(md);
    }

    // 时
    for (var i = 0; i < 24; i++) {
      hours.push(i);
    }

    // 分
    for (var i = 0; i < 60; i += 10) {
      minute.push(i);
    }

    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
   };
    data.multiArray[0] = monthDay;
    data.multiArray[1] = hours;
    data.multiArray[2] = minute;
    this.setData(data);
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
  click1:function(){
    var that=this;
    that.setData({
      active:true,
      tal:that.data.total
    })
  },
  click2:function(){
    var that =this;
    that.setData({
      active:false,
      tal:that.data.total1
    })
  },
  goPay:function(){
    var that=this;
    if(app.globalData.openid!="" && that.data.goods!="")
    {
      var that=this
    if(that.data.status==true){
      var status="自取"
      var total=that.data.total
    }
    else{
      var status="外送"
      var total=that.data.total1
    }
    wx.request({
      url: 'http://localhost:3000/ord/add',
      method:"post",
      data:{
        openid:app.globalData.openid,
        status:status,
        time:app.globalData.time,
        name:app.globalData.name,
        phone:app.globalData.phone,
        adddress:app.globalData.address,
        goods:that.data.goods[1].id,
        total:total
      }
    })
    }
  },
  chooseadd:function(){
    var that =this;
    that.data.address=app.globalData.address;
  wx.redirectTo({
    url: '../../pages/address/index',
  })
  }
})