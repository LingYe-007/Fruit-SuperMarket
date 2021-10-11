// pages/goood_list/index.js
var app=getApp()
var QQMapWX=require('../../utils/qqmap.js');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'0',
    address:"请选择收货地址",
    swiperList:["../../icons/swiper_1.png","../../icons/swiper_2.png"],
    label:"慧慧小商城",
    province: '', //省
    city: '',  //市
    position:"",
    type:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function () {
  
      },
  //   qqmapsdk = new QQMapWX({
  //     //腾讯位置服务：   https://lbs.qq.com/console/mykey.html
  //     key: 'D2QBZ-IXLKU-XLPV2-BSBRO-L7LI2-SVBMB' //这里自己的key秘钥进行填充，该key是腾讯位置服务中申请的
  //   });
 
  //   var that = this
 
  //   wx.getSetting({  //获取用户授权设置
  //     success: res => {
        
  //       console.log(JSON.stringify(res))
 
  //       if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
  //         wx.showModal({
  //           title: '请求授权当前位置',
  //           content: '需要获取您的地理位置，请确认授权',
  //           success: function (res) {
  //             if (res.cancel) {
  //               wx.showToast({
  //                 title: '拒绝授权',
  //                 icon: 'none',
  //                 duration: 1000
  //               })
  //             } else if (res.confirm) {
  //               wx.openSetting({
  //                 success: function (dataAu) {
  //                   if (dataAu.authSetting["scope.userLocation"] == true) {
  //                     wx.showToast({
  //                       title: '授权成功',
  //                       icon: 'success',
  //                       duration: 1000
  //                     })
  //                     //再次授权，调用wx.getLocation的API
  //                     that.getLocation();
  //                   } else {
  //                     wx.showToast({
  //                       title: '授权失败',
  //                       icon: 'none',
  //                       duration: 1000
  //                     })
  //                   }
  //                 }
  //               })
  //             }
  //           }
  //         })
  //       } else if (res.authSetting['scope.userLocation'] == undefined) {
  //         //调用wx.getLocation的API
  //         that.getLocation();
  //       }
  //       else {
  //         //调用wx.getLocation的API
  //         that.getLocation();
  //       }
  //     }
  //   })
  // },
  // getLocation: function () {
  //   let that = this;
  //   wx.getLocation({
  //     type: 'wgs84',
  //     success: function (res) {
  //       console.log("success "+JSON.stringify(res))
  //       var latitude = res.latitude  //纬度，范围为 -90~90，负数表示南纬
  //       var longitude = res.longitude  //经度，范围为 -180~180，负数表示西经
  //       var speed = res.speed
  //       var accuracy = res.accuracy;
  //       console.log("latitude " + latitude + " ;longitude " + longitude)//这里获取的是经纬度
  //       that.getLocal(latitude, longitude) //把经纬度传给getLocal方法
  //     },
  //     fail: function (res) {
  //       console.log('fail ' + JSON.stringify(res))
  //     }
  //   })
  // },
  // // 获取当前地理位置
  // getLocal: function (latitude, longitude) { //把经纬度转换成地理位置
  //   let that = this;
  //   qqmapsdk.reverseGeocoder({
  //     location: {
  //       latitude: latitude,
  //       longitude: longitude
  //     },
  //     success: function (res) {
  //       console.log(JSON.stringify(res));
  //       let province = res.result.ad_info.province
  //       let city = res.result.ad_info.city
  //       let position=res.result.formatted_addresses.recommend
  //       that.setData({ //把地理位置省市赋值给声明在data中的变量
  //         province: province,
  //         city: city,
  //         position:position
  //       })
        
  //     },
  //     fail: function (res) {
  //       console.log(res);
  //     },
  //     complete: function (res) {
  //       // console.log(res);
  //     }
  //   })},


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
      url: 'http://localhost:3000/goodList/query', //仅为示例，并非真实的接口地址
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data.length)
          that.setData({
            goods:res.data
              // [`typelist[${i}]`]:res.data[i].typeo'n
          })
        }
      })
    wx.request({
      url: 'http://localhost:3000/goodList/search',
      data:{},
      success(res){
        that.setData({
          typelist:res.data
        })
        var goodlist=[]
        console.log(that.data.typelist)
        var index=that.data.typelist[0]
        for(var i=0;i<that.data.goods.length;i++){
          console.log(that.data.goods[i].type)
          that.data.goods[i].openid=app.globalData.openid;
          that.data.goods[i].number='';
          if(index==that.data.goods[i].type)
          {
            goodlist[i]=that.data.goods[i];
            console.log(goodlist[i].id)
          }
        }
        that.setData({
          goodlist:goodlist
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    var that =this;
    var goods=that.data.goods
      wx.request({
        method:"POST",
        url: 'http://localhost:3000/shoppingCart/add',
        data:{
          goods:goods
        },
        success(res){
          console.log(res)
          }
      })
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
  add:function(e){
    var that=this;
    var id=e.target.id
    console.log(id)
    var goods=that.data.goods;
    var goodlist=that.data.goodlist;
    for(var i=0;i<goods.length;i++)
    {   if(id==goods[i].id){
      if(goods[i].number==""){
        goods[i].number=0.5;
        that.setData({
          goods:goods
        })
      }
      else{
        goods[i].number=goods[i].number+0.5
        that.setData({
          goods:goods
        })
      }
    }}
    for(var i=0;i<goodlist.length;i++)
    {
      console.log("1")
      if(id==goodlist[i].id){
        if(goodlist[i].number==""){
          goodlist[i].number=0.5
          that.setData({
            goodlist:goodlist
          })
        }
        else{
          goodlist[i].number=goodlist[i].number+0.5
          that.setData({
            goodlist:goodlist
          })
        }
      }
    }
  },
  switchClass:function(e){
    var that =this;
    var id=e.currentTarget.dataset.index
    that.setData({
      id:id,
      goodlist:[]
    })
        var goodlist1=[]
        var index=that.data.typelist[id]
        var j=0
        for(var i=0;i<that.data.goods.length;i++){
          console.log(that.data.goods[i].type)
          if(index==that.data.goods[i].type && that.data.goods[i]!=null)
          {
            console.log(i)
            goodlist1[j]=that.data.goods[i]
            j=j+1;
          }
        }
        that.setData({
          goodlist:goodlist1
        })
  },
  jian:function(e){
    var that=this;
    var id=e.target.id
    console.log(id)
    var goods=that.data.goods;
    var goodlist=that.data.goodlist;
    for(var i=0;i<goods.length;i++)
    {   
      if(id==goods[i].id){
      if(goods[i].number==0.5){
        goods[i].number="";
        that.setData({
          goods:goods
        })
      }
      else{
        goods[i].number=goods[i].number-0.5
        that.setData({
          goods:goods
        })
      }
    }}
    for(var i=0;i<goodlist.length;i++)
    {
      if(id==goodlist[i].id){
        if(goodlist[i].number==0.5){
          goodlist[i].number=""
          that.setData({
            goodlist:goodlist
          })
        }
        else{
          goodlist[i].number=goodlist[i].number-0.5
          that.setData({
            goodlist:goodlist
          })
        }
      }
    }
  }
})