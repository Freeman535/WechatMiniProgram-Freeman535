// components/menu/menu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type:String,
      value:'MenuComponents'
    },
    arrList:{
      type:Array,
      value:{
        0:{
          pic:'../../images/OrderManagement.png',
          name:'Project',
          gt: '../../pages/oy/index'
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    GT(e){
      // console.log(e.currentTarget.dataset.gt)
      this.triggerEvent("goToPage",e.currentTarget.dataset.gt)
    }
  }
})
