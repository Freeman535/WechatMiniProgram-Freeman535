var all_menu = {
  'OY_DD':{
    pic:'../../images/OY_DD.png',
    name:'欧亚订单',
    gt: '../../pages/oy_dd/index'
  },
  'OY_JCD':{
    pic:'../../images/OY_JCD.png',
    name:'欧亚进仓单',
    gt: '../../pages/oy_jcd/index'
  },
  'OY_FCD':{
    pic:'../../images/OY_FCD.png',
    name:'欧亚返厂单',
    gt: '../../pages/oy_fcd/index'
  },
  'OY_BJD':{
    pic:'../../images/OY_BJD.png',
    name:'欧亚变价单',
    gt: '../../pages/oy_bjd/index'
  },
  'OY_SALE':{
    pic:'../../images/OY_SALE.png',
    name:'欧亚销售',
    gt: '../../pages/oy_sale/index'
  },
  'OY_FML':{
    pic:'../../images/OY_FLM.png',
    name:'欧亚负毛利',
    gt: '../../pages/oy_fml/index'
  },
  'OY_KC':{
    pic:'../../images/OY_KC.png',
    name:'欧亚库存',
    gt: '../../pages/oy_kc/index'
  },
  'QPD':{
    pic:'../../images/QPD.png',
    name:'全品单',
    gt: '../../pages/qpd/index'
  },

  'InspectionReport':{
    pic:'../../images/QPD.png',
    name:'质检报告',
    gt: '../../pages/inspectionreport/index'
  },
  'Public':{
    pic:'../../images/QPD.png',
    name:'特价公示',
    gt: '../../pages/publicS/index'
  },

  'ORDER':{
    pic:'../../images/MO.png',
    name:'销售单相关',
    gt: '../../pages/order/index'
  },
  'CO':{
    pic:'../../images/CO.png',
    name:'修改库存及进价',
    gt: '../../pages/co/index'
  },
  'UO':{
    pic:'../../images/UO.png',
    name:'上传长春库存',
    gt: '../../pages/uo/index'
  },
  'MO':{
    pic:'../../images/MO.png',
    name:'销售单制作',
    gt: '../../pages/mo/index'
  },
  'UM':{
    pic:'../../images/MO.png',
    name:'用户管理',
    gt: '../../pages/um/index'
  },
  'Application':{
    pic:'../../images/MO.png',
    name:'用户注册审批',
    gt: '../../pages/application/index'
  },
  'URM':{
    pic:'../../images/MO.png',
    name:'用户权限修改',
    gt: '../../pages/urm/index'
  },
  'OY_Tools':{
    pic:'../../images/MO.png',
    name:'欧亚工具',
    gt: '../../pages/oy_tools/index'
  },
  'OY_IfCodeInKC':{
    pic:'../../images/MO.png',
    name:'OY_IfCodeInKC',
    gt: '../../pages/oy_ifcodeinkc/index'
  },
  'OY_SaleUR':{
    pic:'../../images/MO.png',
    name:'OY_SaleUR',
    gt: '../../pages/oy_saleur/index'
  },
  'OY_DD2':{
    pic:'../../images/MO.png',
    name:'OY_DD2',
    gt: '../../pages/oy_dd2/index'
  },

  'OY_KC2':{
    pic:'../../images/MO.png',
    name:'OY_KC2',
    gt: '../../pages/oy_kc2/index'
  },
  'OY_SALE2':{
    pic:'../../images/MO.png',
    name:'OY_SALE2',
    gt: '../../pages/oy_sale2/index'
  },
  'OY_FML2':{
    pic:'../../images/MO.png',
    name:'OY_FML2',
    gt: '../../pages/oy_fml2/index'
  },
  'OY_ANA_KC':{
    pic:'../../images/MO.png',
    name:'OY_ANA_KC',
    gt: '../../pages/oy_ana_kc/index'
  },
  'personal':{
    pic:'../../images/Change.png',
    name:'切换身份',
    gt: '../../pages/personal/index'
  },
  'ABOUT':{
    pic:'../../images/about.png',
    name:'关于',
    gt: '../../pages/about/index'
  },

}

const app = getApp()

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

function checkMenu(USER_APPLICATION){

  var UA = new Array()
  for (var i in all_menu){
    
    // console.log(app.globalData.userData['auth'].indexOf(i))
    if (app.globalData.userData['auth'].indexOf(i) != -1){
      if (USER_APPLICATION.indexOf(i) != -1){
        UA.push(all_menu[i])
      }
      
    }
  }
  return (UA)

}



module.exports = {
  formatDateTime: FormaDatetime,
  'out':'in',
  LgbaoChackToken: LgbaoChackToken,
  LgbaoLogin: LgbaoLogin,
  checkMenu: checkMenu

}