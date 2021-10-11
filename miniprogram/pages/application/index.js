// pages/application/index.js
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
    var that = this
    wx.cloud.callFunction({
      name: 'getAll',
      data: {
        name: 'apply'
      },
      success(res){

        that.setData({
          array: res.result.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  checkcc(e){
    console.log(e)
    wx.showModal({
      title: '提示',
      content: '是否添加用户：'+ e.currentTarget.dataset.name,
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')


          db.collection('apply').doc(e.currentTarget.dataset.id).remove({
            success: function(res) {
              console.log(res.data)
            }
          })


          db.collection('userlist').add({
            // data 字段表示需新增的 JSON 数据
            data: {
              // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
              name: e.currentTarget.dataset.name,
              phonenumber: e.currentTarget.dataset.phone,
              openid: e.currentTarget.dataset.openid
       
            },
            success: function(res) {
              // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
              console.log(res)
            }
          })

          
          
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
    
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