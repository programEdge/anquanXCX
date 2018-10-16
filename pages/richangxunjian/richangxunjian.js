// pages/richangxunjian/richangxunjian.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userID:0,
    projectlist:[],
    currentData: 0,
    show: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    show2: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: [], //下拉列表的数据
    selectData2: [],
    index: 0,//选择的下拉列表下标
    index2: null, //选择的下拉列表下标
    zhenggaiSubjects:[],//整改项的数组k
    checkText:null,//检查内容
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userID = options.userID;
    let that = this;
    var result;
    that.data.userID = userID;
    wx.request({
      // url: 'http://139.9.1.229:9400/' + 'wxapi/areas/list',
      url: 'http://localhost:9400/' + 'wxapi/projects/listByRole',
      data: {
        userID: userID,
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
          console.log(result)
         
          that.setData({
            projectlist: result
          })
          that.data.projectlist = result;
          // console.log(that.data.selectData.length)
          that.setData({
            selectData: that.data.selectData
          })
        } else {
          console.log(res.data);
        }
      },
      fail: function (res) {
        console.log("项目查询请求失败(自主巡检)");
      }
    })
  },  // 点击下拉显示框
  selectTap() {
    let that = this;
    this.setData({
      show: !this.data.show
    });
    that.data.selectData = that.data.projectlist;
    var projectlist = that.data.projectlist;
    // console.log(projectlist)
    // console.log(123)
    for (var i = 0; i < projectlist.length;i++){
      this.setData({
        selectData: projectlist
      });
    }
  
  },
 
  // 点击下拉列表
  optionTap(e) {
    let that = this;
    var result;
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    console.log(Index);
    this.setData({
      index: Index,
      show: !this.data.show
    });
    //选定工程之后，加载对应的分区
    wx.request({
      // url: 'http://139.9.1.229:9400/' + 'wxapi/areas/list',
      url: 'http://localhost:9400/' + 'wxapi/areas/list',
      data: {
        projectID: that.data.selectData[Index].id,
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
          console.log(result)

          // that.setData({
          //   projectlist: result
          // })
          that.data.selectData2 = result;
          // console.log(that.data.selectData.length)
          that.setData({
            selectData2: result
          })
        } else {
          console.log(res.data);
        }
      },
      fail: function (res) {
        console.log("分区查询请求失败(自主巡检)");
      }
    })
    // console.log(that.data.selectData2.length)
    // console.log(321)
  },
  // 点击下拉列表
  optionTap2(e) {
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    this.setData({
      index2: Index,
      show2: !this.data.show2
    });
    
    // console.log("987")
  },
  // 点击下拉显示框
  selectTap2() {
    // console.log("789")
    this.setData({
      show2: !this.data.show2
    });
  },
  //添加巡检记录
  xunjianClick:function(e){
    let that = this;
    var result;
    // console.log(e);
    // console.log(123);
    // console.log(that.data.checkText);
    // console.log(that.data.selectData[that.data.index].id);
    // console.log(that.data.selectData2[that.data.index2].id);
    var projectID = that.data.selectData[that.data.index].id;
    var areaID = that.data.selectData2[that.data.index2].id;
    var zhenggaiSubjects = that.data.zhenggaiSubjects
    // console.log(zhenggaiSubjects);
    // //新增整改及对应的整改项和巡检记录
    wx.request({
      // url: 'http://139.9.1.229:9400/' + 'wxapi/zhenggais/createAll',
      url: 'http://localhost:9400/' + 'wxapi/zhenggais/createAll',
      data: {
        projectID: projectID,
        areaID: areaID,
        zhenggaiSubjects: zhenggaiSubjects,
        checkText: that.data.checkText,
        userID: that.data.userID,
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
          console.log(result)
          wx.showModal({
            title: '提示',
            content: '新增巡检记录成功!',
            showCancel:false,
            success:function(res){
              if(res.confirm){
                wx.switchTab({
                  url: '../user/user',
                })
              }
            }
          })
        } else {
          console.log(res.data);
        }
      },
      fail: function (res) {
        console.log("添加巡检记录请求失败(自主巡检)");
      }
    })
  },
  //获取textarea的内容
  bindWordLimit: function (e) {
    // console.log(e.detail.value)
    this.data.checkText = e.detail.value;
    // this.setData({ checkText: e.detail.value })
  },
  //时间插件
  changeDate(e) {
    console.log(e.detail.value);
    this.setData({ date: e.detail.value });
  },
  //点击添加整改项
  zhenggaiClick:function(){
    
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

  }
})