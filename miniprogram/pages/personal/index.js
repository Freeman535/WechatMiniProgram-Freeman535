// pages/personal/index.js
const db = wx.cloud.database()
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list_PROP : {"ctrl":"内部工具集","oy":"欧亚工具集"}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "请选择操作平台"
    })
    wx.hideHomeButton({
      success: (res) => {},
    })
    app.globalData.NowDate = this.getNowFormatDate()
    this.setData({
      ud:app.globalData['userData']['PROP'],
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getNowFormatDate: function() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
  },

  GoTo: function(e){
    console.log(e)
    if (e.target['dataset']['prop'] == 'oy'){
      wx.redirectTo({
        url: '../oy/index',
      })
    }else if(e.target['dataset']['prop'] == 'ctrl'){
      wx.redirectTo({
        url: '../ctrl/index',
      })
    }
  },

  cleanPROP: function(){

    if (app.globalData['userData']['PROP'].length = 1){
      // 如果就为一个，则直接进入，后续可加多项
      if (app.globalData['userData']['PROP'][0] == 'oy'){
        wx.navigateTo({
          url: '../oy/index',
        })
      }
    }

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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