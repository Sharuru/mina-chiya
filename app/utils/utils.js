import CONFIG from '../config.js'

function apiRequest(endpoint, payload, callback){
  wx.request({
    url: CONFIG.SERVER_URL + endpoint,
    data: payload,
    method: 'POST',
    header: {
      'CHIYA-ENDPOINT': CONFIG.ENDPOINT,
      'x-phone-userid': wx.getStorageSync("sessionId"),
      'content-type': 'application/json'
    },
    complete: function(response){
      callback && callback(response.data);
    }
  })
}

module.exports = {
  apiRequest: apiRequest
}
