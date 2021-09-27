// pages/oy/index.js
const db = wx.cloud.database()
const app = getApp()
const utils = require('../../utils/utils.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    verifycode: false,
    src: '', 
    arrList:[
        {
          pic:'../../images/OrderManagement.png',
          name:'1',
          gt: '../../pages/oy/index'
        },
        {
          pic:'../../images/OrderManagement.png',
          name:'1',
          gt: '../../pages/oy/index'
        }
      ],
    title: '欧亚工具集'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.setNavigationBarTitle({
      title: "欧亚工具集"
    })
    wx.hideHomeButton({
      success: (res) => {},
    })
    this.getToken()
  },

  get_chache(){
    var now = new Date();
    var uuid1 = '' + now.getDay() + now.getHours() + now.getMinutes() + now.getSeconds() + now.getMilliseconds() + Math.round(Math.random() * 10000);
    this.setData({
      uuid : uuid1,
      src : 'https://lgb.oywanhao.com/bmcporasrv/prod/auth/account/captcha.jpg?uuid=' + uuid1
    })
  },

  goToPage(event){
    wx.navigateTo({
      url: event.detail,
    })
  },
  
  postCode(event){
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var that = this
    console.log(event.detail)
    // 获取到验证码就可以登陆了
    utils.LgbaoLogin(app.globalData.OyUin, app.globalData.OyPw, event.detail, this.data.uuid).then(res => {
      wx.hideLoading({
      })
      if (res.meta.code == 200){
        // 验证码正确
        app.globalData.CanIUseOyToken = 1
        app.globalData.OyToken = res.data.token
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000,
          mask: false
        })
        db.collection('Token').doc('lgbao').update({
          // data 传入需要局部更新的数据
          data: {
            token: res.data.token
          },
          success: function(res) {
            console.log(res.data)
          }
        })
        that.setData({
          verifycode: false
        })
      }else{
        // 验证码错误
        wx.showToast({
          title: '验证码错误！',
          icon: 'error',
          duration: 2000,
          mask: false
        })
      }
    })
  },

  getToken: function () {
    var that = this
    if (app.globalData.CanIUseOyToken != 1){
      db.collection('Token').doc('lgbao').get({
        success: function(res) {
          var tempToken = res.data['token']
          app.globalData.OyUin = res.data['uin']
          app.globalData.OyPw = res.data['pw']
          // 判断token是否可以使用。
          utils.LgbaoChackToken(tempToken).then(res =>{
            if(res == 0){
              wx.hideLoading()
              //启用输入验证码获取
              that.setData({
                verifycode: true
              })
              that.get_chache()
            }else{
              wx.hideLoading()
              app.globalData.CanIUseOyToken = 1
              app.globalData.OyToken = tempToken
            }
            })
        }
      })
    }else{
      wx.hideLoading()
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.verify = this.selectComponent("#verifycode");
    this.menu = this.selectComponent('#menu')
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