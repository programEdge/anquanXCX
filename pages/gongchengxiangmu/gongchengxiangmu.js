// pages/shouye/shouye.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData: 0,
    show: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    show2: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['全部状态', '无计划', '计划中', '已巡检', '巡检中', '计划超时', '待整改', '整改中', '整改完成', '整改超时'], //下拉列表的数据
    selectData2: ['默认排序', '按创建时间倒序', '按更新时间倒序'],
    index: 0, //选择的下拉列表下标
    index2: 0, //选择的下拉列表下标
    xiangmubus: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var result;
    let that = this;
    // console.log(app.appData.userID+"=====")
    wx.request({
      // url: 'http://139.9.1.229:9400/' + 'wxapi/projects/listByRole',
      url: 'http://localhost:9400/' + 'wxapi/projects/listByRole',
      data: {
        userID: app.appData.userID,
      },
      method: "POST",
      //POST提交时
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res.data)
        if (res.data.split("||")[0] == "1") {
          result = JSON.parse(res.data.split("||")[1])
          console.log(result)
          that.setData({
            xiangmubus: result
          })
          that.data.xiangmubus = result;
        } else {
          console.log(res.data);
        }
      },
      fail: function(res) {
        console.log("项目查询请求失败");
      }
    })
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
  //获取当前滑块的index
  bindchange: function(e) {
    const that = this;
    console.log(e.detail.current + "999")
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function(e) {
    const that = this;

    if (that.data.currentData === e.target.dataset.current) {
      console.log(that.data.currentData + "666")
      return false;
    } else {
      console.log(e.target.dataset.current + "888")
      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },
  // 点击下拉显示框
  selectTap() {

    this.setData({
      show: !this.data.show
    });
  },
  // 点击下拉显示框
  selectTap2() {
    this.setData({
      show2: !this.data.show2
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    this.setData({
      index: Index,
      show: !this.data.show
    });

  },
  // 点击下拉列表
  optionTap2(e) {
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    this.setData({
      index2: Index,
      show2: !this.data.show2
    });
  },
  gongchengClick: function(e) {
    let that = this;
    var xiangmubus = that.data.xiangmubus; 
    var result;
    // console.log(e)
    // console.log(xiangmubus[e.target.dataset.index])
    wx.request({
      // url: 'http://139.9.1.229:9400/' + 'wxapi/areas/list',
      url: 'http://localhost:9400/' + 'wxapi/areas/list',
      data: {
        projectID: xiangmubus[e.target.dataset.index].id,
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
          wx.navigateTo({
            url: '../fenqu/fenqu?fenxulist=' + JSON.stringify(result),
          })
          that.setData({
            fenxulist: result
          })
        } else {
          console.log(res.data);
        }
      },
      fail: function (res) {
        console.log("项目查询请求失败");
      }
    })
  }
})