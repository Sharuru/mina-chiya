// pages/oa/salary/salary.js
import chiya from '../../../utils/utils.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
      salary: {},
      salaryLst : {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '薪资'
    })
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#FFEB3B'
    })
  
    // TOOO get salary info, use libs
    // get current date
    var date = new Date();
    var magicOffset = 1;
    // offset fetching month
    date.setMonth(date.getMonth() - magicOffset);
    // date string
    var year = date.getFullYear();
    var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    var queryDateStr = year + "-" + month + "-01 00:00:00"
    var payload = {
      "startDate" : queryDateStr
    }
    wx.showLoading({
      title: '薪资信息加载中',
    })
    var that = this
    chiya.apiRequest("/getMobileSalary", payload, function (response) {
      console.log(response)
      if (response.content.status === "success") {
        if(response.content.result.list.length > 0){
          that.setData({
            "salary": response.content.result.list[0],
            "salaryLst" : response.content.result.list
          })
          wx.hideLoading()
        }else{
          wx.showToast({
            title: "薪资信息尚未生成",
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