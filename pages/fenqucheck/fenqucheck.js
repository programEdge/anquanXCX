// pages/fenqucheck/fenqucheck.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checklist:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var fenquID = options.fenquID;
    var result;
    let that = this;


    //根据分区id查询该分区下的所有巡检记录
    wx.request({
      // url: 'http://139.9.1.229:9400/' + 'wxapi/areas/list',
      url: 'http://localhost:9400/' + 'wxapi/checks/listByArea',
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
            checklist: result
          })
          that.data.checklist = result;
          console.log(that.data.checklist);
        } else {
          console.log(res.data);
        }
      },
      fail: function (res) {
        console.log("该分区的巡检记录查询请求失败");
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

  },
  checkClick: function (e) {
    let that = this;
    var result;
    // console.log(e.target.dataset.index);
    //获取点击事件对应的下标
    var index = e.target.dataset.index;
    console.log(index);
    //获取点击的整改信息
    var zhenggai = that.data.checklist[e.target.dataset.index];
    console.log(that.data.checklist[e.target.dataset.index])
    //  //查看计划中的整改项
    if (zhenggai.status == "wc" || zhenggai.status == "xjz") {
      wx.navigateTo({
        url: '../xunjianjilvxiangqing/xunjianjilvxiangqing?checkID=' + zhenggai.id,
      })
    } else {
      wx.navigateTo({
        url: '../zhenggaixiang/zhenggaixiang?zhenggaiID=' + zhenggai.zhenggaiID + '&sort=' + that.data.index,
      })
    }

  }
})