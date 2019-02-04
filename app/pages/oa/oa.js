// pages/oa/oa.js
import chiya from '../../utils/utils.js'

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
    },
    userContext : {},
    showFunctionBlocks: false
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
    var that = this;
    if (wx.getStorageSync("_USER_CONTEXT") !== "") {
      var userContext = wx.getStorageSync("_USER_CONTEXT") 
      this.setData({
        "userContext": userContext,
        "userInfo.extra.isOaBind" : true,
        "userInfo.extra.oaAccount": userContext.name + "@" + userContext.orgName
      })
    }
    // TODO keep sessionId
    if (wx.getStorageSync("_USER_NAME") != "") {
      console.log("Requesting new sessionId")
      var payload = {
        userId: wx.getStorageSync("_USER_NAME"),
        password: wx.getStorageSync("_USER_PASS"),
        defaultorgId: "00001"
      }
      var existedLifetime = wx.getStorageSync("_SESSION_LIFETIME");
      if (existedLifetime != "") {
        var currentLifetime = + new Date();
        if (currentLifetime > existedLifetime + 1800 * 1000) {
          // 超过半小时，重新登录
          chiya.apiRequest("/login", payload, function (response) {
            if (response.content.status === "success") {
              wx.setStorageSync("_USER_CONTEXT", response.content.result)
              wx.setStorageSync("_SESSION_ID", response.content.result.sessionId)
              wx.setStorageSync("_SESSION_LIFETIME", + new Date());
              that.setData({
                "showFunctionBlocks": true
              })
              console.log("登录凭据刷新成功。")
            } else {
              that.setData({
                "showFunctionBlocks": false
              })
              wx.showToast({
                title: response.content.msg.msgContent,
                icon: 'none',
                duration: 3000
              })
            }
          })
        } else {
          that.setData({
            "showFunctionBlocks": true
          })
          console.log("使用缓存的登录凭据。")
        }
      } else {
        chiya.apiRequest("/login", payload, function (response) {
          if (response.content.status === "success") {
            wx.setStorageSync("_USER_CONTEXT", response.content.result)
            wx.setStorageSync("_SESSION_ID", response.content.result.sessionId)
            wx.setStorageSync("_SESSION_LIFETIME", + new Date());
            that.setData({
              "showFunctionBlocks": true
            })
            console.log("登录凭据创建成功。")
          } else {
            that.setData({
              "showFunctionBlocks": false
            })
            wx.showToast({
              title: response.content.msg.msgContent,
              icon: 'none',
              duration: 3000
            })
          }
        })
      }
    }
  },

  openOaSalary: chiya.throttle(function (e) {
    if (this.data.userInfo.extra.isOaBind) {
      wx.navigateTo({
        url: '/pages/oa/salary/salary',
      })
    } else {
      wx.showToast({
        title: '请先绑定 E 管家账户',
        icon: 'none',
        duration: 3000
      })
    }
  }),

  openOaVacation: chiya.throttle(function (e) {
    if (this.data.userInfo.extra.isOaBind) {
      wx.navigateTo({
        url: '/pages/oa/vacation/vacation',
      })
    } else {
      wx.showToast({
        title: '请先绑定 E 管家账户',
        icon: 'none',
        duration: 3000
      })
    }
  }),

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
