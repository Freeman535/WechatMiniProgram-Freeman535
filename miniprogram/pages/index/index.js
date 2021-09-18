const db = wx.cloud.database()
const app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
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
    wx.cloud.callFunction({
      name:'getAll',
      data:{
        name:'UserOpenID'
      }
    }).then(res =>{
      console.log(res)
      app.globalData.user_permissions = res.result.data
    }).catch(err =>{
      console.error(err)
    })
  },

  DBGetUserInfo(){
    this.getUserPermissions() // 获取数据库UserOpenID集合，并上传到全局变量user_permissions
  },

})