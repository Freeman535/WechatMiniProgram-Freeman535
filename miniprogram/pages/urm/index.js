// pages/urm/index.js
const db = wx.cloud.database()
const app = getApp()
const utils = require('../../utils/utils.js');
const QRCode = require('../../utils/weapp-qrcode.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menus:[
      {value: 'USA', name: '美国'},
      {value: 'CHN', name: '中国', checked: 'true'},
      {value: 'BRA', name: '巴西'},
      {value: 'JPN', name: '日本'},
      {value: 'ENG', name: '英国'},
      {value: 'FRA', name: '法国'}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    
    this.getList()

  },

  getList(){
    var that = this
    wx.cloud.callFunction({
      name: 'getAll',
      data: {
        name: 'userlist'
      },
      success(res){

        that.setData({
          array: res.result.data
        })
      }
    })
  },

  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', this.data.array[e.detail.value]['name'])
    this.setData({
      index: e.detail.value
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