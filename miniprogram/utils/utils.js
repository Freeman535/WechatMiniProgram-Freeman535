function FormaDatetime(fmt, date){
  let ret;
  const opt = {
    "Y+": date.getFullYear().toString(),        // 年
    "m+": (date.getMonth() + 1).toString(),     // 月
    "d+": date.getDate().toString(),            // 日
    "H+": date.getHours().toString(),           // 时
    "M+": date.getMinutes().toString(),         // 分
    "S+": date.getSeconds().toString()          // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
        fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
    };
  };
  return fmt;
}

function LgbaoChackToken(token){
  return new Promise((resolve, reject)=>{
    wx.request({
      url: 'https://lgb.oywanhao.com/bmcporasrv/prod/system/comm/menu/getWldwSysMenuId',
      method:"POST",
      header:{
        'Host': 'lgb.oywanhao.com',
        'Connection': 'keep-alive',
        'Content-Length': 0,
        'Accept': '*/*',
        'X-Requested-With': 'XMLHttpRequest',
        'shopCode': '',
        'token': token,
        'Origin': 'https://lgb.oywanhao.com',
        'Referer': 'https://lgb.oywanhao.com/ghsBase/process/Login/oy_index.html',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
      },
      success (res) {
        if ( res['statusCode'] != 200){
          resolve(0)
        }else{
          resolve(1)
        }
      }
    })
  })
}

function LgbaoLogin(uin, pw, chache, uuid){
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'https://lgb.oywanhao.com/bmcporasrv/prod/auth/account/ghsLogin',
      data:{"userName":uin,"password":pw,"captcha":chache,"ip":"","uuid":uuid},
      header:{'Content-Type':'application/json'},
      method:"POST",
      fail (res){
        resolve(res.data)
      },
      success (res){
        resolve(res.data)
      }
    })
  })
}



module.exports = {
  formatDateTime: FormaDatetime,
  'out':'in',
  LgbaoChackToken: LgbaoChackToken,
  LgbaoLogin: LgbaoLogin
}