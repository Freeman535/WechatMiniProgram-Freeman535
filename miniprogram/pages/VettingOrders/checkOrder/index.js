// pages/VettingOrders/checkOrder/index.js
const db = wx.cloud.database()
const app = getApp()
const _ = db.command
const utils = require('../../../utils/utils.js');
const QRCode = require('../../../utils/weapp-qrcode.js')
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
    var that = this
    this.setData({
      id : options.id
    })
    db.collection('OrderRequest').doc(this.data.id).get({
      success: function(res) {
        // res.data 包含该记录的数据
        that.dataSet(res.data)
      }
    })
  },

  async dataSet(s){
    var that = this
    var item = s
    console.log(item)
    for(var i in item.item.Items){

      await new Promise ((resolve,reject) =>{
        that.returnJhj(item.item.Items[i]['BARCODE']).then(res => {
          item.item.Items[i]['CK'] = res
          if(Number(res) != Number(item.item.Items[i]['JHDJ_HS'])){
            item.item.Items[i]['COLOR'] = 'red'
          }
          that.setData({
            item: item
          })
          resolve (0)
          // console.log()
        })
      })
      that.setData({
        item: item
      })
    }
    that.setData({
      item: item
    })

  },

  // 进货单价修改
  jhdjchange(e){
    console.log(e)
    var val = parseFloat(e.detail.value)
    var id = e.currentTarget.dataset.id
    var tempitem = this.data.item
    tempitem.item.Items[id]['JHDJ_HS'] = String(val)
    tempitem.item.Items[id]['JHDJ_BHS'] = String((val/1.13).toFixed(2))
    this.setData({
      item:tempitem
    })
  },
  // 商品件数修改
  spjschange(e){
    console.log(e)
    var val = parseInt(e.detail.value)
    var id = e.currentTarget.dataset.id
    var tempitem = this.data.item
    tempitem.item.Items[id]['SPJS'] = String(val)
    tempitem.item.Items[id]['SPXS'] = String(val * tempitem.item.Items[id]['BZHL'])
    tempitem.item.Items[id]['SHSL'] = String(val * tempitem.item.Items[id]['BZHL'])
    this.setData({
      item:tempitem
    })
  },
  // 删除单条
  delsingle(e){
    var that = this
    console.log(e)
    var id = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '是否删除此行？',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          var tempitem = that.data.item
          tempitem.item.Items.splice(id,1)
          that.setData({
            item:tempitem
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 检查
  check(){
    var that = this
    var tempitem = this.data.item
    for (var i in tempitem.item.Items){
      if (parseFloat(tempitem.item.Items[i]['JHDJ_HS']) == 0 || parseFloat(tempitem.item.Items[i]['JHDJ_HS']) != tempitem.item.Items[i]['JHDJ_HS_OLD']){
        tempitem.item.Items[i]['COLOR'] = 'red'
      }
      if ((tempitem.item.Items[i]['SPJS'] == 0)){
        tempitem.item.Items[i]['COLOR'] = 'red'
      }
      that.dataSet({
        item :tempitem
      })
    }
    this.setData({
      item: tempitem
    })

  },
    // 删除此单
  del_id(){
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否删除本单据所有内容。',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          db.collection('OrderRequest').doc(that.data.id).remove({
            success: function(res) {
              console.log(res.data)
              wx.redirectTo({
                url: '../../VettingOrders/index'
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  // 提交申请
  postid(){
    var that = this
    var tempitems = this.data.item.item.Items
    wx.showModal({
      title: '提示',
      content: '是否提交？',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')

          for (var i in tempitems){
            delete tempitems[i]['CK']
            delete tempitems[i]['COLOR'] 
            delete tempitems[i]['NAME'] 
          }
          var data = {
            'STATUS': '',
            'GHDWDM': '000376',
            'GHDWMC': '',
            'JLBH': '',
            'HSFS': '0',
            'HTH': '10004270',
            'DHRQ': utils.formatDateTime('YY-mm-dd', new Date()),
            'YYSJ': utils.formatDateTime('YY-mm-dd', new Date()),
            'YXQ_S': utils.formatDateTime('YY-mm-dd', new Date()),
            'YXQ_E': utils.formatDateTime('YY-mm-dd', new Date(new Date().setMonth(new Date().getMonth()+1))),
            'FDBH': String(that.data.item.item.FDBH),
            'SPFL': String(that.data.item.item.SPFL),
            'BMDM': '98010101',
            'JHDFS':'1',
            'YWY':'',
            'YWYDH':'',
            'BZ':'',
            'Items': JSON.stringify(tempitems)
          }
          console.log(data)
          wx.request({
            url: 'https://lgb.oywanhao.com/bmcporasrv/prod/v1/cod/dhdsqd/saveSqdDH',
            method: "POST",
            header: {
              'Host': 'lgb.oywanhao.com',
              'Accept': 'application/json, text/javascript, */*; q=0.01',
              'Content-Type': 'application/json;charset=utf-8',
              'token': app.globalData.OyToken,
              'shopCode': ''
            },
            data: data,
            success(res){
              console.log(res)
              // 之后需要找 返回的单号，返回成功才能去数据库删除对应id

              wx.showModal({
                title: '提示',
                content: JSON.stringify(res),
                showCancel:false,
                success (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                    wx.redirectTo({
                      url: '../../VettingOrders/index'
                    })
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })

            }
          })




        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },



  returnJhj(code69){
    return new Promise((resolve, reject)=>{
      db.collection('pi').where({
        code69: code69
      })
      .get({
        success: function(res) {
          if(res.data.length > 0){
            var jhj = 0
            for (var i in res.data){
              if (res.data[i]['bid'] != 0 && jhj == 0){
                jhj = res.data[i]['bid']
              }else if(res.data[i]['bid'] != 0 && jhj != res.data[i]['bid']){
                
                wx.showModal({
                  title: '提示',
                  content:code69 + '数据库价格有问题！',
                  showCancel: false,
                  success (res) {
                    if (res.confirm) {
                      console.log('用户点击确定')
                    } else if (res.cancel) {
                      console.log('用户点击取消')
                    }
                  }
                })
                
                resolve(0)
              }
            }
            resolve(jhj)
          }else{
            
            resolve(0)
            
          }
        }
      })
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