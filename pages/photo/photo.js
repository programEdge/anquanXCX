var ctx = wx.createCanvasContext("myCanvas");
var bmap = require('../../libs/bmap-wx.min.js');
var wxMarkerData = []; //定位成功回调对象
var app = getApp();
Page({
  data: {
    pics: [],
    count: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    isShow: true,
    images: null,
    //地图
    ak: "alyw5OT35diDp4iD82eoU32f14vzkSn1", //填写申请到的ak
    markers: [],
    longitude: '', //经度
    latitude: '', //纬度
    address: '', //地址
    cityInfo: {}, //城市信息
  },
  onLoad: function(options) {
    // 生命周期函数--监听页面加载
    isShow: (options.isShow == "true" ? true : false)
  },
  // 图片上传
  chooseImage: function() {
    var that = this;
    var pics = this.data.pics;
    wx.chooseImage({
      count: 30 - pics.length, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res) {
        // success
        var imgSrc = res.tempFilePaths;
        pics = pics.concat(imgSrc);
        // 控制触发添加图片的最多时隐藏
        if (pics.length >= 30) {
          that.setData({
            isShow: (!that.data.isShow)
          })
        } else {
          that.setData({
            isShow: (that.data.isShow)
          })
        }
        that.setData({
          pics: pics
        })
        console.log(pics);
        //地图


      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }

    })

  },
  // 图片预览
  previewImage: function(e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.pics
    })
  },
  deleteImage: function(e) {
    var that = this;
    var images = that.data.pics;
    var index = e.currentTarget.dataset.index; //获取当前长按图片下标
    console.log(images);
    console.log(index);
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function(res) {
        if (res.confirm) {
          var photo = that.data.pics;
          console.log('点击确定了');
          photo.splice(index, 1);
          console.log(photo);
          images = photo;
          // that.setData({
          //   images: photo
          // });
          that.setData({
            pics: images
          });
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
        // that.setData({
        //   images
        // });
      }
    })
  },
  photoClick: function(e) {
    let that = this;
    var pics = that.data.pics;
    if (pics.length == 0) {
      wx.showModal({
        title: '请添加图片再提交',
        showCancel: false,
      })
    } else {
      wx.showModal({
        title: '是否确定提交？',
        success: function(res) {
          // console.log(res)
          if (res.confirm) {


            console.log(pics);
            // 循环上传
            for (var i = 0; i < pics.length; i++) {
              console.log(pics[i].substr(0, 10));
              console.log(wxMarkerData);
              if (pics[i].substr(0, 10) == 'http://tmp') {
                wx.uploadFile({
                  // url: 'http://139.9.1.229:9400/' + '/wxapi/photos/create',
                  url: 'http://localhost:9400/' + '/wxapi/photos/create',
                  filePath: 'pics[i]',
                  name: 'file',
                  formData: {
                    wxMarkerData: wxMarkerData,
                    name: '第' + i + '张照片',
                  },
                  success: function(res) {
                    console.log("123");
                  },
                  fail: function (res) {
                    console.log(res);
                  },

                })
              }
            }
          }
          // console.log(pics);
        }

      })
    }
  },
  onShow: function() {
    let that = this;
    /* 获取定位地理位置 */
    // 新建bmap对象 
    var BMap = new bmap.BMapWX({
      ak: that.data.ak
    });
    var fail = function(data) {
      // console.log(data);
    };
    var success = function(data) {
      //返回数据内，已经包含经纬度
      // console.log(data.wxMarkerData);
      //使用wxMarkerData获取数据
      wxMarkerData = data.wxMarkerData;
      //把所有数据放在初始化data内
      // that.setData({
      //   markers: wxMarkerData,
      //   latitude: wxMarkerData[0].latitude,
      //   longitude: wxMarkerData[0].longitude,
      //   address: wxMarkerData[0].address,
      //   cityInfo: data.originalData.result.addressComponent
      // });
      // app.appData.address = data.wxMarkerData[0].address;

    }
    // // 发起regeocoding检索请求 
    BMap.regeocoding({
      fail: fail,
      success: success
    });

  }
})