// pages/login/login.js
import md5 from '../../utils/md5.min.js'
import chiya from '../../utils/utils.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    password: ""
  },
  usernameInput: function(e) {
    this.setData({
      username: e.detail.value
    })
  },
  passwordInput: function(e) {
    this.setData({
      password: e.detail.value
    })
  },
  oaAccountBind: function(e) {
    var payload = {
      userId: this.data.username,
      password: md5(this.data.password),
      defaultorgId: "00001"
    }
    chiya.apiRequest("/login", payload, function (response) {
      if (response.content.status === "success") {
        wx.showToast({
          title: '绑定成功',
          icon: 'success',
          duration: 3000
        })
        wx.setStorageSync("USER", response.content.result.name)
        wx.setStorageSync("DEPT", response.content.result.orgName)
        wx.navigateBack()
      } else {
        wx.showToast({
          title: response.content.msg.msgContent,
          icon: 'none',
          duration: 3000
        })
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: 'E 管家账户绑定'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#398BEE'
    })
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

  }
})