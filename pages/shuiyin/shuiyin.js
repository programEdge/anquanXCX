// pages/canvas/canvasDemo/canvasDemo1/canvasDemo1.js
var ctx = wx.createCanvasContext("myCanvas");
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
    // console.log(options)
    ctx.drawImage("/image/index.jpg", 0, 0, 375, 375)//在画布上绘入图片，参数含义移步手册。
    ctx.rotate(45 * Math.PI / 180);//设置文字的旋转角度，角度为45°；

    //对斜对角线以左部分进行文字的填充
    for (let j = 1; j < 2; j++) { //用for循环达到重复输出文字的效果，这个for循环代表纵向循环
      ctx.beginPath();
      ctx.setFontSize(30);
      ctx.setFillStyle("rgba(255,255,255,.5)");
      ctx.fillText("[安全云]项目：合锦保利嘉苑（标段二）", 0, 50*j);
      // for (let i = 1; i < 10; i++) {//这个for循环代表横向循环，
      //   ctx.beginPath();
      //   ctx.setFontSize(30);
      //   ctx.setFillStyle("rgba(255,255,255,.5)");
      //   ctx.fillText("[安全云]项目：合锦保利嘉苑（标段二）",0,50);
      // }
    }
    for (let j = 2; j < 3; j++) { //用for循环达到重复输出文字的效果，这个for循环代表纵向循环
      ctx.beginPath();
      ctx.setFontSize(30);
      ctx.setFillStyle("rgba(255,255,255,.5)");
      ctx.fillText("拍照时间：2018-10-13", 50 * j, 50 * j);
    }
    for (let j = 3; j < 4; j++) { //用for循环达到重复输出文字的效果，这个for循环代表纵向循环
      ctx.beginPath();
      ctx.setFontSize(30);
      ctx.setFillStyle("rgba(255,255,255,.5)");
      ctx.fillText("拍照人：2018-10-13", 50 * j, 50 * j);
    }
    for (let j = 4; j < 5; j++) { //用for循环达到重复输出文字的效果，这个for循环代表纵向循环
      ctx.beginPath();
      ctx.setFontSize(30);
      ctx.setFillStyle("rgba(255,255,255,.5)");
      ctx.fillText("拍照地址：2018-10-13", 50 * j, 50 * j);
    }
    // ctx.fillText("拍照时间：", 0, 50 * a);
    // ctx.fillText("拍照地址：", 0, 200);
    //两个for循环的配合，使得文字充满斜对角线的左下部分

    //对斜对角线以右部分进行文字的填充逻辑同上
    for (let j = 2; j < 5; j++) {
      ctx.beginPath();
      ctx.setFontSize(30);
      ctx.setFillStyle("rgba(255,255,255,.5)");
      ctx.fillText("拍照地址：2018-10-13", 0, -50 * j);
      if(j == 4){
      for (let i = 1; i < 2; i++) {
        ctx.beginPath();
        ctx.setFontSize(30);
        ctx.setFillStyle("rgba(255,255,255,.5)");
        ctx.fillText("[安全云]项目：合锦保利嘉苑（标段二）", -10 * i, -10*j);
      }
      }
    }
    ctx.draw();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
