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
      {value: 'ctrl', name: '内部工具集'},
      {value: 'oy', name: '欧亚工具集'},
    ],
    showList:false,
    rangelb: [
      {value: 'nnnn', name:'无', checked: 'true'},
      {value: 'OYDGY', name:'欧亚导购员'},
      {value: 'CSJL', name:'超市经理'},
      {value: 'XTFZR', name:'系统负责人'},
      {value: 'ZDJL', name:'内勤/终端经理'},
      {value: 'ADMIN', name:'管理员'}
    ],
    lists: [
      {value: 'OY_DD', name: '欧亚订单'},
      {value: 'OY_JCD', name: '欧亚进仓单'},
      {value: 'OY_FCD', name: '欧亚反厂单'},
      {value: 'OY_BJD', name: '欧亚变价单'},
      {value: 'OY_SALE', name: '欧亚销售'},
      {value: 'OY_FML', name: '欧亚负毛利'},
      {value: 'OY_KC', name: '欧亚库存'},
      {value: 'QPD', name: '全品单'},
      {value: 'ABOUT', name: '关于'},
      {value: 'MO', name: '制作订单'},
      {value: 'UO', name: '上传长春库存'},
      {value: 'CO', name: '库存变动'},
      {value: 'ORDER', name: '销售单相关'},
      {value: 'UM', name: '用户管理'},
      {value: 'Application', name: '用户注册审批'},
      {value: 'URM', name: '用户权限修改'},
      {value: 'InspectionReport', name: '质检报告'},
      {value: 'Public', name: '特价公示'},
      {value: 'OY_Tools', name: '欧亚工具（内）'},
      {value: 'OY_IfCodeInKC', name: 'OY_IfCodeInKC'},
      {value: 'OY_SaleUR', name: 'OY_SaleUR'},
      {value: 'OY_DD2', name: 'OY_DD2'},
      {value: 'OY_KC2', name: 'OY_KC2'},
      {value: 'OY_SALE2', name: 'OY_SALE2'},
      {value: 'OY_FML2', name: 'OY_FML2'},
      {value: 'OY_ANA_KC', name: 'OY_ANA_KC'},
      {value: 'personal', name: '请选择操作平台'},
      {value: 'PIM', name: '商品信息管理'}
    ],
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    
    this.getList()
    this.setData({
      PROP: new Array(),
      authority: new Array()
    })
    

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

  bindPc(e){
    var that = this
    console.log(e)
    this.setData({
      index0:e.detail.value
    })
    if (e.detail.value == 0){
      this.setData({
        dis0 :false
      })
      this.reselist()
    }else if(e.detail.value == 1){
      this.setData({
        dis0 :true
      })
      this.setData({
        PROP: ['oy'],
        authority: ['personal', 'OY_DD', 'OY_JCD', 'OY_FCD', 'OY_BJD', 'OY_SALE', 'OY_FML', 'OY_KC', 'QPD', 'ABOUT', 'InspectionReport', 'Public']
      })
      that.reselist2()
    }else if(e.detail.value == 2){
      this.setData({
        dis0 :true
      })
      this.setData({
        PROP: ['oy', 'ctrl'],
        authority: ['personal', 'OY_DD', 'OY_JCD', 'OY_FCD', 'OY_BJD', 'OY_SALE', 'OY_FML', 'OY_KC', 'QPD', 'ABOUT', 'InspectionReport', 'Public','ABOUT', 'ORDER',  'personal','MO',]
      })
      that.reselist2()
    }else if(e.detail.value == 3){
      this.setData({
        dis0 :true
      })
      this.setData({
        PROP: ['oy', 'ctrl'],
        authority: ['personal', 'OY_DD', 'OY_JCD', 'OY_FCD', 'OY_BJD', 'OY_SALE', 'OY_FML', 'OY_KC', 'QPD', 'ABOUT', 'InspectionReport', 'Public','ABOUT', 'ORDER',  'personal','MO','OY_Tools','OY_SALE2', 'OY_FML2']
      })
      that.reselist2()
    }else if(e.detail.value == 4){
      this.setData({
        dis0 :true
      })
      this.setData({
        PROP: ['oy', 'ctrl'],
        authority: ['personal', 'OY_DD', 'OY_JCD', 'OY_FCD', 'OY_BJD', 'OY_SALE', 'OY_FML', 'OY_KC', 'QPD', 'ABOUT', 'InspectionReport', 'Public','ABOUT', 'ORDER',  'personal','MO','UO','OY_Tools','OY_SALE2', 'OY_FML2']
      })
      that.reselist2()
    }
  },

  reselist(){
    var that = this
    this.setData({
      PROP: new Array(),
      authority: new Array()
    })


    var menus_temp = that.data.menus
    for (var i in menus_temp){
      if(that.data.array[that.data.index]['PROP'].includes(menus_temp[i]['value'])){
        menus_temp[i]['checked'] = true
      }else{
        menus_temp[i]['checked'] = false
      }
    }
    this.setData({
      menus:menus_temp
    })


    var lists_temp = that.data.lists
    for (var i in lists_temp){
      if(that.data.array[that.data.index]['authority'].includes(lists_temp[i]['value'])){
        lists_temp[i]['checked'] = true
      }else{
        lists_temp[i]['checked'] = false
      }
    }
    this.setData({
      lists:lists_temp
    })
    
  },

  reselist2(){
    var that = this
    
    var menus_temp = that.data.menus
    for (var i in menus_temp){
      if(that.data['PROP'].includes(menus_temp[i]['value'])){
        menus_temp[i]['checked'] = true
      }else{
        menus_temp[i]['checked'] = false
      }
    }
    this.setData({
      menus:menus_temp
    })


    var lists_temp = that.data.lists
    for (var i in lists_temp){
      if(that.data['authority'].includes(lists_temp[i]['value'])){
        lists_temp[i]['checked'] = true
      }else{
        lists_temp[i]['checked'] = false
      }
    }
    this.setData({
      lists:lists_temp
    })
  },

  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', this.data.array[e.detail.value]['name'])
    this.setData({
      index: e.detail.value,
      showList:false
    })
  },

  checkUser(){

    this.setData({
      showList:true
    })
    this.reselist()
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