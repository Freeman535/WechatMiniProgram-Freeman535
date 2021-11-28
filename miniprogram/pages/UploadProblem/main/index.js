// pages/UploadProblem/main/index.js
const db = wx.cloud.database()
const app = getApp()
const utils = require('../../../utils/utils.js');
var dateTime = new Date()
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    dispost: true,
    todaydate: utils.formatDateTime('YY-mm-dd', new Date()),
    yearstoday : utils.formatDateTime('YY-mm-dd', new Date(dateTime.setDate(dateTime.getDate()-1)))

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      fdarray:app.globalData.OyFDH,
      id:options.id
    })
    var id = options.id
    var that = this
    /**
     * 如果id=0，表示新建订单，门店可选择，不可删除
     */
    if (id == 0) {
      var temp_arr = {
        FDMC:'',
        FDBH:0,
        ZXR:app.globalData.userData.name,
        DATE:'-',
        GQ_JE: 0,
        YGQ_JE: 0,
        DS_JE: 0,
        LIST: [
          {
            BARCODE:'',
            NAME:'',

            GQ_SL:0,
            GQ_DATE: utils.formatDateTime('YY-mm-dd',new Date()),
            GQ_JE:0,

            YGQ_SL:0,
            YGQ_DATE: utils.formatDateTime('YY-mm-dd',new Date()),
            YGQ_JE:0,

            DS_SL:0,
            DS_JE:0,

            UPLOADLDATE:''


          }
        ]

      }
      that.setData({
        arr: temp_arr,
        disdel:true
      })

    }else{
      that.setData({dispic:true})
      db.collection('Problem').doc(id).get({
        success: function(res) {
          // res.data 包含该记录的数据

          // that.setData({arr:res.data.main})
          that.resetlisthas(res.data.main)
        }
      })
    }

  },

  async resetlisthas(list){
    
    var that = this
    var tempfdbh = this.data.fdbh_in
    var kclist = await utils.LgbaoSearcKCList([list['FDBH'], this.data.yearstoday, '', '', '', '', ''])
    
    this.setData({kclist:kclist})

    var temparr = list
    temparr['DATE'] = this.data.todaydate
    temparr['DS_JE'] = 0
    temparr['GQ_JE'] = 0
    temparr['YGQ_JE'] = 0
    for( var i in temparr['LIST']){
      var tempmx =  await this.returnCodeMain2(temparr['LIST'][i]['BARCODE'])
      if (tempmx[2] == 0){
        temparr['LIST'][i]['ALL_JE'] = 0
        temparr['LIST'][i]['ALL_SL'] = 0
        temparr['LIST'][i]['UPLOADLDATE'] = that.data.todaydate
      }else{
        console.log(tempmx)
        temparr['LIST'][i]['ALL_JE'] = tempmx[3]
        temparr['LIST'][i]['ALL_SL'] = tempmx[2]
        temparr['LIST'][i]['UPLOADLDATE'] = that.data.todaydate
      }
    }

    that.setData({arr: temparr})


  },

  checkStore(e){
    console.log(e)
    var that = this
    var temp_fdbh_in = e.detail.value
    var tempitem = this.data.arr

    tempitem['FDBH'] = String(this.data.fdarray[temp_fdbh_in]['FDBH'])
    console.log(tempitem['FDBH'])
    tempitem['FDMC'] = this.data.fdarray[temp_fdbh_in]['FDMC']

    db.collection('Problem').where({
      FDBH: tempitem['FDBH']
    })
    .get({
      success: function(res) {
        // res.data 是包含以上定义的两条记录的数组
        console.log(res.data)
        if (res.data.length > 0){
          wx.showModal({
            title: '提示',
            content: '此门店已经由 ' + res.data[0]['main']['ZXR'] + ' 上传过，你不能再上传！如有疑问请联系管理员。',
            showCancel:false,
            success (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.redirectTo({
                  url: '../../../pages/UploadProblem/index',
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }else{
          that.setData({
            arr:tempitem,
            dispost: true,
          })
          that.setData({
            fdbh_in:temp_fdbh_in
          })
          that.downloadKc()
        }
      }
    })



  },
  delbin(){
    var id = this.data.id
    wx.showModal({
      title: '提示',
      content: '是否删除本单据？删除后不可恢复！',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          db.collection('Problem').doc(id).remove({
            success: function(res) {
              console.log(res.data)
              wx.redirectTo({
                url: '../../../pages/oy/index',
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  async downloadKc(){
    var tempfdbh = this.data.arr['FDBH']
    var kclist = await utils.LgbaoSearcKCList([tempfdbh, this.data.yearstoday, '', '', '', '', ''])
    
    this.setData({kclist:kclist})
    this.resetlist()
  },
  resetlist(){
    var templist = this.data.arr
    templist['LIST'] = [
      {
        BARCODE:'',
        NAME:'',

        GQ_SL:0,
        GQ_DATE: utils.formatDateTime('YY-mm-dd',new Date()),
        GQ_JE:0,

        YGQ_SL:0,
        YGQ_DATE: utils.formatDateTime('YY-mm-dd',new Date()),
        YGQ_JE:0,

        DS_SL:0,
        DS_JE:0,

        UPLOADLDATE:''


      }
    ]
    this.setData({arr: templist})
  },
  async searchcode(e){


    var code = (e.detail.value)
    var id = e.target.dataset.id 
    var temparr = this.data.arr
    for (var i in temparr['LIST']){
      if( temparr['LIST'][i]['BARCODE'] == code){
        wx.showToast({
          title: '条码重复',
          icon: 'error',
          duration: 2000
        })
        break
      }else if(i== temparr['LIST'].length-1 ){
        var backmain =await this.returnCodeMain(code ,id)

        temparr['LIST'][id]['BARCODE'] = backmain[0]
        temparr['LIST'][id]['NAME'] = backmain[1]
        temparr['LIST'][id]['ALL_SL'] = backmain[2]
        temparr['LIST'][id]['ALL_JE'] = backmain[3]
        temparr['LIST'][id]['UPLOADLDATE'] = this.data.todaydate
        this.setData({
          arr: temparr,
          dispost: true,
        })
      }
    }


  },
  returnCodeMain(code ,id){
    var kclist = this.data.kclist
    var that = this
    console.log(kclist.length)
    return new Promise((resolve, reject) => {

      for (var i in kclist){

        if( code == kclist[i]['BARCODE'] && kclist[i]['HSFS'] == 0){
          console.log('success')
          var backl = [code, kclist[i]['NAME'], kclist[i]['JCSL'], Math.floor(((kclist[i]['JCJE'])*1.13)*100)/100]
          resolve (backl)
          break
        }else if(i== kclist.length-1){
          var temparr = that.data.arr
          temparr['LIST'][id] = {
            BARCODE:'',
            NAME:'',

            GQ_SL:0,
            GQ_DATE: utils.formatDateTime('YY-mm-dd',new Date()),
            GQ_JE:0,

            YGQ_SL:0,
            YGQ_DATE: utils.formatDateTime('YY-mm-dd',new Date()),
            YGQ_JE:0,

            DS_SL:0,
            DS_JE:0,

            UPLOADLDATE:''


          }
          that.setData({arr:temparr})
          wx.showModal({
            title: '提示',
            content: '此条码无库存',
            showCancel:false,
            success (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      }

    })

  },

  returnCodeMain2(code){
    var kclist = this.data.kclist
    var that = this
    console.log(kclist.length)
    return new Promise((resolve, reject) => {

      for (var i in kclist){

        if( code == kclist[i]['BARCODE'] && kclist[i]['HSFS'] == 0){
          console.log('success')
          var backl = [code, kclist[i]['NAME'], kclist[i]['JCSL'], Math.floor(((kclist[i]['JCJE'])*1.13)*100)/100]
          resolve (backl)
          break
        }else if(i== kclist.length-1){
          var backl = [code, '', 0, 0]
          resolve (backl)
        }
      }

    })

  },

  inputgqsl(e){
    var value = (e.detail.value)
    var id = e.target.dataset.id 
    var temparr = this.data.arr

    if (temparr['LIST'][id]['BARCODE'] != ''){
      var aveje = Math.floor((temparr['LIST'][id]['ALL_JE'] / temparr['LIST'][id]['ALL_SL']) * 100) / 100

      temparr['LIST'][id]['GQ_SL'] = Number(value)
      temparr['LIST'][id]['GQ_JE'] = Math.floor((value * aveje) * 100) / 100
      temparr['LIST'][id]['UPLOADLDATE'] = this.data.todaydate
      this.setData({
        arr: temparr,
        dispost: true,
      })
    }else{
      wx.showToast({
        title: '先输入条码！',
        icon: false,
        duration: 2000
      })
    }


  },

  inputygqsl(e){
    var value = (e.detail.value)
    var id = e.target.dataset.id 
    var temparr = this.data.arr


    if (temparr['LIST'][id]['BARCODE'] != ''){
      var aveje = Math.floor((temparr['LIST'][id]['ALL_JE'] / temparr['LIST'][id]['ALL_SL']) * 100) / 100

      temparr['LIST'][id]['YGQ_SL'] = Number(value)
      temparr['LIST'][id]['YGQ_JE'] = Math.floor((value * aveje) * 100) / 100
      temparr['LIST'][id]['UPLOADLDATE'] = this.data.todaydate
      this.setData({
        arr: temparr,
        dispost: true,
      })
    }else{
      wx.showToast({
        title: '先输入条码！',
        icon: false,
        duration: 2000
      })
    }
  },

  inputdssl(e){
    var value = (e.detail.value)
    var id = e.target.dataset.id 
    var temparr = this.data.arr


    if (temparr['LIST'][id]['BARCODE'] != ''){
      var aveje = Math.floor((temparr['LIST'][id]['ALL_JE'] / temparr['LIST'][id]['ALL_SL']) * 100) / 100

      temparr['LIST'][id]['DS_SL'] = Number(value)
      temparr['LIST'][id]['DS_JE'] = Math.floor((value * aveje) * 100) / 100
      temparr['LIST'][id]['UPLOADLDATE'] = this.data.todaydate
      this.setData({
        arr: temparr,
        dispost: true,
      })
    }else{
      wx.showToast({
        title: '先输入条码！',
        icon: false,
        duration: 2000
      })
    }
  },

  bindDateChangegq(e){
    var value = e.detail.value
    var id = e.target.dataset.id
    var temparr = this.data.arr


    
    if (temparr['LIST'][id]['BARCODE'] != ''){
      temparr['LIST'][id]['GQ_DATE'] = value
      this.setData({
        arr: temparr,
        dispost: true,
      })
    }else{
      wx.showToast({
        title: '先输入条码！',
        icon: false,
        duration: 2000
      })
    }


  },

  bindDateChangeygq(e){
    var value = e.detail.value
    var id = e.target.dataset.id
    var temparr = this.data.arr
    if (temparr['LIST'][id]['BARCODE'] != ''){
      temparr['LIST'][id]['YGQ_DATE'] = value
      this.setData({
        arr: temparr,
        dispost: true,
      })
    }else{
      wx.showToast({
        title: '先输入条码！',
        icon: false,
        duration: 2000
      })
    }
  },

  addsig(){
    var temparr = this.data.arr
    var sig = {
      BARCODE:'',
            NAME:'',

            GQ_SL:0,
            GQ_DATE: utils.formatDateTime('YY-mm-dd',new Date()),
            GQ_JE:0,

            YGQ_SL:0,
            YGQ_DATE: utils.formatDateTime('YY-mm-dd',new Date()),
            YGQ_JE:0,

            DS_SL:0,
            DS_JE:0,

            UPLOADLDATE:''
    }
    temparr['LIST'].push(sig)
    this.setData({
      arr: temparr,
      dispost: true,
    })
  },
  delsig(e){
    console.log()
    var id = e.target.dataset.id
    var temparr = this.data.arr
    temparr['LIST'].splice(e.target.dataset.id, 1)
    this.setData({
      arr: temparr,
      dispost: true,
    })
  },

  async checkall(){
    var temparr = this.data.arr
    var temparr2 = this.data.arr
    var note = ''
    var gqje = 0
    var ygqje = 0
    var dsje = 0
   for ( var x = (temparr2['LIST'].length - 1); x>=0; x-- ){
      console.log(x)
      console.log(temparr2['LIST'][x]['BARCODE'] )
      if (temparr2['LIST'][x]['BARCODE'] == '' || (temparr2['LIST'][x]['GQ_SL'] == 0 && temparr2['LIST'][x]['YGQ_SL'] == 0 && temparr2['LIST'][x]['DS_SL'] == 0) || (Number(temparr2['LIST'][x]['GQ_SL']) + Number(temparr2['LIST'][x]['YGQ_SL']) + Number(temparr2['LIST'][x]['DS_SL'])) > temparr2['LIST'][x]['ALL_SL']){
        // temparr2['LIST'].splice(x, 1)
        note = note + ',' +  String(Number(x) + 1)
      }else if(temparr2['LIST'][x]['BARCODE'] != '' && (temparr2['LIST'][x]['GQ_SL'] != 0 || temparr2['LIST'][x]['YGQ_SL'] != 0 || temparr2['LIST'][x]['DS_SL'] != 0) ){
        gqje = temparr2['LIST'][x]['GQ_JE'] + gqje
        ygqje = temparr2['LIST'][x]['YGQ_JE'] + ygqje
        dsje = temparr2['LIST'][x]['DS_JE'] + dsje
      }
      temparr2['DATE'] = this.data.todaydate
      temparr2['DS_JE'] = dsje
      temparr2['GQ_JE'] = Math.floor(gqje * 100) / 100
      temparr2['YGQ_JE'] = Math.floor(ygqje * 100) / 100


      
    }
    this.setData({
      arr:temparr2,
      dispost: false,
    })

    if (note!=''){
      this.setData({dispost:true})
      wx.showModal({
        title: '提示',
        content: '以下几行数据无意义或报备数量大于库存数量！分别是' + note + '行。请更正数据或把无意义删除。',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },

  postbin(){
    var that = this
    var arr = this.data.arr
    if (arr['LIST'].length == 0 || arr['LIST'][0]['NAME'] == '' || arr['FDMC'] == ''){
      wx.showModal({
        title: '提示',
        content: '未选择门店或无明细导致上传错误！',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }else{
      console.log(arr)
      if(that.data.id == '0'){
        db.collection('Problem').add({
          // data 字段表示需新增的 JSON 数据
          data: {
            // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
            main: arr,
            FDBH : arr['FDBH']
          },
          success: function(res) {
            // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
            console.log(res)

            wx.showModal({
              title: '提示',
              content: '提交成功',
              showCancel:false,
              success (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  wx.redirectTo({
                    url: '../../../pages/UploadProblem/index',
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })

          }
        })
      }else{
        db.collection('Problem').doc(this.data.id).set({
          data: {
            FDBH : this.data.arr['FDBH'],
            main: this.data.arr
          },
          success: function(res) {
            console.log(res.data)
            wx.showModal({
              title: '提示',
              content: '提交成功',
              showCancel:false,
              success (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  wx.redirectTo({
                    url: '../../../pages/UploadProblem/index',
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
        })
      }
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