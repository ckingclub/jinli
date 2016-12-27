var app = getApp()
Page({
  data:{
    confirm:'授权登陆',
    cancel:'取消',
    loading:false,
    disabled:false,
    userInfo:{}
  },
    //事件处理函数
  comfim: function() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  cancel:function() {
     wx.navigateTo({
      url: '../logs/logs', 
    }) 
  },
  login:function(){
    var that = this
    wx.login({
      success: function(res){
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://api.jinlibuyi.com',
            data: {
              code: res.code
            },
            method: 'GET',
            success: function (res) {  
            try {  
             wx.setStorageSync('id_token', res.data.id_token)  
             } catch (e) {  
            }  
            wx.navigateTo({  
            url: '../logs/logs'  
            })  
            console.log(res.data);  
            },  
            fail: function (res) {  
                console.log(res.data);  
                console.log('is failed')  
            } 
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      },
      fail: function() {
        console.log('获取用户登录态失败！' + res.errMsg)
      },
      complete: function() {
        console.log('获取用户登录成功！' + res.errMsg)
      }
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})