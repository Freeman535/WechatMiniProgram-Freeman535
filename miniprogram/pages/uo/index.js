// pages/order/searchCode/searchCode.js
const db = wx.cloud.database()
const app = getApp()
const utils = require('../../utils/utils.js');
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mes:'文件正在上传中...',
    mes_hide:true,
    button_dis:false,
    mes_date:null,


  },

  getKcUpTime(){
    const db = wx.cloud.database()
    const _ = db.command
    var that = this
    db.collection('pi').where({
      _id:'f4ef47fd616e1df301aa74852f21cee1'
    })
    .get({
      success:function(res){
        // console.log(res)
        that.setData({
          mes_date:String(res.data[0]['Date'])
        })
      }
    })
  },

  runCloudSCF(goUrl){
    const db = wx.cloud.database()
    var that = this
    that.setData({
      button_dis:true,
      mes_hide:false
    })
    // wx.showLoading({
    //   title: '文件正在上传中',
    // })
    
    // setTimeout(function () {
    //   wx.hideLoading()
    // }, 60000)
    
    wx.request({
      url: 'https://service-jit32f1i-1304008511.gz.apigw.tencentcs.com/release/wechatMiniProUpdate/',
      method:'POST',
      header:{
        'Content-Type':'application/json'
      },
      data:goUrl,
      success: async function(res){
        that.setData({
          
          mes:'Excel正在送往数据库...'
        })
        console.log(res)
        for (var i in res.data){
          var len_all = res.data.length
          var tempL = res.data[i]
          let id_back = await that.searchid(res.data[i]['10code'])
          if (id_back.length != 0){
            let l2 = await that.changeid(id_back[0]['_id'], tempL['number'])
            console.log(l2)
          }else{
            var temp_errmes = that.data.errmes
            temp_errmes.push((tempL['10code'] + ' ' + tempL['name'] + ' 在数据库无记录，无法添加库存！'))
            that.setData({
              errmes: temp_errmes
            })
          }
            that.setData({
              percent: Math.floor(((Number(i) + Number(1)) / len_all ) * 10000) / 100
            })
          if (String(Number(i) + Number(1)) == len_all){
            db.collection('pi').doc('f4ef47fd616e1df301aa74852f21cee1').update({
              data: {
                kc: _.set(0),
                Date: new Date()
              },
              complete: function(res) {}

            })
            that.setData({
              mes:'上传完成！'
            })
            that.getKcUpTime()
          }
        }
      
        // wx.hideLoading({
        //   success: (res) => {},
        // })
      }

    })
  },

  searchid(code10){

    return new Promise ((resolve, reject) => {
      db.collection('pi').where({
        code10:code10
      }).get({
        success:function(res){
          resolve(res.data)
        }
      })
    })

  },

  changeid(id, number){
    return new Promise ((suc, fai) => {
      db.collection('pi').doc(id).update({
        data: {
          kc: _.set(number),
          Date: new Date()
        },
        complete: function(res) {
          suc(0)
        }
        

      })
    })
  },

  upload(){
    var that = this
    this.setData({errmes: [],percent:0})
    // 选择一张图片
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success (res) {
        that.setData({mes:'正在抹去之前库存信息。'})
        // tempFilePath可以作为img标签的src属性显示图片
        var pathfile = res.tempFiles[0]['path']
        console.log(pathfile)
            // 此代码为清空库存数量
        wx.cloud.callFunction({
          name: 'cleanKc',
          data: {},
          success(res){
            console.log(res)
            console.log('库存清空完毕！')
            that.setData({
              mes:'库存清空完毕！'
            })
            that.uploadFile(pathfile)
          }
        })
        
      }
    })
  },

  //上传操作
  uploadFile(filePath) {
    var that = this
    that.setData({
      mes:'正在上传excel到云端'
    })
    wx.cloud.uploadFile({
      cloudPath: 'kc/' + (new Date()).valueOf()+'.xls', // 文件名
      filePath: filePath, // 文件路径
      success: res => {
        // get resource ID
        console.log(res.fileID)
        var fileID = res.fileID
        wx.cloud.getTempFileURL({
          fileList: [fileID],
          success: res => {
            // fileList 是一个有如下结构的对象数组
            // [{
            //    fileID: 'cloud://xxx.png', // 文件 ID
            //    tempFileURL: '', // 临时文件网络链接
            //    maxAge: 120 * 60 * 1000, // 有效期
            // }]
            
            console.log(res.fileList[0]['tempFileURL'])
            that.setData({
              mes:'excel上传完毕'
            })
            that.runCloudSCF(res.fileList[0]['tempFileURL'])
          },
          fail: console.error
        })
     

      },
      fail: err => {
        // handle error
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "长春库存更新"
    })
    wx.hideHomeButton({
      success: (res) => {},
    })
    this.getKcUpTime()
    // this.runCloudSCF('ss')

  },

})