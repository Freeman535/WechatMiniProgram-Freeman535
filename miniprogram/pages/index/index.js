const db = wx.cloud.database()
const app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    rName : '',
    rPhone: '',
    rBz :''
  },
  onLoad() {
    var that = this
    if (wx.getUserProfile) {
      // 动态加载
      wx.showLoading({
        title: '加载中',
        mask:true
      })

      this.setData({
        canIUseGetUserProfile: true
      })

      // 通过云函数获取openid 
      wx.cloud.callFunction({
        name:'login',
        data:{},
      }).then(res => {
        console.log('用户openid为：' + res.result.openid)
        var data1 = new Array()
        app.globalData.userData = data1
        app.globalData.userData['OpenID'] = res.result.openid
        that.ifCanWeUse(res.result.openid)
        // 通过函数判断openid在小程序中到类型
      })
    }
  },

  ifCanWeUse(openid) {
    var that =this
    db.collection('UserOpenID').where({
      'openid': openid
    })
    .get({
      success: function(res) {
        // res.data 是包含以上定义的两条记录的数组
        if (res.data.length > 0){
          // 用户信息全局化
          app.globalData.userData['Grade'] = res.data[0]['Grade']
          app.globalData.userData['name'] = res.data[0]['name']
          app.globalData.userData['phonenumber'] = res.data[0]['phonenumber']
          app.globalData.userData['quyu'] = res.data[0]['quyu']
          app.globalData.userData['shopcode'] = res.data[0]['shopcode']
          
          // 这里是有信息的，直接进入主程序
          wx.navigateTo({
            url: '../personal/index',
          })
        }else{
          // 这里是没有信息的，再判断是不是已经申请，或没申请。
          that.getUserPermissions()
        }
      }
    })
  },

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },

  getUserPermissions(){
    db.collection('apply').where({
      'openid': app.globalData.userData['OpenID']
    })
    .get({
      success: function(res) {
        if (res.data.length > 0){
          // 说明已经申请过，跳出申请的时间即可，提示页面。
          wx.navigateTo({
            url: 'tip/index',
          })
        }else{
          // 之前没申请过，重新申请
          wx.hideLoading({
            success: (res) => {},
          })
        }
      }
    })
  },

  DBGetUserInfo(e){
    console.log(this.data.rName,this.data.rPhone,this.data.rBz,)
    if (this.data.rName != '' && this.data.rPhone != '' && this.data.rBz != ''){
      // 向数据库添加信息待审批


    }else{
      wx.showModal({
        title: '提示',
        content: '请把信息填全！',
        showCancel:false,
        success (res) {
        }
      })
    }
  },
  bindKeyInput: function (e) {
    if (e.target.id == 'name'){
      this.setData({
        rName: e.detail.value
      })
    }else if(e.target.id == 'phonenumber'){
      this.setData({
        rPhone: e.detail.value
      })
    }else{
      this.setData({
        rBz: e.detail.value
      })
    }
  },
})