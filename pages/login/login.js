var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:null,
    password:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    // console.log(app.appData.content)
    
    if (app.appData.content  != null) {
      wx.showToast({

        title: app.appData.content,

        icon: 'none',

        duration: 1000//持续的时间

      })
    } 
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  loginBtnClick:function(){
    app.appData.flag == true
    app.appData.userinfo = { username: this.data.username,password:this.data.password }
    // console.log(this.data.username + "==" + this.data.password)
    // wx.redirectTo({
    //   url: "../user/user",
    // })
    wx.switchTab({
      url: "../user/user"
    })
  }, 
  usernameInput: function (event) {
  //  console.log(event.detail.value)
    this.setData({username:event.detail.value})
  },
  passwordInput: function (event) {
   // console.log(event)
    this.setData({password:event.detail.value})
  }
})