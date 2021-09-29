// pages/order/index.js
const db = wx.cloud.database()
const app = getApp()
const utils = require('../../utils/utils.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrList:[

    ],
    title: '欧亚工具',
    menu_all: ['OY_IfCodeInKC', 'OY_SaleUR', 'OY_DD2', 'OY_KC2', 'OY_SALE2', 'OY_FML2', 'OY_ANA_KC']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "欧亚工具"
    })
    wx.hideHomeButton({
      success: (res) => {},
    })
    var arrlist = utils.checkMenu(this.data.menu_all, 3)
    this.setData({
      arrList: arrlist
    })
  },
  goToPage(event){
    console.log(event.detail)
    if ((event.detail).indexOf('personal') == -1){
      wx.navigateTo({
        url: event.detail,
      })
    }else{
      wx.redirectTo({
        url: event.detail,
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