// components/menu/menu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type:String,
      value:'测试项目'
    },
    arrList:{
      type:Array,
      value:{
        4:{
          pic:'../../images/captcha.jpg',
          name:'test4',
          gt: '../../pages/oy/index'
        },
        3:{
          pic:'../../images/captcha.jpg',
          name:'test3',
          gt: '../../pages/oy/index'
        },
        2:{
          pic:'../../images/captcha.jpg',
          name:'test2',
          gt: '../../pages/oy/index'
        },
        1:{
          pic:'../../images/captcha.jpg',
          name:'test1',
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

  }
})
