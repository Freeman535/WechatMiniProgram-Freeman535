
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

    wx.setNavigationBarTitle({
      title: "修改库存及进价（目前开发做订单MO）"
    })
    wx.hideHomeButton({
      success: (res) => {},
    })

    this.reSetPage()



  },

  /**
   * 页面初始化--初始载入--订单制作完成时触发 // 初始化返回列表为空
   */
  reSetPage(){
    var returnList = {
      storeName:'',
      ddh:'',
      dgyPhone:'',
      jsSum:'',
      jeSum:'',
      list:[
        // {
        //   BARCODE:'',
        //   CODE:'',
        //   NAME:'',
        //   GG:'',
        //   JS:'',
        //   XS:'',
        //   DDJ_IN:'',
        //   DDJ_OUT:'',
        //   XJ:'',
        //   JE_SUM:'',
        //   PP:'',
        //   PH:''
        // }
      ]
    }

    this.setData({
      returnList: returnList,
      tip: ''
    })

  },

  /**
   * 输入完订单号时触发
   * 采集门店名称、单号
   * 条码、细数、价格
   */

   ddhInputOver(e){
    this.reSetPage()
     var that = this
     var temp_backList = this.data.returnList
     utils.LgbaoGetOneDHD(e.detail.value).then(res =>{
      var getOne = res
       utils.LgbaoSearchDDMain(e.detail.value).then (async(res) => {
        var getAll = res
        

        temp_backList['storeName'] = getOne['FDMC']
        temp_backList['ddh'] = getOne['JLBH']
        temp_backList['jsSum'] = 0
        temp_backList['jeSum'] = 0



          for(var i in getAll){


          let res = await that.auto_Back_single(getAll[i]['BARCODE'], getAll[i]['SPXS'], getAll[i]['JHDJ_HS'])
          
          if (typeof(res)=='object'){
            
            temp_backList['list'].push(res)
            
          }else{
            console.log(res)
          }

           
       }
      

        console.log(getOne, getAll)
      })
     })
   },


   /**
    * 导购员及联系方式栏修改
    */
   changePhone(e){

   },

   /**
    * 自动时单条处理数据返回数组
    */
   async auto_Back_single(barcode, number, jj){
     var that = this
     return new Promise((resolve, reject) => {
      db.collection('pi').where({
        code69: barcode
      })
      .get({
        success: async function(res) {
          // console.log(res.data)
          
          if((res.data.length) == 0){
            var temp_tip = that.data.tip
            temp_tip = '此条码数据库无结果：'+ barcode + '/n' + temp_tip
            that.setData({
              tip: temp_tip
            })
            resolve('此条码数据库无结果：'+ barcode)
            
          }else if(res.data.length == 1){
            if(res.data[0]['pc'] != 0){
              that.auto_Back_single_2(res.data[0], number, jj).then(res =>{
                resolve(res)
              })
              
            }else{
              var temp_tip = that.data.tip
              temp_tip = '此条码无库存：'+ barcode + '/n' + temp_tip
              that.setData({
              tip: temp_tip
            })
            resolve('此条码无库存：'+ barcode)
            }
          }else if(res.data.length > 1){
            var res1 = res.data
            var itemList = []
            for(var i in res1){
             itemList.push(res1[i]['code10'] + ' 库存数量：' + res1[i]['pc'])
            }
            let num = await that.showActionSheet(res.data, number, jj,itemList)
            let back0 = await that.auto_Back_single_2(res.data[num], number, jj)
            resolve(back0)


          }
        }
      })
    })
   },

   async showActionSheet(res1, number, jj,itemList){
     
     return new Promise ((resolve, reject) => {
    
        wx.showActionSheet({
          itemList: itemList,
          alertText:res1[0]['name']
          // success(res){
          //   console.log(res.tapIndex)
          //   that.auto_Back_single_2(res1[res.tapIndex], number, jj).then(res => {
          //     resolve(res)
              
          //   }) 
          }).then(res=>{
            resolve(res.tapIndex)
          })
        })
   },

   /**
    * 自动时单条处理数据返回数组2
    */
   auto_Back_single_2(arr, number, jj){

     var that = this
     var single = {
        BARCODE:arr['code69'],
        CODE:arr['code10'],
        NAME:arr['name'],
        GG:arr['gg3'],
        JS:'',
        XS:'',
        DDJ_IN: jj, // 欧亚订单上的
        DDJ_OUT:arr['bid'], // 返回的
        DDJ_FIN:'', // FIN
        XJ:'',
        JE_SUM:'',
        PP:'',
        PH:''
      }

      return new Promise ((resolve, reject) => {
        // console.log('执行了auto_Back_single_2' + arr['code69'])
                    // 数量篇
                    var js = Math.floor(number/arr['gg3'])
                    single['JS'] = js
                    single['XS'] = js * arr['gg3']
              
                    if (js == 0){
                      var temp_tip = that.data.tip
                      temp_tip = '此条码细数不够一件，按0件算。'+ arr['code69'] +'/n' + temp_tip
                      that.setData({
                        tip: temp_tip
                      })
                    }
        
              // 进价篇
              if(arr['bid'] == jj){
                single['DDJ_FIN'] = jj
                single['XJ'] = jj * arr['gg3']
                single['JE_SUM'] = jj * arr['gg3'] * single['JS']
              }else if (arr['bid'] == 0 ){
                single['DDJ_FIN'] = jj
                single['XJ'] = jj * arr['gg3']
                single['JE_SUM'] = jj * arr['gg3'] * single['JS']
                var temp_tip = that.data.tip
                temp_tip = '此条码数据库无价格，并按订单价格出：'+ arr['code69'] + '/n' + temp_tip
                that.setData({
                  tip: temp_tip
                })
              }else if(arr['bid'] != 0 && arr['bid'] != jj){
                single['DDJ_FIN'] = arr['bid']
                single['XJ'] =  arr['bid'] * arr['gg3']
                single['JE_SUM'] =  arr['bid'] * arr['gg3'] * single['JS']
                var temp_tip = that.data.tip
                temp_tip = '此条码数据库价格与订单价格不符：'+ arr['code69'] + '。数据库:'+ arr['bid'] + ';订单:' + jj + '/n' + temp_tip
                that.setData({
                  tip: temp_tip
                })
              }
        
              // 品牌 批号
              if(arr['pc'] == 0){
                single['PH'] = '1102111052'
              }else{
                single['PH'] = arr['pc']
              }
              single['PP'] = utils.backPp(single['NAME'])
              resolve(single)
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