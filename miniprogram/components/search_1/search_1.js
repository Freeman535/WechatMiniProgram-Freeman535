// components/search_1/search_1.js
const app = getApp()

// 此组件应用需传入
// 门店列表和开始日期 
// CanSearch 和 back

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    canSearch: {
      type: Number,
      value: 0
    },
    back: {
      type: Number,
      value: 4
    },
    nowdate:{
      type:String,
      
    },
    useS_RQ: {
      type:Boolean,
    },
    useE_RQ: {
      type:Boolean,
    },
    useDH: {
      type:Boolean,
    },
    use69CODE: {
      type:Boolean,
    },
    useCODE: {
      type:Boolean,
    },
    useNAME: {
      type:Boolean,
    },
    fdarray:{
      type:Array,
    }

    
  
  },

  /**
   * 组件的初始数据
   */
  data: {
    showText:[0, '2021-09-30', '', '', '', '', ''],
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

    bindSearch(){
      console.log(this.data.showText)
    }
  }
})
