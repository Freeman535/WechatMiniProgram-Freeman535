// pages/qpd/viewList/index.js
const db = wx.cloud.database()
const app = getApp()

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
    console.log(options)
    if (options.tjbz!= '' && options.tjjh != ''){
      var tjjh = JSON.parse(options.tjjh)
      var tjbz = JSON.parse(options.tjbz)
      this.setData({
        tjjh: tjjh,
        tjbz: tjbz
      })
    }

    var temp = JSON.parse(options.model)
    this.setData({
      tempList: temp
    })
  },

  preview(event) {
    console.log(event)
    let currentUrl = event.currentTarget.dataset.src
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: [currentUrl,currentUrl] // 需要预览的图片http链接列表
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