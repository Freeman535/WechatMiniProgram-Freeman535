// pages/urm/index.js
const db = wx.cloud.database()
const app = getApp()
const _ = db.command
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
    index0: 0
    

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
  changeboxlist(e){
    var that = this
    console.log(e)
    if(e.currentTarget.dataset.id == 0){
      that.setData({
        PROP: e.detail.value
      })
    }else if(e.currentTarget.dataset.id == 1){
      that.setData({
        authority:e.detail.value
      })
    }
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
        authority: ['personal', 'OY_DD', 'OY_JCD', 'OY_FCD', 'OY_BJD', 'OY_SALE', 'OY_FML', 'OY_KC', 'QPD', 'InspectionReport', 'Public','ABOUT', 'ORDER','MO',]
      })
      that.reselist2()
    }else if(e.detail.value == 3){
      this.setData({
        dis0 :true
      })
      this.setData({
        PROP: ['oy', 'ctrl'],
        authority: ['OY_DD', 'OY_JCD', 'OY_FCD', 'OY_BJD', 'OY_SALE', 'OY_FML', 'OY_KC', 'QPD', 'InspectionReport', 'Public','ABOUT', 'ORDER',  'personal','MO','OY_Tools','OY_SALE2', 'OY_FML2']
      })
      that.reselist2()
    }else if(e.detail.value == 4){
      this.setData({
        dis0 :true
      })
      this.setData({
        PROP: ['oy', 'ctrl'],
        authority: ['OY_DD', 'OY_JCD', 'OY_FCD', 'OY_BJD', 'OY_SALE', 'OY_FML', 'OY_KC', 'QPD', 'ABOUT', 'InspectionReport', 'Public', 'ORDER',  'personal','MO','UO','OY_Tools','OY_SALE2', 'OY_FML2']
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

    for(var i in that.data.menus){
      var tempPROP = that.data.PROP
      if (that.data.menus[i]['checked'] == true){
        tempPROP.push(that.data.menus[i]['value'])
      }
    }

    for(var x in that.data.lists){
      var tempauthority = that.data.authority
      if (that.data.lists[x]['checked'] == true){
        tempauthority.push(that.data.lists[x]['value'])
      }
    }

    that.setData({
      PROP: tempPROP,
      authority: tempauthority
    })
    
  },
  checklist(){
    var that = this
    if (that.data.index0 == 0){

    }
    console.log('赋予' + that.data.array[that.data.index]['name'])
    console.log(that.data.PROP)
    console.log(that.data.authority)
    db.collection('userlist').doc(that.data.array[that.data.index]['_id']).update({
      // data 传入需要局部更新的数据
      data: {
        // 表示将 done 字段置为 true
        PROP: _.set(that.data.PROP),
        authority: _.set(that.data.authority)
      },
      success: function(res) {
        console.log(res.data)
        wx.showModal({
          title: '提示',
          content: '赋予:' + that.data.array[that.data.index]['name'] + '\n ' + that.data.PROP.toString() +  that.data.authority.toString(),
          showCancel:true,
          success (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              that.setData({
                showList:false,
                index0: 0
              })
              that.onLoad()
            }
          }
        })
        
        

      }
    })

    
  },

  delUser(){
    var that = this

    wx.showModal({
      title: '提示',
      content: '是否删除此用户',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          db.collection('userlist').doc(that.data.array[that.data.index]['_id']).remove({
            success: function(res) {
              console.log(res.data)
              wx.showToast({
                title: '成功',
                icon: 'success',
                duration: 2000
              })
              
              
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
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
    this.checkUser()
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