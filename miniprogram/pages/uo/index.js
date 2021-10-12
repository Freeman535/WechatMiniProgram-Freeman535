// pages/order/searchCode/searchCode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mes:'文件正在上传中...',
    mes_hide:true,
    button_dis:false,
    mes_date:null

  },

  getKcUpTime(){
    const db = wx.cloud.database()
    const _ = db.command
    var that = this
    db.collection('cc_kc').where({
      'Date':_.neq('')
    })
    .get({
      success:function(res){
        console.log(res)
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
      success: function(res){
        that.setData({
          
          mes:'Excel上传完毕，正在送往数据库...'
        })
        console.log(res)
        for (var i in res.data){
          db.collection('cc_kc').add({
            // data 字段表示需新增的 JSON 数据
            data: {
              // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
              '10code': res.data[i]['10code'],
              'name': res.data[i]['name'],
              'number':res.data[i]['number'],
              'Date':new Date()
            },
            success: function(res) {
             
              console.log(res)
            }
          })
          that.setData({
            mes:'正在上传第 ' + String(Number(i) + Number(1)) + ' 个，共 ' + res.data.length + ' 个。'
          })
          if (String(Number(i) + Number(1)) == res.data.length){
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

  upload(){
    var that = this
    // let that = this;
    // 选择一张图片


    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        console.log(res.tempFiles[0]['path'])
        that.uploadFile(res.tempFiles[0]['path'])
      }
    })
    // wx.chooseImage({
    //   count: 1,
    //   sizeType: ['original', 'compressed'],
    //   sourceType: ['album', 'camera'],
    //   success: (res) => {
    //     // tempFilePath可以作为img标签的src属性显示图片
    //     const tempFilePaths = res.tempFilePaths[0]
    //     // that.uploadFile(tempFilePaths) 如果这里不是=>函数
    //     //则使用上面的that = this
    //     this.uploadFile(tempFilePaths) 
    //   },
    // })
  },
  //上传操作
  uploadFile(filePath) {
    var that = this
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