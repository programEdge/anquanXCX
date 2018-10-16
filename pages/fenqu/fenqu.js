// pages/fenqu/fenqu.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fenqulist: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    var fenqulist = JSON.parse(options.fenxulist);
    console.log(fenqulist)
    that.data.fenqulist = fenqulist;
    that.setData({
      fenqulist: fenqulist
    })
    console.log(fenqulist)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  handleTouchStart: function(e) {

    this.startTime = e.timeStamp;
    // console.log(e)
    console.log(" 鼠标按下起始时间 = " + e.timeStamp);
  },
  //touch end
  handleTouchEnd: function(e) {
    this.endTime = e.timeStamp;
    // console.log(e)
    console.log(" 鼠标松开结束时间 = " + e.timeStamp);
  },
  //单击
  fenquClick: function(e) {
    let that = this;
    if (this.endTime - this.startTime < 350) {
      console.log("点击");
      wx.navigateTo({
        url: '../fenqucheck/fenqucheck?fenquID='+that.data.fenqulist[e.target.dataset.index].id,
      })
    }
  },
  //长按
  handleLongPress: function(e) {
    let that = this;
    // console.log()
    // console.log(that.data.fenqulist[e.target.dataset.index])
    //跳转到分区详情页面，传参id
    wx.navigateTo({
      url: '../fenqushow/fenqushow?fenquID=' + that.data.fenqulist[e.target.dataset.index].id,
    })
  },
})