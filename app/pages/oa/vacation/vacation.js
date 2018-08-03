// pages/oa/vacation/vacation.js
import chiya from '../../../utils/utils.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    annualTime: "加载中...",
    overTime: "加载中..."
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '休假'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#FF6633'
    })

    // get current date
    var date = new Date();
    var year = date.getFullYear();
    var magicOffset = 1
    var month = (date.getMonth() + 1 - magicOffset < 10 ? '0' + (date.getMonth() + 1 - magicOffset) : date.getMonth() + 1 - magicOffset);
    var queryDateStr = year + "-" + month + "-01 00:00:00"
    var payload = {
      "startDate": queryDateStr
    }
    wx.showLoading({
      title: '休假信息加载中',
    })
    var that = this
    chiya.apiRequest("/getMobileHoliday", payload, function (response) {
      console.log(response)
      if (response.content.status === "success") {
        if (response.content.result.list.length > 0) {
          that.setData({
            "annualTime": response.content.result.list[0].annualTime,
            "overTime": response.content.result.list[0].overTime
          })
          wx.hideLoading()
        } else {
          wx.showToast({
            title: "休假信息尚未生成",
            icon: 'none',
            duration: 3000
          })
        }
      } else {
        wx.showToast({
          title: response.content.msg.msgContent,
          icon: 'none',
          duration: 3000
        })
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