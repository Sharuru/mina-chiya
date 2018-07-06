// pages/login/login.js
import md5 from '../../utils/md5.min.js'
import chiya from '../../utils/utils.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isBinding: false,
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
  oaAccountBind: chiya.throttle(function(e) {
    var that = this

    this.setData({
      isBinding: true
    })

    var payload = {
      userId: this.data.username,
      password: md5(this.data.password),
      defaultorgId: "00001"
    }

    chiya.apiRequest("/login", payload, function(response) {
      if (response.content.status === "success") {
        wx.showToast({
          title: '绑定成功',
          icon: 'success',
          duration: 3000
        })
        wx.setStorageSync("_userContext", response.content.result)
        wx.navigateBack()
      } else {
        wx.showToast({
          title: response.content.msg.msgContent,
          icon: 'none',
          duration: 3000
        })
      }
      that.setData({
        isBinding: false
      })
    })


  }),
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
  }
})
