
// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../sdkthirdparty/index');
// 引入配置
var config = require('../../config');

// 显示繁忙提示
var showBusy = text => wx.showToast({
    title: text,
    icon: 'loading',
    duration: 10000
});

// 显示成功提示
var showSuccess = text => wx.showToast({
    title: text,
    icon: 'success'
});

// 显示失败提示
var showModel = (title, content) => {
    wx.hideToast();

    wx.showModal({
        title,
        content: JSON.stringify(content),
        showCancel: false
    });
};

var app = getApp()

Page({
  data:{
    confirm:'授权登陆',
    cancel:'取消',
    loading:false,
    disabled:false,
    userInfo:{}
  },

  doLogin() {
        showBusy('正在登录');

        // 登录之前需要调用 qcloud.setLoginUrl() 设置登录地址，不过我们在 app.js 的入口里面已经调用过了，后面就不用再调用了
        qcloud.login({
            success(result) {
                showSuccess('登录成功');
                wx.navigateTo({
                  url: '../logs/logs',
                });
                console.log('登录成功', result);
            },

            fail(error) {
                showModel('登录失败', error);
                console.log('登录失败', error);
            }
        });
    },
    
  cancel:function() {
     wx.navigateTo({
      url: '../logs/logs', 
    }) 
  },
  onLoad: function () {
    var that = this
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.setData({
                userInfo:res.userInfo
              })
            }
          })
        }
      })
  }
})