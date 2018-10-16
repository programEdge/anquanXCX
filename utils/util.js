const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}

const API_URL = 'http://localhost:4424/api/'

function getApi(url, params) {
  return new Promise((res, rej) => {
    wx.request({
      url: API_URL + '/' + url,
      data: Object.assign({}, params),
      header: { 'Content-Type': 'application/json' },
      success: res,
      fail: rej
    })
  })
}
function json2Form(json) {
  var str = [];
    for (var p in json) { 
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
    }
  return str.join("&");
} 
module.exports = { 
  json2Form: json2Form,
}


module.exports = {
  GetByParams(url, page = 1, pageSize = 20, search = '') {
    const params = { start: (page - 1) * pageSize, pageSize: pageSize }
    return getApi(url, search ? Object.assign(params, { q: search }) : params)
      .then(res => res.data)
  },
  GetById(url, id) {
    return getApi(url, id)
      .then(res => res.data)
  }
}
