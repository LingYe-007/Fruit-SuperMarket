Page({

  /**
   * 页面的初始数据
   */
  data: {
    notice_inf:[],
    notice_text:"鲜的青翠欲滴，果的肉质鲜美，尽在慧慧水果超市,欢迎新老顾客选购,还有回赠大礼包哟。",
    swiperList:[
      "http://img.nt-geek.club/fruit_1.jpg",
      "http://img.nt-geek.club/fruit_2.jpg",
      "http://img.nt-geek.club/fruit_3.jpeg"
    ],
    images_list:[{url:"../../pages/pay/index",icon:"../../icons/pay.png",text:"支付"},{url:"../../pages/good_list/index",icon:"../../icons/buy.png",text:"购物"},{url:"../../pages/good_list/index",icon:"../../icons/inf.png",text:"信息"}],
  },
  method:{
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that=this;
    wx.request({
      url: 'http://localhost:3000/query',
      success (res) {
        that.setData({
          notice_inf:res.data
        })
        if(res.data[0].content==1){
          that.setData({
             status:'营业中'
          })
        }
        else{
          that.setData({
            status:'休息中'
          })
        }
      }
    })
    wx.request({
        url: 'http://localhost:3000/goodList/query', //仅为示例，并非真实的接口地址
        data: {
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
            that.setData({
              goods:res.data
                // [`typelist[${i}]`]:res.data[i].type
            })
            var random_list=[];
            for(var i=0;i<8;i++){
              random_list[i]=Math.ceil(Math.random()*35);
            }
            var random=[]
            for(var i=0;i<8;i++){
              random[i]=that.data.goods[random_list[i]]
            }
            that.setData({
              ramdom:random
            })
                      }
    })
    // this.initAnimation(this.data.notice_text)
  }, 
  initAnimation: function (announcementText) {
 
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
  add:function(e) {
    console.log(e);
  }
})
