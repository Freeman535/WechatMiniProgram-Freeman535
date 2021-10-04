// miniprogram/pages/search_2/search_2.js
const db = wx.cloud.database()
const app = getApp()
const utils = require('../../utils/utils.js');
const QRCode = require('../../utils/weapp-qrcode.js')
let qrcode
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qrh: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      back:options.back
    })
    var that = this
    console.log(options)
    if (options.back == '0'){
      var qrcode = new QRCode('canvas', {
        // usingIn: this,
        text: options.dhd,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
    });
      utils.LgbaoSearchDDMain(options.dhd).then(res => {
        console.log(res)
        var res1 = res
        res1.unshift({BARCODE:'条码',NAME:'名称', JHDJ_HS:'含税进货单价', SPXS:'数量'})
        that.setData({
          qrh: false,
          backList : res1,
          dhd: options.dhd
        })
      })
    }else if(options.back == 1){

      utils.LgbaoSearchJCDMain(options.dhd).then(res => {
        console.log(res)
        var res1 = res
        res1.unshift({BARCODE:'条码',NAME:'名称', JHDJ_HS:'含税进货单价', SPXS:'数量', RKXS:'入库系数'})
        that.setData({
          backList : res1,
          dhd: options.dhd
        })
      })

    }else if(options.back == 2){

      utils.LgbaoSearchFCDMain(options.dhd).then(res => {
        console.log(res)
        var res1 = res
        res1.unshift({BARCODE:'条码',NAME:'名称', JSHJ:'含税退货金额', THSL:'退货数量', RKXS:'入库系数'})
        that.setData({
          backList : res1,
          dhd: options.dhd
        })
      })

    }else if(options.back == 3){

      utils.LgbaoSearchBJDMain(options.dhd).then(res => {
        console.log(res)
        var res1 = res.list
        // res1.unshift({BARCODE:'条码',NAME:'名称', JSHJ:'含税退货金额', THSL:'退货数量', RKXS:'入库系数'})
        that.setData({
          backList : res1,
          dhd: options.dhd
        })
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