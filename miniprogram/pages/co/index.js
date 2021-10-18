
const db = wx.cloud.database()
const app = getApp()
const utils = require('../../utils/utils.js');
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

    wx.setNavigationBarTitle({
      title: "修改库存及进价（目前开发做订单MO）"
    })
    wx.hideHomeButton({
      success: (res) => {},
    })

    this.reSetPage()



  },

  /**
   * 页面初始化--初始载入--订单制作完成时触发 // 初始化返回列表为空
   */
  reSetPage(){
    var returnList = {
      storeName:'',
      ddh:'',
      dgyPhone:'',
      jsSum:'',
      jeSum:'',
      list:[
        // {
        //   BARCODE:'',
        //   CODE:'',
        //   NAME:'',
        //   GG:'',
        //   JS:'',
        //   XS:'',
        //   DDJ_IN:'',
        //   DDJ_OUT:'',
        //   XJ:'',
        //   JE_SUM:'',
        //   PP:'',
        //   PH:''
        // }
      ]
    }

    this.setData({
      returnList: returnList
    })

  },

  /**
   * 输入完订单号时触发
   * 采集门店名称、单号
   * 条码、细数、价格
   */

   ddhInputOver(e){
     var that = this
     var temp_backList = this.data.returnList
     utils.LgbaoGetOneDHD(e.detail.value).then(res =>{
      var getOne = res
      utils.LgbaoSearchDDMain(e.detail.value).then(res => {
        var getAll = res
        

        temp_backList['storeName'] = getOne['FDMC']
        temp_backList['ddh'] = getOne['JLBH']
        temp_backList['jsSum'] = 0
        temp_backList['jeSum'] = 0

        console.log(getOne, getAll)
      })
     })
     

  
   },


   /**
    * 导购员及联系方式栏修改
    */
   changePhone(e){

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