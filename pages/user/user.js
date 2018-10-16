var app = getApp();
Page({
  data: {
    username: null,
    tongzhixinxis: '',
    chakantongzhis: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    //console.log()
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
    var result;
    var result2;
    var _this = this;
    if (app.appData.userinfo == null || app.appData.flag == false) {
      wx.redirectTo({
        url: '../login/login'
      })
      // wx.redirectTo({
      //   url: '../login/login'
      // })
    } else {
      console.log(app.appData.userinfo.username + "+++" + app.appData.userinfo.password)
      var that = this;
      wx.request({
        // url: 'http://139.9.1.229:9400/' + 'wxapi/Users/getLogin',
        url: 'http://localhost:9400/' + 'wxapi/Users/getLogin',
        data: {
          username: app.appData.userinfo.username,
          password: app.appData.userinfo.password
        },
        method: "POST",
        //GET提交时
        //  header: {
        //    'content-type': 'application/json' // 默认值
        //  },
        //POST提交时
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success(res) {
          console.log(res.data)
          // console.log(res.data.split("||")[1])
          if (res.data.split("||")[0] == "1") {
            // wx.showToast({
            //   title: "登录成功",
            //   icon: 'success',
            //   duration: 1000//持续的时间
            // })
            var json = [res.data.split("||")[1]];
            result = JSON.parse(res.data.split("||")[1])
            //  console.log(result.username)
            that.setData({
              username: result.username
            })
            that.setData({
              role: result.role
            })
            that.setData({
              unit: result.unit
            })
            that.setData({
              depart: result.depart
            })
            that.setData({
              photo: result.photo
            })
            that.setData({
              xiangmubuName: result.xiangmubuName
            })
            that.setData({
              roleAlias: result.roleAlias
            })
            //给全局变量userID赋值
            app.appData.userID = result.userID;

            // console.log(result.depart == '')
            wx.request({
              // url: 'http://139.9.1.229:9400/' + 'wxapi/notices/listByRole',
              url: 'http://localhost:9400/' + 'wxapi/notices/listByRole',
              data: {
                userID: result.userID,
              },
              method: "POST",
              //GET提交时
              //  header: {
              //    'content-type': 'application/json' // 默认值
              //  },
              //POST提交时
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success(tongzhi) {
                console.log(tongzhi.data)
                console.log(res.data.split("||")[1])
                if (res.data.split("||")[0] == "1") {
                  result2 = JSON.parse(tongzhi.data.split("||")[1])
                  // console.log(result2)
                  _this.setData({
                    tongzhixinxis: result2
                  })
                  // console.log(result2[0].title);
                  // that.setData({ roleAlias: result2.roleAlias })
                  // console.log(result2.depart == '')
                  // console.log(res.data.split("||")[1])
                } else {
                  console.log("通知获取失败");
                  app.appData.content = tongzhi.data;

                }
              },
              fail: function(tongzhi) {
                console.log("通知请求失败");
              }
            })
          } else {
            console.log(res.data);
            // app.appData.flag = false;
            // console.log(app.appData.flag);
            app.appData.content = res.data;
            // console.log(app.appData.content);
            wx.redirectTo({
              url: '../login/login',
            })
          }
          // if ((res.split("||")[0]).equals("1")) {
          //   console.log(res.split("||")[1])
          // }
        },
        fail: function(res) {
          console.log(res.data);
          console.log("登录请求失败");
          wx.redirectTo({
            url: '../login/login'
          })
        }
      })
    }
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
  tongzhiClick: function() {
    let that = this;
    console.log(this.data);
    console.log(this.data.tongzhixinxis);
    this.setData({
      chakantongzhis: this.data.tongzhixinxis
    })
    wx.navigateTo({
      url: '../chakantongzhi/chakantongzhi?chakantongzhis=' + JSON.stringify(that.data.tongzhixinxis)
    })
  },
  btnClick:function(){
    wx.navigateTo({
      url: '../richangxunjian/richangxunjian?userID=' + app.appData.userID,
    })
    
  }
})