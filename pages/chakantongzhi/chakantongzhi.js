// pages/chakantongzhi/chakantongzhi.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chakantongzhis:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var chakantongzhis = JSON.parse(options.chakantongzhis);
    //将接收到的字符串转化成json对象（这里就和后台传输的数据处理方式一样）是数组的话用这种方式接收
    console.log(chakantongzhis);
      that.setData({
        title: chakantongzhis[0].title,
      })
      that.setData({
        user: chakantongzhis[0].user,
      })
      that.setData({
        content: chakantongzhis[0].content,
      })
      that.setData({
        dateTime: chakantongzhis[0].dateTime,
      })
      that.setData({
        yueduNum: chakantongzhis[0].yueduNum,
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
  fanhuiBtnCLick:function(){
    wx.switchTab({
      url: "../user/user"
    })
  }
})