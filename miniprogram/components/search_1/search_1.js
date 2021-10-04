// components/search_1/search_1.js
const db = wx.cloud.database()
const app = getApp()
const utils = require('../../utils/utils.js');

// 此组件应用需传入
// 门店列表和开始日期 
// CanSearch 和 back

Component({
  /**
   * 组件的属性列表
   */
  properties: {

    // 是否显示内搜索功能
    canSearch: {
      type: Number,

    },

    // 搜索模式  0为订单  1为进仓单  2为返厂单  3为变价单  4销售  5负毛利  6库存  
    back: {
      type: Number,
    
    },

    // 
    nowdate:{
      type:String,
      observer(newdata, olddata){
        this.reSet()
      }
      
    },

    back_list: {
      type:Array
    },

    // 开始日期
    useS_RQ: {
      type:Boolean,

    },

    // 结束日期
    useE_RQ: {
      type:Boolean,
    },

    // 单号 
    useDH: {
      type:Boolean,
    },

    // 69码
    use69CODE: {
      type:Boolean,
    },

    // 00条码
    useCODE: {
      type:Boolean,
    },

    // 名
    useNAME: {
      type:Boolean,
    },

    //分店集合
    fdarray:{
      type:Array,
    }

    
  
  },

  /**
   * 组件的初始数据
   */
  data: {
    showText:['0', '', '', '', '', '', ''],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    reSet(){
      var tempShow = this.data.showText
      tempShow[1] = this.data.nowdate
      this.setData({
        showText: tempShow
      })
      this.triggerEvent("reSetComponent")
    },

    bindChange(e){
      // console.log(e.detail.value) 返回输入值
      // console.log(e.target.dataset.id) 返回id
      var tempShow = this.data.showText
      tempShow[e.target.dataset.id] = e.detail.value
      this.setData({
        showText: tempShow
      })
    },

    pickerChange(e){
      console.log(e)
      var tempShow = this.data.showText
      tempShow[0] = this.data.fdarray[e.detail.value]['FDBH']
      this.setData({
        showText: tempShow
      })
    },

    bindSearch(){
      var that = this
      if (this.data.showText[0] == '0'){
        var tempShow = this.data.showText
        tempShow[0] = '-10'
        this.setData({
          showText: tempShow
        })
        console.log(this.data.showText)
      }

      // back为0
      if (this.data.back == 0){
        utils.LgbaoSearchDDList(this.data.showText).then(res =>{
          var back0 = res
          that.setData({
            back_list: back0
          })
          if(back0.length == 0){
            wx.showToast({
              title: '查询无结果',
              icon: 'error',
              duration: 2000
            })            
          }
        })
      }else if(this.data.back == 1){
        utils.LgbaoSearcJCDList(this.data.showText).then(res =>{
          var back0 = res
          console.log(back0)
          that.setData({
            back_list: back0
          })
          if(back0.length == 0){
            wx.showToast({
              title: '查询无结果',
              icon: 'error',
              duration: 2000
            })            
          }
        })
      }else if(this.data.back == 2){
        utils.LgbaoSearcFCDList(this.data.showText).then(res =>{
          var back0 = res
          console.log(back0)
          that.setData({
            back_list: back0
          })
          if(back0.length == 0){
            wx.showToast({
              title: '查询无结果',
              icon: 'error',
              duration: 2000
            })            
          }
        })
      }else if(this.data.back == 3){
        utils.LgbaoSearcBJDList(this.data.showText).then(res =>{
          var back0 = res
          console.log(back0)
          that.setData({
            back_list: back0
          })
          if(back0.length == 0){
            wx.showToast({
              title: '查询无结果',
              icon: 'error',
              duration: 2000
            })            
          }
        })
      }
    },

    getIn(e){
      console.log(e.currentTarget.dataset.ddh)
      wx.navigateTo({
        url: '../../pages/search_2/search_2?back=' + this.data.back + '&dhd=' + e.currentTarget.dataset.ddh,
      })
    }
  }
})
