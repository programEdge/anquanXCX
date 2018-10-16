// pages/zhenggaixiang/zhenggaixiang.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['按创建时间', '按计划巡检时间'], //下拉列表的数据
    index: 0,//选择的下拉列表下标
    zhenggaiID: 0,
    sort: 0,
    zhenggaiSubjectlist:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var zhenggaiID = options.zhenggaiID;
    var sort = options.sort;
    var result;
    // console.log(options.zhenggaiID);
    // console.log(options.sort);
    if (zhenggaiID != 0){

    //查询该整改ID下的所有整改项
    wx.request({
      // url: 'http://139.9.1.229:9400/' + 'wxapi/zhenggaiSubjects/listByZhenggai',
      url: 'http://localhost:9400/' + 'wxapi/zhenggaiSubjects/listByZhenggai',
      data: {
        zhenggaiID: zhenggaiID,
        sort: sort,
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
            zhenggaiSubjectlist: result
          })
          // console.log(that.data.checklist);
        } else {
          console.log(res.data);
        }
      },
      fail: function(res) {
        console.log("项目查询请求失败");
      }
    })
    }
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
  // 点击下拉显示框
  selectTap() {
    let that = this;
    that.setData({
      show: !this.data.show
    });
    // console.log(123)
  },
  // 点击下拉列表
  optionTap(e) {
    let that = this;
    var result;
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    that.setData({
      index: Index,
      show: !this.data.show
    });
    //根据点击获取的下拉框的值来查询所有的检查记录
    wx.request({
      // url: 'http://139.9.1.229:9400/' + 'wxapi/checks/listByRole',
      url: 'http://localhost:9400/' + 'wxapi/checks/listByRole',
      data: {
        userID: app.appData.userID,
        sort: Index,
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
        } else {
          console.log(res.data);
        }
      },
      fail: function (res) {
        console.log("项目查询请求失败");
      }
    })
    // console.log(e.currentTarget.dataset.index)
  },
  zhenggaiSubjectClick:function(e){
    let that = this;
    var result;
    var chuliSubject;
    var shenpiable;
    var jixuable;
    //  console.log(e.target.dataset.index);
    var index = e.target.dataset.index;
    // console.log(that.data.zhenggaiSubjectlist[e.target.dataset.index]);
    //获取点击的整改项信息
    var zhenggaiSubject = that.data.zhenggaiSubjectlist[e.target.dataset.index];
   wx.navigateTo({
     url: '../zhenggaichulixiangqing/zhenggaichulixiangqing?zhenggaiSubjectID='+zhenggaiSubject.id,
   })
  }
})