//index.js
//获取应用实例
const app = getApp()
const req = require('../../utils/util.js')

Page({
  data: {
 
  },
 bindtest:function(){
   wx.request({
     url: 'http://localhost:9400/'+'wxapi/Users/getLogin', //仅为示例，并非真实的接口地址
     data: {
       username: "admin",
       password: "123456"
     },
     method:"POST",
     //GET提交时
    //  header: {
    //    'content-type': 'application/json' // 默认值
    //  },
    //POST提交时
     header: {
        'content-type': 'application/x-www-form-urlencoded'
        },
     success(res) {
      
         console.log(res.data.split("||")[1])
  
  
     },
     fail:function(res){
       
    
       console.log(".......fail....");
     }
   })
 }
})

