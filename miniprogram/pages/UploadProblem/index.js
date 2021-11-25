// pages/UploadProblem/index.js
const db = wx.cloud.database()
const app = getApp()
const utils = require('../../utils/utils.js');
var dateTime = new Date()
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
    this.returnList()
  },

  returnList(){
    var that = this

    if(app.globalData.userData.OpenID == 'oXr805Y3UMz49YczL0-Hb4-FaihA'){

      console.log('管理员模式查看全部上传问题。')
      const _ = db.command
      db.collection('Problem').where({
        _openid: _.neq('')
      })
      .get({
        success: function(res) {
          // res.data 是包含以上定义的两条记录的数组
          console.log(res.data)
          if(res.data.length > 0){
            var list = []
            for (var i in res.data){
              var tempm = {
                id: res.data[i]['_id'],
                FDMC:res.data[i]['main']['FDMC'],
                ZXR:res.data[i]['main']['ZXR'],
                GQ_JE:res.data[i]['main']['GQ_JE'],
                DS_JE:res.data[i]['main']['DS_JE'],
                YGQ_JE:res.data[i]['main']['YGQ_JE'],
                DATE:res.data[i]['main']['DATE']
              }
              list.push(tempm)
              that.setData({list: list, showlist:false})
            }
          }
        }
      })
    }else{
      db.collection('Problem').where({
        _openid: app.globalData.userData.OpenID
      })
      .get({
        success: function(res) {
          // res.data 是包含以上定义的两条记录的数组
          console.log(res.data)
          if(res.data.length > 0){
            var list = []
            for (var i in res.data){
              var tempm = {
                id: res.data[i]['_id'],
                FDMC:res.data[i]['main']['FDMC'],
                ZXR:res.data[i]['main']['ZXR'],
                GQ_JE:res.data[i]['main']['GQ_JE'],
                DS_JE:res.data[i]['main']['DS_JE'],
                YGQ_JE:res.data[i]['main']['YGQ_JE'],
                DATE:res.data[i]['main']['DATE']
              }
              list.push(tempm)
              that.setData({list: list, showlist:false})
            }
          }
        }
      })
    }
    

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
    console.log(e)
    var id = '0'
    id = e.currentTarget.dataset.id
    if (id == undefined){
      id = '0'
    }
    console.log(id)
    wx.navigateTo({
      url: 'main/index?id=' + id,
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