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

    back_list_yye:{
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
    },

    search_value:{
      type:String
    },

    search_yye:{
      type:Number
    }

    
  
  },

  /**
   * 组件的初始数据
   */
  data: {
    showText:['-10', '', '', '', '', '', ''],
    fdbh_in:'0'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    reSet(){
      var tempShow = this.data.showText
      tempShow[1] = this.data.nowdate
      tempShow[2] = this.data.nowdate
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
        showText: tempShow,
        fdbh_in:e.detail.value
      })
    },

    bindSearch(){
      this.setData({
        back_list:0,
        back_list_yye:null
      })
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
      }else if(this.data.back == 4){
        var show_back_data = [0,0,0]
        utils.LgbaoSearcSALEList(this.data.showText).then(res =>{
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
          }else{

            for (var i in that.data.back_list){
              if (utils.IfCodeLB(that.data.back_list[i]['NAME']) == 0){
                show_back_data[0] = show_back_data[0] + that.data.back_list[i]['YYE']
                show_back_data[1] = show_back_data[1] + that.data.back_list[i]['YYE']
              }else{
                show_back_data[0] = show_back_data[0] + that.data.back_list[i]['YYE']
                show_back_data[2] = show_back_data[2] + that.data.back_list[i]['YYE']
              }
            }
            show_back_data[0] = show_back_data[0].toFixed(2)
            show_back_data[1] = show_back_data[1].toFixed(2)
            show_back_data[2] = show_back_data[2].toFixed(2)
            that.setData({
              back_list_yye: show_back_data
            })
            // utils.IfCodeLB()
          }
        })
      }else if(this.data.back == 5){
        var show_back_data = [0,0,0]
        utils.LgbaoSearcFMLList(this.data.showText).then(res =>{
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
                   
          }else{

            for (var i in that.data.back_list){
              var fml = that.data.back_list[i]['XSCB'] - that.data.back_list[i]['YYE']
              if (utils.IfCodeLB(that.data.back_list[i]['NAME']) == 0){
                show_back_data[0] = show_back_data[0] + fml
                show_back_data[1] = show_back_data[1] + fml
              }else{
                show_back_data[0] = show_back_data[0] + fml
                show_back_data[2] = show_back_data[2] + fml
              }
            }
            show_back_data[0] = show_back_data[0].toFixed(2)
            show_back_data[1] = show_back_data[1].toFixed(2)
            show_back_data[2] = show_back_data[2].toFixed(2)
            that.setData({
              back_list_yye: show_back_data
            })
            // utils.IfCodeLB()
          }
        })
      }else if(this.data.back == 6){
        var show_back_data = [0,0,0]
        console.log(this.data.showText)
        utils.LgbaoSearcKCList(this.data.showText).then(res =>{
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
                   
          }else{

            for (var i in that.data.back_list){
              
              if (utils.IfCodeLB(that.data.back_list[i]['NAME']) == 0){
                show_back_data[0] = show_back_data[0] + that.data.back_list[i]['JCJE']
                show_back_data[1] = show_back_data[1] + that.data.back_list[i]['JCJE']
              }else{
                show_back_data[0] = show_back_data[0] + that.data.back_list[i]['JCJE']
                show_back_data[2] = show_back_data[2] + that.data.back_list[i]['JCJE']
              }
            }
            show_back_data[0] = show_back_data[0].toFixed(2)
            show_back_data[1] = show_back_data[1].toFixed(2)
            show_back_data[2] = show_back_data[2].toFixed(2)
            that.setData({
              back_list_yye: show_back_data
            })
            // utils.IfCodeLB()
          }
        })
      }
    },

    getIn(e){
      console.log(e.currentTarget.dataset.ddh)
      wx.navigateTo({
        url: '../../pages/search_2/search_2?back=' + this.data.back + '&dhd=' + e.currentTarget.dataset.ddh,
      })
    },

    search_in(){
      this.setData({
        search_yye: 0,
        back_list_s:null
      })

      if (this.data.search_value != ''){
        var na = new Array()
        var nam = 0
        var that = this
        for (var i in this.data.back_list){
          if(this.data.back_list[i]['BARCODE'].indexOf(this.data.search_value) != -1 || this.data.back_list[i]['NAME'].indexOf(this.data.search_value) != -1){
            na.push({
              code:that.data.back_list[i]['BARCODE'],
              name:that.data.back_list[i]['NAME'],
              number:that.data.back_list[i]['XSSL'],
              yye:that.data.back_list[i]['YYE'],
            })
            nam = nam + that.data.back_list[i]['YYE']
          }
        }
        this.setData({
          search_yye: Math.floor(nam * 100) /100,
          back_list_s: na
  
        })
      }

    },
    bindinput(e){

      this.setData({
        search_value:e.detail.value
      })
    }
  }
})
