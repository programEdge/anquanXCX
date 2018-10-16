var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData: 0,
    show: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['按创建时间', '按计划巡检时间'], //下拉列表的数据
    index: 0, //选择的下拉列表下标
    zhenggaiID: 0, // 选择的整改的id
    checklist: null,

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    var result;
    // console.log(that.data.currentData + "====");
    //请求获取所有检查记录
    wx.request({
      // url: 'http://139.9.1.229:9400/' + 'wxapi/checks/listByRole',
      url: 'http://localhost:9400/' + 'wxapi/checks/listByRole',
      data: {
        userID: app.appData.userID,
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
          console.log(result[0].zhenggaiID)
          that.setData({
            checklist: result
          })
          that.data.checklist = result;
          // console.log(that.data.checklist);
        } else {
          console.log(res.data);
        }
      },
      fail: function(res) {
        console.log("项目查询请求失败");
      }
    })
  },
  //获取当前滑块的index
  bindchange: function(e) {
    let that = this;
    // var result;
    // console.log(e.detail.current + "999")
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function(e) {
    let that = this;
    if (that.data.currentData === e.target.dataset.current) {
      // console.log(that.data.currentData + "666")
      return false;
    } else {
      // console.log(e.target.dataset.current)
      that.setData({
        currentData: e.target.dataset.current
      })
    }
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
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
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
      fail: function(res) {
        console.log("项目查询请求失败");
      }
    })
    // console.log(e.currentTarget.dataset.index)
  },
  checkClick: function(e) {
    let that = this;
    var result;
    // console.log(e.target.dataset.index);
    //获取点击事件对应的下标
    var index = e.target.dataset.index;
    // console.log(that.data.checklist[e.target.dataset.index]);
    //获取点击的整改信息
    var zhenggai = that.data.checklist[e.target.dataset.index];
    console.log(zhenggai)

    //  //查看计划中的整改项
    if (zhenggai.status == "wc") {
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