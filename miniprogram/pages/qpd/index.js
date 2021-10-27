// pages/qpd/index.js
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
      title: "全品单"
    })
    wx.hideHomeButton({
      success: (res) => {},
    })
    wx.showLoading({
      title: '正在初始...',
      mask: true
    })
    this.onloadpi()

  },

  onloadpi(){
    var that = this
    wx.cloud.callFunction({
      name: 'getAll',
      data: {
        name: 'pi'
      },
      success(res){
        var arr = res.result.data
        var tempAllList = []
        var tempAllList1 = {}
        var tempAllList2 = {}
        var tempAllList3 = {}
        for (var i in arr){
          
          if (arr[i]['_id'] != 'f4ef47fd616e1df301aa74852f21cee1'){
            
            if (tempAllList.includes(arr[i]['lb2']) == false){
              
              tempAllList.push()
                
              
            }
          }
        }
        that.setData({
          alllist: tempAllList
        })
        wx.hideLoading({})
        console.log(res)

        // that.setData({
        //   array: res.result.data
        // })
      }
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