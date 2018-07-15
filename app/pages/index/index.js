// pages/index/index.js
import chiya from '../../utils/utils.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  openOaSystem: chiya.throttle(function(e) {
    wx.getSetting({
      success: function(res) {
        // 获取用户权限
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            // 有权限跳转
            success: function(res) {
              wx.navigateTo({
                url: '/pages/oa/oa',
              })
            }
          })
        } else {
          // 无权限请求
          wx.navigateTo({
            url: '/pages/auth/wechat-auth'
          })
        }
      }
    })
  }, 1500),

  clearStorage: function(){
    wx.clearStorage()
    wx.showToast({
      title: "缓存已清除",
      icon: 'none',
      duration: 1500
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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

  }

})
