// pages/auth/wechat-auth.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  bindGetUserInfo: function (e) {
    if(e.detail.userInfo != undefined){
      wx.showToast({
        title: '权限已取得',
        icon: 'success',
        duration: 3000
      })
      setTimeout(function () {
        wx.redirectTo({
          url: '/pages/oa/oa'
        })
      }, 3000)
    }else{
      wx.showToast({
        title: '授权已取消',
        icon: 'none',
        duration: 3000
      })
    }
  },
  refusePermission: function(e){
    wx.showToast({
      title: '授权已拒绝',
      icon: 'none',
      duration: 3000
    })
    setTimeout(function () {
      wx.navigateBack()
    }, 3000)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '千矢ちゃんのお願い'
    });
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