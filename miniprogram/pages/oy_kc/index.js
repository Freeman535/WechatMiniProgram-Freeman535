// pages/oy_kc/index.js
const db = wx.cloud.database()
const app = getApp()
const utils = require('../../utils/utils.js');
const QRCode = require('../../utils/weapp-qrcode.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.setNavigationBarTitle({
      title: "欧亚库存"
    })
    var dateTime = new Date()
    var ndt = utils.formatDateTime('YY-mm-dd', new Date(dateTime.setDate(dateTime.getDate()-1)))
    this.setData({
      fdarray: app.globalData.OyFDH,
      nowdate: ndt,
      canSearch: 0,
      back: 6,
      useS_RQ: false,
      useE_RQ: false,
      useDH: false,
      use69CODE: true,
      useCODE:true,
      useNAME:true
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