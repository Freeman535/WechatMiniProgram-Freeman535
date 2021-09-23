// pages/oy/index.js
const db = wx.cloud.database()
const app = getApp()
const utils = require('../../utils/utils.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

    verifycode: false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.globalData.CanIUseOyToken = 0
    wx.setNavigationBarTitle({
      title: "欧亚工具集"
    })
    wx.hideHomeButton({
      success: (res) => {},
    })
    this.getToken()
  },

  getToken: function () {

    if (app.globalData.CanIUseOyToken == 0){
      db.collection('Token').doc('lgbao').get({
        success: function(res) {
          if (utils.LgbaoChackToken(res.data['token']) == 0){
            // 启用输入验证码获取
          }else{
            app.globalData.CanIUseOyToken = 1
            app.globalData.OyToken = res.data['token']
          }
        }
      })
    }

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