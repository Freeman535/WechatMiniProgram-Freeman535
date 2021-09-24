// components/verifycode.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    src:{
      type:String
    },
    code:{
      type:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgSrc:null,
    inputValue:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChangeShowUploadTip(){
      this.triggerEvent("postCode",this.data.inputValue)
      //console.log(this.data.inputValue)
    },
    bindKeyInput: function (e) {
      this.setData({
        inputValue: e.detail.value
      })
    },
    reCODE:function(){
      this.setData({
        inputValue:''
      })
      this.triggerEvent("recode")
    }
  }
})
