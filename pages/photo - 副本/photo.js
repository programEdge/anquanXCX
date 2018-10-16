// var app = getApp()
// // pages/canvas/canvasDemo/canvasDemo1/canvasDemo1.js
// var ctx = wx.createCanvasContext("myCanvas");


var app = getApp()
Page({
  data: {
    tempFilePaths: ''
  },
  onLoad: function () {
  },
  chooseimage: function () {
    var _this = this;
    wx.chooseImage({
      count: 20, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // //建立变量接收传递的图片地址的集合
        // let tempFilePaths = res.tempFilePaths;
        // for(let i=0;i<tempFilePaths.length;i++){
        //   if(img)
        // }
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        _this.setData({
          tempFilePaths: res.tempFilePaths
        })
        console.log(res.tempFilePaths[0]);
      }
    })
  }
})
