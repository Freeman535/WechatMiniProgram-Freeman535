// pages/UpOrder/index.js
const db = wx.cloud.database()
const app = getApp()
const utils = require('../../utils/utils.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fdbh_in: 0,
    listnum:0,
    check: true,
    radioItems: [
      {name: '洗涤', value: '0307', checked: 'true'},
      {name: '洗护', value: '0308'}
    ],
    item:{
      SPFL: '0307',
      FDBH:'-10',
      Items:[{
        BARCODE:'', // 商品69码 str
        SP_ID:0, //商品id int
        SPCODE:'', // 编码 str
        BZHL:0, // 包装含量 int
        JHDJ_HS:'',  // 含税进货价 str
        JHDJ_BHS:'',  // 含税进货价 str
        JHDJ_HS_OLD:0,  // 含税进货价 INT
        JHDJ_BHS_OLD:0,  // 含税进货价 INT
        SPJS:'', // 件数 str
        NAME:'', // 名称 不上传
        SPXS:'', // 细数 str
        JXSL:0, //税率 int
        SPWKSL:0, //物扣数量 int
        BZ:'', // STR
        JHSL:0 , // INT
        SHSL:'' //审核数量 str
      }]
    }

    
  },

  radioChange(e) {
    const checked = e.detail.value
    const changed = {}
    var tempitem = this.data.item
    for (let i = 0; i < this.data.radioItems.length; i++) {
      if (checked.indexOf(this.data.radioItems[i].name) !== -1) {
        changed['radioItems[' + i + '].checked'] = true
        tempitem['SPFL'] = this.data.radioItems[i].value
        tempitem['Items'] = [{
          BARCODE:'', // 商品69码 str
          SP_ID:0, //商品id int
          SPCODE:'', // 编码 str
          BZHL:0, // 包装含量 int
          JHDJ_HS:'',  // 含税进货价 str
          JHDJ_BHS:'',  // 含税进货价 str
          JHDJ_HS_OLD:0,  // 含税进货价 INT
          JHDJ_BHS_OLD:0,  // 含税进货价 INT
          SPJS:'', // 件数 str
          NAME:'', // 名称 不上传
          SPXS:'', // 细数 str
          JXSL:0, //税率 int
          SPWKSL:0, //物扣数量 int
          BZ:'', // STR
          JHSL:0 , // INT
          SHSL:'' //审核数量 str
        }]
      } else {
        changed['radioItems[' + i + '].checked'] = false
      }
    }
    this.setData(changed)
    this.setData({
      item: tempitem,
      listnum:0,
      check: true,
    })
  },

  checkStore(e){
    console.log(e)
    var temp_fdbh_in = e.detail.value
    var tempitem = this.data.item
    tempitem['FDBH'] = String(this.data.fdarray[temp_fdbh_in]['FDBH'])
    tempitem['Items'] = [{
      BARCODE:'', // 商品69码 str
      SP_ID:0, //商品id int
      SPCODE:'', // 编码 str
      BZHL:0, // 包装含量 int
      JHDJ_HS:'',  // 含税进货价 str
      JHDJ_BHS:'',  // 含税进货价 str
      JHDJ_HS_OLD:0,  // 含税进货价 INT
      JHDJ_BHS_OLD:0,  // 含税进货价 INT
      SPJS:'', // 件数 str
      NAME:'', // 名称 不上传
      SPXS:'', // 细数 str
      JXSL:0, //税率 int
      SPWKSL:0, //物扣数量 int
      BZ:'', // STR
      JHSL:0 , // INT
      SHSL:'' //审核数量 str
    }]
    this.setData({
      fdbh_in:temp_fdbh_in,
      item: tempitem,
      listnum:0,
      check: true,
    })
  },

  bindKeyInputcode(e){
    this.setData({
      codevalue: e.detail.value,
      check: true,
    })
  },
  bindInputcode(){
    var that = this
    for(var i in this.data.item.Items){
      if (this.data.item.Items[i]['BARCODE'] != that.data.codevalue){
        wx.request({
          url: 'https://lgb.oywanhao.com/bmcporasrv/prod/v1/cod/dhdsqd/queryOneByTM',
          header:{
            'Host': 'lgb.oywanhao.com',
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Content-Type': 'application/json;charset=utf-8',
            'token': app.globalData.OyToken,
            'shopCode': ''
          },
          method: "POST",
          data: {"BARCODE":String(that.data.codevalue),"HTH":"10004270","FDBH":String(that.data.item['FDBH']),"SPFL":String(that.data.item['SPFL'])},
          success(res){
            var res = res
            that.setData({
              codevalue:''
            })
            console.log(res.data)
            if (res.data.meta.code != 200){
              wx.showModal({
                title: '提示',
                content: res.data.meta.msg,
                success (res) {
                }
              })
              that.setData({
                item: that.data.item
              })
            }else{
         
              var tempitem = that.data.item
              var templist = {

                BARCODE:res.data.data.data['BARCODE'], // 商品69码 str
                SP_ID:res.data.data.data['SP_ID'], //商品id int
                SPCODE:res.data.data.data['SPCODE'], // 编码 str
                BZHL:res.data.data.data['BZHL_DH'], // 包装含量 int
                JHDJ_HS:String(res.data.data.data['JHDJ_HS']),  // 含税进货价 str
                JHDJ_BHS:String(res.data.data.data['JHDJ_BHS']),  // 含税进货价 str
                JHDJ_HS_OLD:res.data.data.data['JHDJ_HS'],  // 含税进货价 INT
                JHDJ_BHS_OLD:res.data.data.data['JHDJ_BHS'],  // 含税进货价 INT
                SPJS:'', // 件数 str
                NAME:res.data.data.data['NAME'], // 名称 不上传
                SPXS:'', // 细数 str
                JXSL:res.data.data.data['JXSL'], //税率 int
                SPWKSL:0, //物扣数量 int
                BZ:'', // STR
                JHSL:0 , // INT
                SHSL:'', //审核数量 str 同 spxs

              }
              tempitem.Items.unshift(templist)
              that.setData({
                item: tempitem,
                check: true,
              })
              
            }
          }
        })
      }else{
        wx.showModal({
          title: '提示',
          content: '此条码已添加过！',
          success (res) {
          }
        })
      }
      break
    }
    
  },


  bindInputjs(e){
    var value = parseInt(e.detail.value)
    var id = e.target.dataset.id
    var tempitem = this.data.item
    tempitem['Items'][id]['SPJS'] = String(value)
    tempitem['Items'][id]['SPXS'] = String(parseInt(value * tempitem['Items'][id]['BZHL']))
    tempitem['Items'][id]['SHSL'] = String(parseInt(value * tempitem['Items'][id]['BZHL']))
    this.setData({
      item: tempitem,
      check: true,
    })
  },

  delInput(e){
    var that = this
    var id = e.target.dataset.id
    var tempitem = this.data.item
    if ((id+1) == tempitem.Items.length){
      wx.showModal({
        title: '提示',
        content: '此行不能删除！',
        success (res) {
        }
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '确定删除此行？',
        success (res) {
          if (res.confirm) {
            tempitem.Items.splice(id,1)
          }
          that.setData({
            item: tempitem,
            check: true,
          })
        }
      })
    }
  },

  bindInputjhdj(e){
    var value = Number(e.detail.value).toFixed(2)
    var id = e.target.dataset.id
    var tempitem = this.data.item
    tempitem.Items[id]['JHDJ_HS'] = String(value)
    tempitem.Items[id]['JHDJ_BHS'] = String(Number(value/(1+tempitem.Items[id]['JXSL'])).toFixed(2))

    this.setData({
      item: tempitem,
      check: true,
    })
  },
  btncheck(){
    var tempitem = this.data.item
    var tempc = true
    if ( tempitem.Items.length > 1){
      for( var i in tempitem.Items){
        if ( i != (tempitem.Items.length - 1) ){
          
        if(tempitem.Items[i]['JHDJ_HS'] == '' || tempitem.Items[i]['SPJS'] == '' || tempitem.Items[i]['SPJS'] == 'NaN'){
          wx.showModal({
            title: '提示',
            content: '第 ' + String(i+1) + ' 行有错误。进货单价不能为空、件数不能为空或NaN',
            success (res) {
            }
          })
          break
        }
      }else{
        this.setData({
          check:false
        })
      }
      }
    }


  },

  postitems(){
    var tempitem = this.data.item
    tempitem['Items'].pop()
    console.log(tempitem)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      fdarray:app.globalData.OyFDH
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