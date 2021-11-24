// pages/UploadProblem/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showlist:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  callpage2(e){
    /**
     * 
     * 下一个页面判断FDBH就可以得出是否为新门店，new = 999 
     * 传给下一个页面的参数是
     * 
     * {
     *  FDMC:
     *  FDBH:
     *  DATE:
     *  ZXR:
     *  LIST:[{
     *    BARCODE:
     *    NAME:
     *    GQ_SL:
     *    GQ_DATE:
     *    YGQ_SL:
     *    YGQ_DATE:
     *    DS_SL:
     *    UPLOADDATE:
     * 
     * }]
     * }
     */
    wx.navigateTo({
      url: 'main/index?id=0',
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