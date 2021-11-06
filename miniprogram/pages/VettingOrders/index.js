// pages/VettingOrders/index.js
const db = wx.cloud.database()
const app = getApp()
const _ = db.command
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
    var that = this


    wx.cloud.callFunction({
      name: 'getAll',
      data: {
        name: 'OrderRequest'
      },
      success(res){
        console.log()
        var backdata = res.result.data
        if (backdata.length > 0){
          that.setData({
            item: backdata
          })
        }else{
          wx.showToast({
            title: '查无结果',
            icon: 'error',
            duration: 2000
          })
        }
      }
    })

},

getmain(e){
  var idid = e.currentTarget.dataset.id
  wx.redirectTo({
    url: 'checkOrder/index?id=' + idid
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