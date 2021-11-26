// pages/downDB/index.js
const db = wx.cloud.database()
const app = getApp()
const utils = require('../../utils/utils.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['Problems', '产品信息表', '导购员信息', '小程序用户信息'],
    index: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  bindPickerChange(e){
    console.log(e)
    var id = e.detail.value
    this.setData({
      index: id
    })
  },


 downdb(){
    var that = this
     wx.showModal({
      title: '提示',
      content: '是否确认下载文件？',
      async success (res) {
        if (res.confirm) {
          console.log('用户点击确定')

          var m = await that.maindown()
          console.log(m)
          var postdata = that.formartdata(m)
          console.log(postdata)
          // 下边统一上传到api然后操作

          wx.request({
            url: 'https://service-6asax1wg-1304008511.gz.apigw.tencentcs.com/release/OutputExcel',
            method:"POST",
            header:{
              'Content-Type':'application/json'
            },
            data:JSON.stringify(postdata),
            success(res){
              console.log(res)
              var excel_name = (String(res.data['excel_data'])).split('/')[4]
              console.log(excel_name)
              console.log(res.data['excel_data'])
              wx.cloud.getTempFileURL({
                fileList: [res.data['excel_data']],
                success: res => {
                  // fileList 是一个有如下结构的对象数组
                  // [{
                  //    fileID: 'cloud://xxx.png', // 文件 ID
                  //    tempFileURL: '', // 临时文件网络链接
                  //    maxAge: 120 * 60 * 1000, // 有效期
                  // }]
                  
                  console.log(res.fileList[0]['tempFileURL'])
      
      
                  wx.downloadFile({
                    url: (res.fileList[0]['tempFileURL']),
                    filePath:wx.env.USER_DATA_PATH+ '/'+excel_name,
                    success(res) {
                      wx.hideLoading()
                      console.log(res)
                        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
                        if (res.statusCode == 200) {
                           
                            const filePath = res.filePath 
                      
                            wx.openDocument({
                                filePath: filePath,
                                showMenu: true,
                                success: function (res) {
                                     
                                }
                             })
                          }
                     },
                     fail(res) {
                        console.log(res)
                     }
                 })
      
      
                  wx.setClipboardData({
                    data: res.fileList[0]['tempFileURL'],
                    success (res) {
                      wx.getClipboardData({
                        success (res) {
                          console.log(res.data) // data
                        }
                      })
                    }
                  })
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

  maindown: function(){
    
    return new Promise((resolve, reject) => {
      var that = this
      if ( that.data.index == 0){
        wx.cloud.callFunction({
          name: 'getAll',
          data: {
            name: 'Problem'
          },
          success(res){
            resolve (res.result.data)
          }
        })
      }else if(that.data.index == 1){
        wx.cloud.callFunction({
          name: 'getAll',
          data: {
            name: 'pi'
          },
          success(res){
            resolve (res.result.data)
          }
        })
      }else if(that.data.index == 2){
        wx.cloud.callFunction({
          name: 'getAll',
          data: {
            name: 'sgif'
          },
          success(res){
            resolve (res.result.data)
          }
        })
      }else if(that.data.index == 3){
        wx.cloud.callFunction({
          name: 'getAll',
          data: {
            name: 'userlist'
          },
          success(res){
            resolve (res.result.data)
          }
        })
      }

    })

  },

  formartdata(m){
    var that = this
    if( that.data.index == 0){
      var tempdata = {
        title: ['ZXR', 'FDMC','BARCODE','NAME','ALL_JE','ALL_SL','DS_JE','DS_SL','GQ_JE','GQ_SL','GQ_DATE','YGQ_JE','YGQ_SL','YGQ_DATE','UPLOADLDATE', 'DATE'],
        data: []
      }
      for(var i in m){
        for(var x in m[i]['main']['LIST']){
          var tempb = m[i]['main']['LIST'][x]
          tempb['ZXR'] = m[i]['main']['ZXR']
          tempb['DATE'] = m[i]['main']['DATE']
          tempb['FDMC'] = m[i]['main']['FDMC']
          tempdata['data'].push(tempb)
        }
      }
      return (tempdata)
    }else if( that.data.index == 1){
      var tempdata = {
        title: ['code10','code69','name','bid','sale','kc','bbfl','fbfl','gg1','gg2','gg3','lb1','lb2','lb3','lb4','pc','ifshow','pic_address'],
        data: []
      }
      for(var i in m){
        tempdata['data'].push(m[i])
      }
      return (tempdata)
    }else if( that.data.index == 2){
      var tempdata = {
        title: ['name','idcard','gender','phonenumber','ymd'],
        data: []
      }
      for(var i in m){
        tempdata['data'].push(m[i])
      }
      return (tempdata)
    }else if( that.data.index == 3){
      var tempdata = {
        title: ['name','openid','phonenumber','PROP','authority'],
        data: []
      }
      for(var i in m){
        tempdata['data'].push(m[i])
      }
      return (tempdata)
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