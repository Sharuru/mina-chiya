// pages/login/login.js
import md5 from '../../utils/md5.min.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    password: ""
  },
  usernameInput: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  oaAccountBind: function (e){
    console.debug("Login user");
    console.log("Stored username is:" + this.data.username);
    console.log("Stored password is:" + this.data.password);
    wx.request({
      url: "https://chiya.thefranxx.com/login", //仅为示例，并非真实的接口地址
      method: "POST",
      data: {
        userId: this.data.username,
        password: md5(this.data.password),
        defaultorgId: "00001"
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        if(res.data.status === "success"){
          wx.showToast({
            title: '绑定成功',
            icon: 'success',
            duration: 3000
          })
          wx.setStorageSync("USER", res.data.result.name)
          wx.setStorageSync("DEPT", res.data.result.orgName)
          wx.navigateBack()
        }else{
          wx.showToast({
            title: res.data.msg.msgContent,
            icon: 'none',
            duration: 3000
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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