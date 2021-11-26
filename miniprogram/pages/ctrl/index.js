// pages/ctrl/index.js
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
    title: '内部工具集',
    menu_all: ['downDB', 'VettingOrders','ABOUT', 'ORDER', 'UM', 'InspectionReport', 'OY_Tools', 'personal', 'PIM']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "内部工具集"
    })
    wx.hideHomeButton({
      success: (res) => {},
    })
    db.collection('Token').doc('lgbao').get({
      success(res){
        app.globalData.OyToken = res.data['token']
        utils.LgbaoChackToken(app.globalData.OyToken).then(res =>{
          if(res == 0){
            wx.showModal({
              title: '提示',
              content: '欧亚lgbToken获取失败，页面即将跳转到欧亚界面。请输入完验证码手动返回到本页面即可。',
              showCancel: false,
              success(res){
                wx.navigateTo({
                  url: '../oy/index',
                })
              }
            })
          }else{
            utils.LgbaoGetFDH()
          }
          })
      }
    })
    var arrlist = utils.checkMenu(this.data.menu_all, 0)
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