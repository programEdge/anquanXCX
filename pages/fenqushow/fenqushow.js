// pages/fenqushow/fenqushow.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var fenquID = options.fenquID;
    var result;
    let that = this;
    // console.log(fenquID)
    //通过id查询分区信息
    wx.request({
      // url: 'http://139.9.1.229:9400/' + 'wxapi/areas/list',
      url: 'http://localhost:9400/' + 'wxapi/areas/show',
      data: {
        id: fenquID,
      },
      method: "POST",
      //POST提交时
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        // console.log(res.data)
        if (res.data.split("||")[0] == "1") {
          result = JSON.parse(res.data.split("||")[1])
          // console.log(result)
          that.setData({
            fenqu: result
          })
        } else {
          console.log(res.data);
        }
      },
      fail: function (res) {
        console.log("分区查询请求失败");
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

  }
})