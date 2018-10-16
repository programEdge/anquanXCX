// pages/zhenggaichulixiangqing/zhenggaichulixiangqing.js
var dateTimePicker = require('../../utils/dateTimePicker.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    zhenggaiSubjectID:0,
    photolist:null,
    date: null,
    picks: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let that = this;
    var result;
    var chuliSubject;
    var shenpiable;
    var jixuable;
    var zhenggaiSubjectID = options.zhenggaiSubjectID;
    // var photolist ;
    var photo;
    var picks = options.picks;
    console.log(picks);
    console.log("123456789987");
    //传入整改项id，查询整改项
    wx.request({
      // url: 'http://139.9.1.229:9400/' + 'wxapi/zhenggaiSubjects/show',
      url: 'http://localhost:9400/' + 'wxapi/zhenggaiSubjects/show',
      data: {
        id: zhenggaiSubjectID,
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
          chuliSubject = JSON.parse(res.data.split("||")[2]);
          shenpiable = JSON.parse(res.data.split("||")[3]);
          jixuable = JSON.parse(res.data.split("||")[4]);
          console.log(result);
          console.log(chuliSubject);
          console.log(shenpiable);
          console.log(jixuable);
          //查询要求整改的图片
          wx.request({
            // url: 'http://139.9.1.229:9400/' + 'wxapi/Photos/listByFiles',
            url: 'http://localhost:9400/' + 'wxapi/Photos/listByFiles',
            data: {
              files: result.files,
            },
            method: "POST",
            //POST提交时
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success(res) {
              console.log(res.data)
              if (res.data.split("||")[0] == "1") {
                photo = JSON.parse(res.data.split("||")[1])
                that.setData({
                  photolist: photo
                })
                // console.log(photo)
              } else {
                console.log(res.data);
              }
            },
            fail: function (res) {
              console.log("项目查询请求失败");
            }
          })
          that.setData({
            zhenggaiSubject: result
          })
          that.setData({
            chuliSubjectlist: chuliSubject
          })
          that.setData({
            shenpiable: shenpiable
          })
          that.setData({
            jixuable: jixuable
          })
          if(picks!= null){
            that.setData({
              picks: picks
            })
          }else{
            that.setData({
              picks: null
            })
          }
        } else {
          console.log(res.data);
        }
      },
      fail: function (res) {
        console.log("项目查询请求失败");
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
  //时间插件
  changeDate(e) {
    console.log(e.detail.value);
    this.setData({ date: e.detail.value });
  },
  photoClick:function(){
    console.log(213);
    wx.navigateTo({
      url: '../photo/photo',
    })
  }
})