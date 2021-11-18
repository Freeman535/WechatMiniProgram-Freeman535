
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

    wx.showLoading({
      title: '加载中',
    })
    var that = this

    wx.setNavigationBarTitle({
      title: "质检报告"
    })
    wx.hideHomeButton({
      success: (res) => {},
    })
    wx.cloud.callFunction({
      name: 'GETlistDirectoryFiles',
      data: {
        address: 'Quality/'
      },
      success(res){
        wx.showModal({
          title: '提示',
          content: '点击想要查看的文件名称，会自动下载并打开，文件下载连接也会自动复制到剪切板上，方便没有自动打开PDF的用户自行下载。',
          showCancel: false,
          success (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
        wx.hideLoading({
          success: (res) => {},
        })

        console.log(res)
        var dic = {}
        for (var i in res.result.data.res){
          if( i > 0){

            dic[((res.result.data.res[i]['ETag']).replace('"','')).replace('"', '')] = res.result.data.res[i]['Key']
          }
        }
        
        that.setData({
          dic: dic
        })
        

      },
      fail(res){
        wx.hideLoading({
          success: (res) => {},
        })
        wx.showModal({
          title: '错误',
          content: '网络加载失败，请重进！',
          showCancel: false,
          success (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
        
        
        
        
      }
    })
  },
  bind(e)
  {wx.showLoading({
    title: '正在下载中...',
  })
    console.log(e)
    this.downAndView(e.target.dataset.add, e.target.dataset.id)
  },

  downAndView(address, filename){
    wx.cloud.getTempFileURL({
      fileList: ['cloud://cloud-freeman-1g2bgs2h35dec2bc.636c-cloud-freeman-1g2bgs2h35dec2bc-1304008511/' + address],
      success: res => {
        
        console.log(res.fileList[0]['tempFileURL'])
        var fileurl = res.fileList[0]['tempFileURL']
        wx.setClipboardData({
          data: fileurl,
          success (res) {
            wx.getClipboardData({
              success (res) {
                console.log(res.data) // data
              }
            })
          }
        })

        wx.downloadFile({
          url: (res.fileList[0]['tempFileURL']),
          filePath:wx.env.USER_DATA_PATH+ '/'+filename,
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
      }
    })
  }


})