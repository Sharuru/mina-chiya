import CONFIG from '../config.js'

// API 请求的简单封装
function apiRequest(endpoint, payload, callback) {
  wx.request({
    url: CONFIG.SERVER_URL + endpoint,
    data: payload,
    method: 'POST',
    header: {
      'CHIYA-ENDPOINT': CONFIG.ENDPOINT,
      'x-phone-userid': wx.getStorageSync("sessionId"),
      'content-type': 'application/json'
    },
    complete: function(response) {
      console.debug(response.data);
      callback && callback(response.data);
    }
  })
}

// 节流函数
function throttle(func, gapTime) {
  if (gapTime == null || gapTime == undefined) {
    gapTime = 1500
  }

  let _lastTime = null

  // 返回新的函数
  return function() {
    let _nowTime = +new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      func.apply(this, arguments) //将this和参数传给原函数
      _lastTime = _nowTime
    }
  }
}

module.exports = {
  apiRequest: apiRequest,
  throttle: throttle
}
