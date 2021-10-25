
const db = wx.cloud.database()
const app = getApp()
const utils = require('../../utils/utils.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pickerindex:0
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
      storeName:'订单号输入完会自动获取门店名称',
      userName:app.globalData.userData.name,
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
      tip: '',
      pickerindex:0,
      checked:true,
      upchecked:true
    })

    var that = this
    wx.cloud.callFunction({
      name: 'getAll',
      data: {
        name: 'sgif'
      },
      success(res){

        that.setData({
          sarray: res.result.data,

        })
        var templist = that.data.returnList
        templist['dgyPhone'] = that.data.sarray[that.data.pickerindex]['name'] + ' ' + that.data.sarray[that.data.pickerindex]['phonenumber']
        that.setData({
          returnList: templist
        })
      }
    })
    


  },

  /**
   * 输入完订单号时触发
   * 采集门店名称、单号
   * 条码、细数、价格
   */

   ddhInputOver(e){
    wx.showToast({
      title: '处理中',
      icon: 'loading',
      mask:true,
      duration: 60000
    })
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
       wx.hideToast({
         success: (res) => {},
       })
        that.setData({
          returnList: temp_backList,
          checked:false
        })
      })
     })
   },

   /**
    * 导购员及联系方式栏修改
    */
   changePhone(e){
    console.log(e.detail.value)
    this.setData({
      pickerindex:e.detail.value,
      
    })
    var templist = this.data.returnList
    templist['dgyPhone'] = this.data.sarray[this.data.pickerindex]['name'] + ' ' + this.data.sarray[this.data.pickerindex]['phonenumber']
    this.setData({
      returnList: templist
    })


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
            temp_tip = '此条码数据库无结果：'+ barcode + '\n' + temp_tip
            that.setData({
              tip: temp_tip
            })
            resolve('此条码数据库无结果：'+ barcode)
            
          }else if(res.data.length == 1){
            if(res.data[0]['kc'] != 0){
              that.auto_Back_single_2(res.data[0], number, jj).then(res =>{
                resolve(res)
              })
              
            }else{
              var temp_tip = that.data.tip
              temp_tip = '此条码无库存：'+ barcode + '\n' + temp_tip
              that.setData({
              tip: temp_tip
            })
            resolve('此条码无库存：'+ barcode)
            }
          }else if(res.data.length > 1){
            var res1 = res.data
            var itemList = []
            for(var i in res1){
             itemList.push(res1[i]['code10'] + ' 库存数量：' + res1[i]['kc'])
            }
            let num = await that.showActionSheet(res.data, number, jj,itemList)
            if (typeof(num) != 'object'){
              let back0 = await that.auto_Back_single_2(res.data[num], number, jj)
              resolve(back0)
            }else{
              num = 0
              let back0 = await that.auto_Back_single_2(res.data[num], number, jj)
              resolve(back0)
            }



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
          }).catch(res=>(
            resolve(res)
          ))
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

        if (arr['kc'] == 0){
          var temp_tip = that.data.tip
          temp_tip = '----此条码无库存：'+ arr['code69'] +'\n' + temp_tip
          that.setData({
            tip: temp_tip
          })
          resolve('此条码数据库无结果：'+ arr['code69'])
        }else{
          // 数量篇
          var js = Math.floor(number/arr['gg3'])
          single['JS'] = js
          single['XS'] = js * arr['gg3']
    
          if (js == 0){
            var temp_tip = that.data.tip
            temp_tip = '此条码细数不够一件，按0件算。'+ arr['code69'] +'\n' + temp_tip
            that.setData({
              tip: temp_tip
            })
            resolve('此条码数据库无结果：'+ arr['code69'])
          }else if(single['JS']>arr['kc']){
            var temp_tip = that.data.tip
            temp_tip = '此条码库存最多件数为：'+ arr['kc'] + ' '+ arr['code69'] +'\n' + temp_tip
            that.setData({
              tip: temp_tip
            })
            single['JS'] = arr['kc']
            // 进价篇
    if(arr['bid'] == jj){
      single['DDJ_FIN'] = jj
      single['XJ'] = Math.floor((jj * arr['gg3']) * 100 ) / 100
      single['JE_SUM'] = Math.floor((jj * arr['gg3'] * single['JS']) * 100) / 100
    }else if (arr['bid'] == 0 ){
      single['DDJ_FIN'] = jj
      single['XJ'] = Math.floor((jj * arr['gg3']) * 100 ) / 100
      single['JE_SUM'] = Math.floor((jj * arr['gg3'] * single['JS']) * 100) / 100
      var temp_tip = that.data.tip
      temp_tip = '此条码数据库无价格，并按订单价格出：'+ arr['code69'] + '\n' + temp_tip
      that.setData({
        tip: temp_tip
      })
    }else if(arr['bid'] != 0 && arr['bid'] != jj){
      single['DDJ_FIN'] = arr['bid']
      single['XJ'] =  Math.floor(((arr['bid'] * arr['gg3'])) * 100) / 100
      single['JE_SUM'] =  Math.floor((arr['bid'] * arr['gg3'] * single['JS']) * 100) / 100
      var temp_tip = that.data.tip
      temp_tip = '此条码数据库价格与订单价格不符：'+ arr['code69'] + '。数据库:'+ arr['bid'] + ';订单:' + jj + '\n' + temp_tip
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

          }else{
            // 进价篇
    if(arr['bid'] == jj){
      single['DDJ_FIN'] = jj
      single['XJ'] = Math.floor((jj * arr['gg3']) * 100 ) / 100
      single['JE_SUM'] = Math.floor((jj * arr['gg3'] * single['JS']) * 100) / 100
    }else if (arr['bid'] == 0 ){
      single['DDJ_FIN'] = jj
      single['XJ'] = Math.floor((jj * arr['gg3']) * 100 ) / 100
      single['JE_SUM'] = Math.floor((jj * arr['gg3'] * single['JS']) * 100) / 100
      var temp_tip = that.data.tip
      temp_tip = '此条码数据库无价格，并按订单价格出：'+ arr['code69'] + '\n' + temp_tip
      that.setData({
        tip: temp_tip
      })
    }else if(arr['bid'] != 0 && arr['bid'] != jj){
      single['DDJ_FIN'] = arr['bid']
      single['XJ'] =  Math.floor(((arr['bid'] * arr['gg3'])) * 100) / 100
      single['JE_SUM'] =  Math.floor((arr['bid'] * arr['gg3'] * single['JS']) * 100) / 100
      var temp_tip = that.data.tip
      temp_tip = '此条码数据库价格与订单价格不符：'+ arr['code69'] + '。数据库:'+ arr['bid'] + ';订单:' + jj + '\n' + temp_tip
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
          }
        }

                    
        
              
              
      })
    
   },

   /**
    * 门店名称更改
    */
   storeInputOver(e){
    console.log(e)
    var that = this
    if (e.detail.value == ''){
      var temp = this.data.returnList
      temp['storeName'] = e.detail.value
      that.setData({
        returnList: temp
      })
    }
   },

   /**
    * 删除单条信息
    */
   delsingle(e){
     console.log(e.target.id)
     var that = this
     
     wx.showModal({
      title: '提示',
      content: '是否删除该行？',
      success (res) {
        if (res.confirm) {
          var temp = that.data.returnList
          temp['list'].splice(e.target.id, 1)
          that.setData({
            returnList: temp,
            upchecked: true
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
    



   },

   /**
    * check
    */
   check(){
    var arr_temp = this.data.returnList
    var that = this

    for (var i in arr_temp['list']){
      if( arr_temp['list'][i]['DDJ_FIN'] != arr_temp['list'][i]['DDJ_IN']){
        arr_temp['list'][i]['color'] = 'red'
      }else if (arr_temp['list'][i]['JS'] == 0){
        arr_temp['list'][i]['color'] = 'red'
      }
      arr_temp['jeSum'] = Math.floor((arr_temp['jeSum'] + arr_temp['list'][i]['JE_SUM']) * 100) / 100
      arr_temp['jsSum'] = Math.floor((arr_temp['jsSum'] + arr_temp['list'][i]['JS']) * 100) / 100
    }
    this.setData({
      returnList: arr_temp,
      upchecked: false
    })

    // 此代码为清空库存数量

    // wx.cloud.callFunction({
    //   name: 'cleanKc',
    //   data: {},
    //   success(res){
    //     console.log(res)
    //   }
    // })

    wx.showModal({
      title: '提示',
      content: '如果有变红色的行请关注！',
      showCancel:false,
      success (res) {}
    })
    
    


   },

   /**
    * pushData 
    */
   pushData(){
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否确认提交生成？',
      success(res){
        if(res.confirm){
          wx.showLoading({
            title: '订单生成中...',
          })
        }
        wx.request({
          url: 'https://service-9gt0am90-1304008511.gz.apigw.tencentcs.com/release/CloudOutputDD2',
          method:"POST",
          header:{
            'Content-Type':'application/json'
          },
          data:JSON.stringify(that.data.returnList),
          success(res){
            console.log(res)
            var excel_name = (String(res.data['excel_data'])).split('/')[4]
            console.log(excel_name)
            console.log(res.data['excel_data'])
            wx.cloud.getTempFileURL({
              fileList: [res.data['excel_data']],
              success: res => {
                // fileList 是一个有如下结构的对象数组
                // [{
                //    fileID: 'cloud://xxx.png', // 文件 ID
                //    tempFileURL: '', // 临时文件网络链接
                //    maxAge: 120 * 60 * 1000, // 有效期
                // }]
                
                console.log(res.fileList[0]['tempFileURL'])
    
    
                wx.downloadFile({
                  url: (res.fileList[0]['tempFileURL']),
                  filePath:wx.env.USER_DATA_PATH+ '/'+excel_name,
                  success(res) {
                    wx.hideLoading()
                    console.log(res)
                      // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
                      if (res.statusCode == 200) {
                         
                          const filePath = res.filePath 
                    
                          wx.openDocument({
                              filePath: filePath,
                              showMenu: true,
                              success: function (res) {
                                   
                              }
                           })
                        }
                   },
                   fail(res) {
                      console.log(res)
                   }
               })
    
    
                wx.setClipboardData({
                  data: res.fileList[0]['tempFileURL'],
                  success (res) {
                    wx.getClipboardData({
                      success (res) {
                        console.log(res.data) // data
                      }
                    })
                  }
                })
              }
            })
          }
        })
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