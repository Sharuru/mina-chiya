// pages/oa/oa.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo : {
      base:{
        avatarUrl: "/images/profile.jpg",
        nickName: "未授权用户"
      },
      extra:{
        trimmedNickName: "未授权用户",
        isOaBind : false
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: 'E 管家 Lite 版'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#398BEE'
    })
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          that.setData({
            "userInfo.extra.trimmedNickName": "已授权用户"
          })
          wx.getUserInfo({
            success: function (res) {
              that.setData({
                "userInfo.base": res.userInfo
              })
              if(res.userInfo.nickName.length > 9){
                that.setData({
                  "userInfo.extra.trimmedNickName": res.userInfo.nickName.substring(0, 9).concat("...")
                })
              }else{
                that.setData({
                  "userInfo.extra.trimmedNickName": res.userInfo.nickName
                })     
              }
            }
          })
        }
      }
    })
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
    if (wx.getStorageSync("USER") !== "") {
      console.log("I am in")
      this.setData({
        "userInfo.extra.isOaBind": true,
        "userInfo.extra.oaAccount": wx.getStorageSync("USER") + "@" + wx.getStorageSync("DEPT")
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