// pages/UploadProblem/main/index.js
const db = wx.cloud.database()
const app = getApp()
const utils = require('../../../utils/utils.js');
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
    var id = 0
    var that = this
    if (id == 0) {
      var temp_arr = {
        FDMC:'',
        FDBH:0,
        ZXR:app.globalData.userData.name,
        DATE:'-',
        GQ_JE: 0,
        YGQ_JE: 0,
        DS_JE: 0,
        LIST: [
          {
            BARCODE:'',
            NAME:'',

            GQ_SL:0,
            GQ_DATE: utils.formatDateTime('YY-mm-dd',new Date()),
            GQ_JE:0,

            YGQ_SL:0,
            YGQ_DATE: utils.formatDateTime('YY-mm-dd',new Date()),
            YGQ_JE:0,

            DS_SL:0,
            DS_JE:0,

            UPLOADLDATE:''


          }
        ]

      }
      that.setData({
        arr: temp_arr
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