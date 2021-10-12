// pages/order/Make/Make.js
const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fdbh : '181',
    message:'',
    codepc: null,
    codetoxs:null,
    upchecked: true,
    checked: true,
    list_back:[
      {'del':'-',
        'code10': '10码',
      'code69': '69码',
      'name': '名称',
      'gg': '规格',
      'js_num': '件数',
      'xs': '细数',
      'ddjj': '订单进价',
      'xsdjj': '销售单进价',
      'xj_1': '箱价',
      'xj_2': '销售单单品金额合计',
      'pp': '品牌',
      'ph': '批号',
      'bzq': '保质期'}
    ],
    switchChecked: true,
    array:[0,1,2,3],//默认显示一个

    list_num:1, // 列表行数
    switchMsg: '自动订单', // 订单模式
    ddh:'', // 订单号   须上传
    shopName: '', // 门店名称   须上传
    peonum: '', //门店联系人及电话   须上传
    xsdje:0, //销售单价格   须上传
    ddje:0, // 订单价格   须上传
    jsnum:0, //件数合计   须上传
    index: 1,

    items69:[{value: 'USA', name: '美国'},
    {value: 'CHN', name: '中国', checked: 'true'},
    {value: 'BRA', name: '巴西'},
    {value: 'JPN', name: '日本'},
    {value: 'ENG', name: '英国'},
    {value: 'FRA', name: '法国'}],
    showModeWindow:false,


  },

  pushData(){
    var that = this



    wx.showModal({
      title: '提示',
      content: '是否确认提交生成？',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')

          
    wx.showLoading({
      title: '订单生成中...',
    })
    

    that.setData({
      data_all_11:null
    })
    
    var data_all = {}
    var tempPhone = ''
    if (that.data.index == 0){
      tempPhone = that.data.peonum
      data_all['ddh'] = that.data.ddh
      data_all['shopName'] = that.data.shopName
      data_all['fdbh'] = that.data.fdbh
      data_all['tempPhone'] = tempPhone
      data_all['xsdje'] = that.data.xsdje
      data_all['jsnum'] = that.data.jsnum
      data_all['list_back'] = that.data.list_back
      console.log(data_all)
      that.setData({
        data_all_11:data_all
      })
  
  
      wx.request({
        url: 'https://service-9gt0am90-1304008511.gz.apigw.tencentcs.com/release/CloudOutputDD',
        method:"POST",
        header:{
          'Content-Type':'application/json'
        },
        data:JSON.stringify(data_all),
        success(res){
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
            },
            fail: console.error
          })
          
        },
        complete(res){
          console.log(res)
        }
      
  
      })
    }else{
      tempPhone = that.data.array[that.data.index]
      data_all['ddh'] = that.data.ddh
      data_all['shopName'] = that.data.shopName
      data_all['fdbh'] = that.data.fdbh
      data_all['tempPhone'] = tempPhone
      data_all['xsdje'] = that.data.xsdje
      data_all['jsnum'] = that.data.jsnum
      data_all['list_back'] = that.data.list_back
      console.log(data_all)
      that.setData({
        data_all_11:data_all
      })
  
  
      wx.request({
        url: 'https://service-9gt0am90-1304008511.gz.apigw.tencentcs.com/release/CloudOutputDD',
        method:"POST",
        header:{
          'Content-Type':'application/json'
        },
        data:JSON.stringify(data_all),
        success(res){
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
            },
            fail: console.error
          })
          
        },
        complete(res){
          console.log(res)
        }
  
      })



    }




        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    


  },

  getSingle(code69, js, indexs){
    var tempCode10 = ''
    var tempCode69 = code69
    var tempName = ''
    var tempGg = ''
    var tempJs = js
    var tempXs = 0
    var tempDdjj = 0
    var tempXsdjj = 0
    var tempXj = 0
    var tempXsddpjj = 0
    var tempPp = ''
    var tempPh = ''
    var bzq = '3年'
    var color = ''
    var index = indexs

    const priceDB = db.collection('PriceList')
    const cckc = db.collection('cc_kc')
    const _ = db.command
    var that = this
    var back_code = []
    var back_data = null
    var kcNumberMax = 0

    var temp69 = this.cleanCode(code69)
    console.log(temp69)

    
    if ( temp69.length > 0 ){

      cckc.where({
        '10code': _.in(temp69)
      })
      .get({
          success: function(res) {
            console.log(res)
            back_data = res.data
            for(var i in res.data){
              back_code.push(res.data[i]['10code'])
            }
            if(Number(res.data.length) > 0){
              wx.showActionSheet({
                itemList: back_code,
                success (res) {
                  console.log(res.tapIndex)
                  tempCode10 = back_data[res.tapIndex]['10code']
                  kcNumberMax = back_data[res.tapIndex]['number']
                  tempName = back_data[res.tapIndex]['name']
                  tempGg = that.data.codetoxs[code69]
                  if (kcNumberMax < tempJs){

                    wx.showToast({
                      title: '库存没那么多啦，给你自动最大了',
                      icon: 'error',
                      duration: 2000
                    })
        
                    tempJs = kcNumberMax
                  }
                  tempXs = tempJs * tempGg
                  wx.request({
                    url: 'https://lgb.oywanhao.com/bmcporasrv/prod/system/comm/SPXX/SearchSP?SHOPCODE=000003&GHDWDM=000376&HZFS=1',
                    method:"POST",
                    data:'SHOPAndGHS=000003_000376&SPSB=&GXSJ_B=&GXSJ_E=&SPFL=&FDBH='+that.data.fdbh+'&SP_NAME=&SPCODE=&SP_BARCODE='+tempCode69+'&SP_HH=&page=1&rows=10',
                    header:{
                      'Host': 'lgb.oywanhao.com',
                      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                      'Accept': 'application/json, text/javascript, */*; q=0.01',
                      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36 Edg/90.0.818.49',
                      'token':that.data.token,
                      'shopCode':''
                    },
                    success(res){
                      console.log(res)
                      if(res.data['data']['data']['list'].length == 0){
                        wx.showModal({
                          title: '提示',
                          content: '此条码在此门店无ERP',
                          success (res) {
                            if (res.confirm) {
                              console.log('用户点击确定')
                            } else if (res.cancel) {
                              console.log('用户点击取消')
                            }
                          }
                        })
                        
                      }else{
                        tempDdjj = res.data['data']['data']['list'][0]['JHDJ_HS']
                        priceDB.where({
                          '10code': tempCode10
                        }).get({
                          success:function(res){
                            if (res.data['length'] == 0){
                              wx.showToast({
                                title: '数据库无进价',
                                icon: 'error',
                                duration: 2000
                              })
                              
                            }else{
                              tempXsdjj = Number(res.data[0]['price'])
                              tempXj = tempGg * tempXsdjj
                              tempXsddpjj = tempXj * tempJs
                              if (tempName.indexOf('超能') != -1){
                                tempPp = '超能'
                              }else if (tempName.indexOf('雕') != -1){
                                tempPp = '雕牌'
                              }else if(tempName.indexOf('妙管家') != -1){
                                tempPp = '妙管家'
                              }else if(tempName.indexOf('动力100') != -1){
                                tempPp = '动力100'
                              }else if(tempName.indexOf('公道先生') != -1){
                                tempPp = '公道先生'
                              }else if(tempName.indexOf('西丽') != -1){
                                tempPp = '西丽'
                              }else if(tempName.indexOf('西亚斯') != -1){
                                tempPp = '西亚斯'
                              }else if(tempName.indexOf('纳爱斯') != -1){
                                tempPp = '纳爱斯'
                              }else{
                                tempPp = 'ERROR'
                              }

                              for (var i in that.data.codepc){
                                if (that.data.codepc[i]['10code'] == tempCode10){
                                  tempPh = that.data.codepc[i]['pc']
                                  break
                                }else{
                                  tempPh = '2102101226'
                                }
                              }
                              console.log(tempCode10,tempCode69,tempName,tempGg,tempJs,tempXs,tempDdjj,tempXsdjj,tempXj,tempXsddpjj,tempPh,tempPp)
                              var oldList_o = that.data.list_back
                              oldList_o[index]['code10'] = tempCode10
                              oldList_o[index]['code69'] = tempCode69
                              oldList_o[index]['name'] = tempName
                              oldList_o[index]['gg'] = tempGg
                              oldList_o[index]['js_num'] = tempJs
                              oldList_o[index]['xs'] = tempXs
                              oldList_o[index]['ddjj'] = tempDdjj
                              oldList_o[index]['xsdjj'] = tempXsdjj
                              oldList_o[index]['xj_1'] = tempXj.toFixed(2)
                              oldList_o[index]['xj_2'] = tempXsddpjj.toFixed(2)
                              oldList_o[index]['pp'] = tempPp
                              oldList_o[index]['ph'] = tempPh
                              oldList_o[index]['bzq'] = bzq
                              oldList_o[index]['color'] = color
                              that.setData({
                                list_back:oldList_o,
                                checked:false
                              })


                            }
                          }
                        })
                      }
                    }
                  })





                },
                fail (res) {
                  console.log(res.errMsg)
                }
              })
              
            }else{
              wx.showModal({
                title: '提示',
                content: tempCode69 + ' 此条码无库存。',
                success (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            }
          }
        })
      }else{
        wx.showToast({
          title: '条码错误',
          icon: 'error',
          duration: 2000
        })
      
      }

    
 




  },


//添加input
addInput:function(){

  if (this.data.shopName != ''){
    console.log('门店名称：' + this.data.shopName + ' 门店编码：'+ this.data.fdbh)

    
  var oldList = this.data.list_back

  oldList.push({
    'del':'-',
      'code10': 'waiting...',
      'code69': '',
      'name': 'waiting...',
      'gg': 'waiting...',
      'js_num': '',
      'xs': 'waiting...',
      'ddjj': 'waiting...',
      'xsdjj': 'waiting...',
      'xj_1': 'waiting...',
      'xj_2': 'waiting...',
      'pp': 'waiting...',
      'ph': 'waiting...',
      'bzq': '3年',
  })
  this.setData({
    list_back:oldList
  })
  this.setData({
    list_num: this.data.list_back.length
  })
  console.log(this.data.list_num)

  }else{
    wx.showToast({
      title: '请先输入门店名称和门店编码',
      icon: 'error',
      duration: 2000
    })
    
  }

},

close2(){
  this.setData({
    showModeWindow:false
  })
},

checkboxChange(e){
  console.log(e.detail.value['0'])
  var old69 = this.data.items69
  var that = this

  if(e.detail.value.length == 2){
    for(var i in old69){
      old69[i]['value']
      if (e.detail.value['1'] == old69[i]['value']){
        old69[i]['checked'] = true
      }else{
        old69[i]['checked'] = false
      }
      if (Number(i)+1 == Number(old69.length)){
        console.log(old69)
        that.setData({
          items69:old69
        })
      }
    }
  }else{
    this.setData({
      items69:old69
    })
  }



},

//删除input
delInput:function(e){
  var that = this
  var oldList = this.data.list_back
  var index = e.target['dataset']['index']


  wx.showModal({
    title: '删除确认',
    content: '确认删除 ' + this.data.list_back[e.target['dataset']['index']]['code10'] + ' ？',
    success (res) {
      if (res.confirm) {
        console.log('用户点击确定')
        if(Number(e.target['dataset']['index']) != 0){
          var listTemp = []
        for (var i in oldList){
          if (i != index){
            listTemp.push(oldList[i])
            that.setData({
              list_back: listTemp,
              list_num: listTemp.length
            })
          }
        }
        }else{
          wx.showToast({
            title: '标题不可删除',
            icon: 'error',
            duration: 2000
          })
        }

      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
  


},

  // 选择器最后选择的内容
  bindPickerChange(e){

    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      peonum: ''
    })

  },

  //获取选择器里的内容，开局获取
  getSelector(){
    var that = this
    wx.request({
      url: 'https://freeman535.coding.net/p/DataBase/d/data_base/git/raw/master/WeChatProgram/contact_information.json?download=false',
      method:"GET",
      success(res){
        var old = []
        console.log(res.data)
        for (var i in res.data){
          old.push(res.data[i])
        }
        that.setData({
          array:old
        })
      }
    })
  },

  //  获取实时输入并赋值
  getBindInput(e){
    var that = this
    var changeValue = e.detail['value']
    var fl = e.currentTarget.id
    var index = e.currentTarget['dataset']['index']
    if ( Number(fl) == 1){
      var oldList = that.data.list_back
      oldList[index]['code69'] = changeValue
      that.setData({
        list_back: oldList
      })
    }else if(Number(fl) == 4){
      var oldList = that.data.list_back
      oldList[index]['js_num'] = changeValue
      that.setData({
        list_back: oldList
      })
    }else if(Number(fl) == 6){
      var oldList = that.data.list_back
      oldList[index]['ddjj'] = changeValue
      that.setData({
        list_back: oldList
      })
    }else if(Number(fl) == 7){
      var oldList = that.data.list_back
      oldList[index]['xsdjj'] = changeValue
      that.setData({
        list_back: oldList
      })
    }else if(Number(fl) == 10){
      var oldList = that.data.list_back
      oldList[index]['pp'] = changeValue
      that.setData({
        list_back: oldList
      })
    }else if(Number(fl) == 12){
      var oldList = that.data.list_back
      oldList[index]['bzq'] = changeValue
      that.setData({
        list_back: oldList
      })
    }

  },

  getBindInput69(e){
    console.log(e)
    var that = this

    var oldList = that.data.list_back
    oldList[e.currentTarget['dataset']['index']]['code69'] = (e.detail['value'])
    that.setData({
      list_back:oldList
    })

    if (that.data.list_back[e.currentTarget['dataset']['index']]['js_num'] != ''){
      that.getSingle(that.data.list_back[[e.currentTarget['dataset']['index']]]['code69'], that.data.list_back[[e.currentTarget['dataset']['index']]]['js_num'], e.currentTarget['dataset']['index'])
    }else{
      console.log('请输入件数。')
    }
  },

  getBindInputJs(e){
    console.log(e)
    var that = this

    var oldList = that.data.list_back
    oldList[e.currentTarget['dataset']['index']]['js_num'] = Number(e.detail['value'])
    that.setData({
      list_back:oldList
    })

    if (that.data.list_back[e.currentTarget['dataset']['index']]['code69'] != ''){
      that.getSingle(that.data.list_back[[e.currentTarget['dataset']['index']]]['code69'], that.data.list_back[[e.currentTarget['dataset']['index']]]['js_num'], e.currentTarget['dataset']['index'])
    }else{
      console.log('请输入69')
    }
  },

  getShop(e){
    this.setData({
      shopName:e.detail.value
    })
  },

  getPeoN(e){
    console.log(e)
    this.setData({
      peonum: e.detail.value
    })

  },


  // 通过订单号获取订单信息
  searchDd(e){
    var that = this
    that.modeAuto()
    this.setData({
      message:'',
      ddh: e.detail.value,
      checked: false
    })
    console.log(e.detail.value)
    wx.request({
      url: 'https://lgb.oywanhao.com/bmcporasrv/prod/system/bh80/dhd/getOneDHD',
      
      header: {
        'Host': 'lgb.oywanhao.com',
        'Connection': 'keep-alive',
        'Content-Type': 'application/json;charset=UTF-8',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'X-Requested-With': 'XMLHttpRequest',
        'shopCode':'',
        'token': this.data.token,
        'Origin': 'https://lgb.oywanhao.com',
        'Referer': 'https://lgb.oywanhao.com/basedhd/BH_80/dhd_Search.html?menuid=2201',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
      },
      data:{'JLBH':String(e.detail.value),'SHOPCODE':'000003','DHDH':String(e.detail.value)},
      method:"POST",
      success(res){
        console.log(res)

        that.setData({
          fdbh:String(res.data['data']['data']['FDBH'])
        })

        if (res.data['data']['data'] != null){
          that.setData({
            shopName:res.data['data']['data']['FDMC'],
          })
          that.autoDownDD(that.data.ddh)
        }else{
          that.setData({
            shopName: '请输入上方订单号'
          })
          wx.showModal({
            title: '提示',
            content: '未查询到订单号：' + that.data.ddh,
            success (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
          
        }
      }
    })
    
  },

  // 开关选择器确定
  switchChange(e){
    var that = this
    console.log(e)
    var modeTF = e.detail['value']
    wx.showModal({
      title: 'ChangeMode',
      content: '是否切换模式？',
      success (res) {
        if (res.confirm) {
          if (modeTF == true){
            // 转为自动模式
            that.modeAuto()
          }else{
            // 转为手动模式
            that.modeHandle()
          }
        } else if (res.cancel) {
          if (modeTF == true){
            that.setData({
              switchChecked:false
            })
          }else{
            that.setData({
              switchChecked:true
            })
          }
        }
      }
    })
    
  },

  // 自动订单处理初始化
  modeAuto(){
    this.setData({
      switchChecked:true,
      message:'',
      checked:true,
      upchecked: true
    })
    this.setData({
      switchMsg: '自动订单',
      ddh: '',
      shopName: '请输入上方订单号',
      peonum: '',
      xsdje: 0,
      ddje: 0,
      jsnum: 0,
      list_back:[
        {'del':'-',
          'code10': '10码',
        'code69': '69码',
        'name': '名称',
        'gg': '规格',
        'js_num': '件数',
        'xs': '细数',
        'ddjj': '订单进价',
        'xsdjj': '销售单进价',
        'xj_1': '箱价',
        'xj_2': '销售单单品金额合计',
        'pp': '品牌',
        'ph': '批号',
        'bzq': '保质期'}
      ],
      list_num: 1,
      index: 1
    })
  },

  // 手动订单处理初始化
  modeHandle(){
    this.setData({
      message:'',
      switchChecked:false,
      checked: true,
      upchecked: true
    })

    this.setData({
      switchMsg: '手动订单',
      ddh: '',
      shopName: '',
      peonum: '',
      xsdje: 0,
      ddje: 0,
      jsnum: 0,
      list_back:[
        {'del':'-',
          'code10': '10码',
        'code69': '69码',
        'name': '名称',
        'gg': '规格',
        'js_num': '件数',
        'xs': '细数',
        'ddjj': '订单进价',
        'xsdjj': '销售单进价',
        'xj_1': '箱价',
        'xj_2': '销售单单品金额合计',
        'pp': '品牌',
        'ph': '批号',
        'bzq': '保质期'}
      ],
      list_num: 1,
      index: 1
    })





  },

  async autoDownDD(ddh){
    var that = this

    var list_back = [
      {'del':'-',
        'code10': '10码',
      'code69': '69码',
      'name': '名称',
      'gg': '规格',
      'js_num': '件数',
      'xs': '细数',
      'ddjj': '订单进价',
      'xsdjj': '销售单进价',
      'xj_1': '箱价',
      'xj_2': '销售单单品金额合计',
      'pp': '品牌',
      'ph': '批号',
      'bzq': '保质期'}
    ]
    var oldList = list_back
    
    wx.request({
      url: 'https://lgb.oywanhao.com/bmcporasrv/prod/system/bh80/dhd/searchItem',
      method:"POST",
      header:{
        'Host': 'lgb.oywanhao.com',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'token': this.data.token,
        'shopCode': ''
      },
      data:'JLBH=' + ddh + '&SHOPCODE=000003&DHDH=' + ddh,
      success(res){
        console.log(res.data['data']['data']['list'])
        
        for (var i in res.data['data']['data']['list']){
          //console.log(res.data['data']['data']['list'][i]['BARCODE'])
          var temp69 = res.data['data']['data']['list'][i]['BARCODE']
          var tempName = res.data['data']['data']['list'][i]['NAME']
          var tempJj = res.data['data']['data']['list'][i]['JHDJ_HS']
          var tempXs = res.data['data']['data']['list'][i]['SPXS'] // 细数
          var tempKc = null // 库存数
          var tempCode10 = ''

          that.getKcSj(temp69,tempXs, tempName ,tempJj,(res)=>{

            console.log(res)
            
            
          })
        }

      }
    })
  },

  get10to69(){
    wx.request({
      url: 'https://freeman535.coding.net/p/DataBase/d/data_base/git/raw/master/10to69.json?download=true',
      method:"GET", 
      success:(res) => {
        this.setData(
          {
            codeTo69:res.data.main
          }
        )
      }
    })

  },

  cleanCode(code){
    var back_10 = []
    
    for (var i in this.data.codeTo69){
      if ( this.data.codeTo69[i]['69code'] == code){
        back_10.push(this.data.codeTo69[i]['10code'])
      }
    }
    return back_10
  },

  getKcSj: function(code69,tempXs, tempName , tempJj,ress) {
    console.log(code69,tempXs, tempName , tempJj)
    var that = this
    const priceDB = db.collection('PriceList')
    var tempCode10 = ''
    var tempKc = 0
    var tempXsdjj = 99999
    const cckc = db.collection('cc_kc')
    const _ = db.command
    var temp69 = this.cleanCode(code69)
    if ( temp69.length > 0 ){


      cckc.where({
        '10code': _.in(temp69)
      })
      .get(
        {
          success: function(res) {
            //console.log(res.data)
            console.log(res)
            // console.log(Number(res.data.length) == 1)
            if (Number(res.data.length) == 1 && Number(res.data[0]['number']) != 0){
              tempCode10 = res.data[0]['10code']
              tempKc = res.data[0]['number']
              priceDB.where({
                '10code': res.data[0]['10code']
              })
              .get({
                success:function(res){
                  if (res.data['length'] == 0){
                    console.log('价格数据库没有找到此条码')
                    wx.showModal({
                      title: '提示',
                      content: tempName+'价格数据库没有找到此条码',
                      success (res) {
                        if (res.confirm) {
                          console.log('用户点击确定')
                        }
                      }
                    })
                    var oldMessage = that.data.message
                    oldMessage = oldMessage +tempName+' 价格数据库没有找到此条码。'+ '\n'
                    that.setData({
                      message: oldMessage
                    })
                  }else{
                    tempXsdjj=Number(res.data[0]['price'])

                    // niubi 666 
                    console.log('正在查询：' + code69 + ' ss ' + tempCode10)
                 
                    console.log(code69, tempKc, tempXs, tempName, tempCode10,tempXsdjj )
                    if(Number(tempXsdjj) > Number(tempJj)){
                      wx.showModal({
                        title: '提示',
                        content: temp69 + ' 此条码销售单价格比订单价格高！',
                        success (res) {
                          if (res.confirm) {
                            console.log('用户点击确定')
                          } else if (res.cancel) {
                            console.log('用户点击取消')
                          }
                        }
                      })
                      var oldMessage = that.data.message
                    oldMessage = oldMessage +temp69 + ' 此条码销售单价格比订单价格高！'+ '\n'
                    that.setData({
                      message: oldMessage
                    })

                    }
                    var gg = that.data.codetoxs[code69]
                    var js = Math.floor(Number(tempXs)/Number(gg))
                    var xs_finally = js * gg
                    console.log(gg, js, xs_finally)
                    

                    if (js > tempKc){
                      console.log('js>kc')
                      wx.showModal({
                        title: '提示',
                        content: code69 + ' 库存数量不够，按最多出',
                        success (res) {
                          if (res.confirm) {
                            console.log('用户点击确定')
                          } else if (res.cancel) {
                            console.log('用户点击取消')
                          }
                        }
                      })

                      var oldMessage = that.data.message
                      oldMessage = oldMessage +code69 + ' 库存数量不够，按最多出'+ '\n'
                      that.setData({
                        message: oldMessage
                      })
                      
                      js = tempKc
                      xs_finally = js * gg 
                      var pp = ''
                    if (tempName.indexOf('超能') != -1){
                      pp = '超能'
                    }else if (tempName.indexOf('雕') != -1){
                      pp = '雕牌'
                    }else if(tempName.indexOf('妙管家') != -1){
                      pp = '妙管家'
                    }else if(tempName.indexOf('动力100') != -1){
                      pp = '动力100'
                    }else if(tempName.indexOf('公道先生') != -1){
                      pp = '公道先生'
                    }else if(tempName.indexOf('西丽') != -1){
                      pp = '西丽'
                    }else if(tempName.indexOf('西亚斯') != -1){
                      pp = '西亚斯'
                    }else if(tempName.indexOf('纳爱斯') != -1){
                      pp = '纳爱斯'
                    }else{
                      pp = 'ERROR'
                    }
                    console.log(js,xs_finally,pp)

                    var ph = ''
                  
                    for (var i in that.data.codepc){
                      if (that.data.codepc[i]['10code'] == tempCode10){
                        ph = that.data.codepc[i]['pc']
                        break
                      }else{
                        ph = '2102101226'
                      }
                      
                    }
                    // var ph = that.data.codepc[code10]
                    var xiangjia = gg*tempXsdjj
                    var xsddpjg = xiangjia * js

                    console.log(code69,tempCode10,tempName,gg,js,xs_finally,tempJj,tempXsdjj,xiangjia, xsddpjg,pp)


                    var oldlist = that.data.list_back
                    oldlist.push({
                      'del':'-',
                      'code10': tempCode10,
                      'code69': code69,
                      'name': tempName,
                      'gg': gg,
                      'js_num': js,
                      'xs': xs_finally,
                      'ddjj': tempJj,
                      'xsdjj': tempXsdjj,
                      'xj_1': xiangjia.toFixed(2),
                      'xj_2': xsddpjg.toFixed(2),
                      'pp': pp,
                      'ph': ph,
                      'bzq': '3年',
                      'color': ''
                    })
                    that.setData({
                      list_back: oldlist,
                      list_num: oldlist.length
                    })



                  
                    }else{
                      console.log('js<kc')
                      var pp = ''
                    if (tempName.indexOf('超能') != -1){
                      pp = '超能'
                    }else if (tempName.indexOf('雕') != -1){
                      pp = '雕牌'
                    }else if(tempName.indexOf('妙管家') != -1){
                      pp = '妙管家'
                    }else if(tempName.indexOf('动力100') != -1){
                      pp = '动力100'
                    }else if(tempName.indexOf('公道先生') != -1){
                      pp = '公道先生'
                    }else if(tempName.indexOf('西丽') != -1){
                      pp = '西丽'
                    }else if(tempName.indexOf('西亚斯') != -1){
                      pp = '西亚斯'
                    }else if(tempName.indexOf('纳爱斯') != -1){
                      pp = '纳爱斯'
                    }else{
                      pp = 'ERROR'
                    }
                    console.log(js,xs_finally,pp)
                    var ph = ''
                  
                    for (var i in that.data.codepc){
                      if (that.data.codepc[i]['10code'] == tempCode10){
                        ph = that.data.codepc[i]['pc']
                        break
                      }else{
                        ph = '2102101226'
                      }
                      
                    }
                    var xiangjia = gg*tempXsdjj
                    var xsddpjg = xiangjia * js
                    console.log(xiangjia, xsddpjg)

                    console.log(code69,tempCode10,tempName,gg,js,xs_finally,tempJj,tempXsdjj,xiangjia, xsddpjg,pp)

                    var oldlist = that.data.list_back
                    oldlist.push({
                      'del':'-',
                      'code10': tempCode10,
                      'code69': code69,
                      'name': tempName,
                      'gg': gg,
                      'js_num': js,
                      'xs': xs_finally,
                      'ddjj': tempJj,
                      'xsdjj': tempXsdjj,
                      'xj_1': xiangjia.toFixed(2),
                      'xj_2': xsddpjg.toFixed(2),
                      'pp': pp,
                      'ph': ph,
                      'bzq': '3年',
                      'color': ''
                    })
                    that.setData({
                      list_back: oldlist,
                      list_num: oldlist.length
                    })

                  
                    }
                    





                  }
                }
              })

            }else if (Number(res.data.length) > 1)
            {
              
              for (var i in res.data){
                console.log(res.data[i])
                if (Number(res.data[i]['number']) != 0){
                  tempCode10 = res.data[i]['10code']
                  tempKc = res.data[i]['number']
                  priceDB.where({
                    '10code': res.data[i]['10code']
                  })
                  .get({
                    success:function(res){
                      if (res.data['length'] == 0){
                        console.log( '价格数据库没有找到此条码')
                        wx.showModal({
                          title: '提示',
                          content: tempName+'价格数据库没有找到此条码',
                          success (res) {
                            if (res.confirm) {
                              console.log('用户点击确定')
                            }
                          }
                        })
                        var oldMessage = that.data.message
                        oldMessage = oldMessage +tempName+'价格数据库没有找到此条码'+ '\n'
                        that.setData({
                          message: oldMessage
                        })
                      }else{
                        tempXsdjj=Number(res.data[0]['price'])
                        // niubi 666 
                    console.log('正在查询：' + code69 + ' ss ' + tempCode10)
                    
                    console.log(code69, tempKc, tempXs, tempName, tempCode10,tempXsdjj )
                    if(Number(tempXsdjj) > Number(tempJj)){
                      wx.showModal({
                        title: '提示',
                        content: temp69 + ' 此条码销售单价格比订单价格高！',
                        success (res) {
                          if (res.confirm) {
                            console.log('用户点击确定')
                          } else if (res.cancel) {
                            console.log('用户点击取消')
                          }
                        }
                      })
                      var oldMessage = that.data.message
                      oldMessage = oldMessage +temp69 + ' 此条码销售单价格比订单价格高！'+ '\n'
                      that.setData({
                        message: oldMessage
                      })

                    }
                    var gg = that.data.codetoxs[code69]
                    var js = Math.floor(Number(tempXs)/Number(gg))
                    var xs_finally = js * gg
                    

                    if (js > tempKc){
                      console.log('js>kc')

                      wx.showModal({
                        title: '提示',
                        content: code69 + ' 库存数量不够，按最多出',
                        success (res) {
                          if (res.confirm) {
                            console.log('用户点击确定')
                          } else if (res.cancel) {
                            console.log('用户点击取消')
                          }
                        }
                      })
                      var oldMessage = that.data.message
                      oldMessage = oldMessage +code69 + ' 库存数量不够，按最多出'+ '\n'
                      that.setData({
                        message: oldMessage
                      })

                      js = tempKc
                      xs_finally = js * gg 
                      var pp = ''
                    if (tempName.indexOf('超能') != -1){
                      pp = '超能'
                    }else if (tempName.indexOf('雕') != -1){
                      pp = '雕牌'
                    }else if(tempName.indexOf('妙管家') != -1){
                      pp = '妙管家'
                    }else if(tempName.indexOf('动力100') != -1){
                      pp = '动力100'
                    }else if(tempName.indexOf('公道先生') != -1){
                      pp = '公道先生'
                    }else if(tempName.indexOf('西丽') != -1){
                      pp = '西丽'
                    }else if(tempName.indexOf('西亚斯') != -1){
                      pp = '西亚斯'
                    }else if(tempName.indexOf('纳爱斯') != -1){
                      pp = '纳爱斯'
                    }else{
                      pp = 'ERROR'
                    }
                    console.log(js,xs_finally,pp)
                    // var ph = that.data.codepc[code10]
                    var ph = ''
                  
                    for (var i in that.data.codepc){
                      if (that.data.codepc[i]['10code'] == tempCode10){
                        ph = that.data.codepc[i]['pc']
                        break
                      }else{
                        ph = '2102101226'
                      }
                      
                    }
                    var xiangjia = gg*tempXsdjj
                    var xsddpjg = xiangjia * js

                    console.log(code69,tempCode10,tempName,gg,js,xs_finally,tempJj,tempXsdjj,xiangjia, xsddpjg,pp)

                    var oldlist = that.data.list_back
                    oldlist.push({
                      'del':'-',
                      'code10': tempCode10,
                      'code69': code69,
                      'name': tempName,
                      'gg': gg,
                      'js_num': js,
                      'xs': xs_finally,
                      'ddjj': tempJj,
                      'xsdjj': tempXsdjj,
                      'xj_1': xiangjia.toFixed(2),
                      'xj_2': xsddpjg.toFixed(2),
                      'pp': pp,
                      'ph': ph,
                      'bzq': '3年',
                      'color': ''
                    })
                    that.setData({
                      list_back: oldlist,
                      list_num: oldlist.length
                    })

                  
                    }else{
                      console.log('js<kc')
                      var pp = ''
                    if (tempName.indexOf('超能') != -1){
                      pp = '超能'
                    }else if (tempName.indexOf('雕') != -1){
                      pp = '雕牌'
                    }else if(tempName.indexOf('妙管家') != -1){
                      pp = '妙管家'
                    }else if(tempName.indexOf('动力100') != -1){
                      pp = '动力100'
                    }else if(tempName.indexOf('公道先生') != -1){
                      pp = '公道先生'
                    }else if(tempName.indexOf('西丽') != -1){
                      pp = '西丽'
                    }else if(tempName.indexOf('西亚斯') != -1){
                      pp = '西亚斯'
                    }else if(tempName.indexOf('纳爱斯') != -1){
                      pp = '纳爱斯'
                    }else{
                      pp = 'ERROR'
                    }
                    console.log(js,xs_finally,pp)
                    //var ph = that.data.codepc[code10]
                    var ph = ''
                  
                    for (var i in that.data.codepc){
                      if (that.data.codepc[i]['10code'] == tempCode10){
                        ph = that.data.codepc[i]['pc']
                        break
                      }else{
                        ph = '2102101226'
                      }
                      
                    }
                    var xiangjia = gg*tempXsdjj
                    var xsddpjg = xiangjia * js
                    // console.log(xiangjia, xsddpjg)

                    console.log(code69,tempCode10,tempName,gg,js,xs_finally,tempJj,tempXsdjj,xiangjia, xsddpjg,pp)

                    var oldlist = that.data.list_back
                    oldlist.push({
                      'del':'-',
                      'code10': tempCode10,
                      'code69': code69,
                      'name': tempName,
                      'gg': gg,
                      'js_num': js,
                      'xs': xs_finally,
                      'ddjj': tempJj,
                      'xsdjj': tempXsdjj,
                      'xj_1': xiangjia.toFixed(2),
                      'xj_2': xsddpjg.toFixed(2),
                      'pp': pp,
                      'ph': ph,
                      'bzq': '3年',
                      'color':''
                    })
                    that.setData({
                      list_back: oldlist,
                      list_num: oldlist.length
                    })

                  
                    }
                      }
                    }
                  })
                  break
                }
              }
                           
            }else{
              wx.showModal({
                title: '提示',
                content: tempName+' 此条码无库存！',
                success (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  }
                }
              })
              var oldMessage = that.data.message
              oldMessage = oldMessage +tempName+' 此条码无库存！'+ '\n'
              that.setData({
                message: oldMessage
              })
            }
          }
        }
      )
    }else{
      console.log('coding上没有搜索到此条码对应的10码。')
      wx.showModal({
        title: '提示',
        content: 'coding上没有搜索到此条码对应的10码。',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
      var oldMessage = that.data.message
      oldMessage = oldMessage +tempName+'coding上没有搜索到此条码对应的10码。'+ '\n'
      that.setData({
        message: oldMessage
      })
      
    }

  },

  getGg(code69, kc, xs, name, code10) {
    var that = this
    // 传入69码获取规格，通过系数算能有多少件，然后通过现有库存计算能出多少件
    // 回传    规格，件数，细数，品牌，批号
    var gg = null
    var js = null
    var xs_finally = null
    var pp = null 
    var ph = null
    var callback_01 = []
    gg = that.data.codetoxs[code69]
    js =  Math.floor(Number(xs)/Number(gg))
    xs_finally = js * gg 
    if (Number(js) > Number(kc)){
      wx.showModal({
        title: '提示',
        content:  name +' 此商品库存件数不够，默认最低',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      
      js = kc
      xs_finally = js * gg 
    }
    if (name.indexOf('超能') != -1){
      pp = '超能'
    }else if (name.indexOf('雕') != -1){
      pp = '雕牌'
    }else if(name.indexOf('妙管家') != -1){
      pp = '妙管家'
    }else if(name.indexOf('动力100') != -1){
      pp = '动力100'
    }else if(name.indexOf('公道先生') != -1){
      pp = '公道先生'
    }else if(name.indexOf('西丽') != -1){
      pp = '西丽'
    }else if(name.indexOf('西亚斯') != -1){
      pp = '西亚斯'
    }else if(name.indexOf('纳爱斯') != -1){
      pp = '纳爱斯'
    }else{
      pp = 'ERROR'
    }
    ph = that.data.codepc[code10]

    callback_01.push(gg)
    callback_01.push(js)
    callback_01.push(xs_finally)
    callback_01.push(pp)
    callback_01.push(ph)
    return (callback_01)

  },

  // 获取商品信息 69 -> 系数，
  getShopInformations(){
    var that = this
    wx.request({
      url: 'https://freeman535.coding.net/p/DataBase/d/data_base/git/raw/master/new_info.json?download=true',
      method:"GET",
      success(res){
        console.log(res.data['main'])
        var tempXS = {}
        for (var i in res.data['main']){
          tempXS[res.data['main'][i]['条码']] = Number(res.data['main'][i]['规格3'])
          
        }
        that.setData({
          codetoxs:tempXS
        })
      }
    })
  },

  getPc(){
    var that = this
    wx.request({
      url: 'https://freeman535.coding.net/p/DataBase/d/data_base/git/raw/master/WeChatProgram/pc.json?download=false',
      method:"GET",
      success(res){
        console.log(res)
        
        that.setData({
          codepc: res.data['main']
        })
      }
    })
  },

  check(){
    var that = this
    var xsdjg = 0
    var ddje = 0
    var js = 0
    this.setData({
      upchecked: false,
      xsdje:0,
      jsnum:0
    })
    var oldlist = that.data.list_back
    for (var i in oldlist){
      if ( i > 0 ){
        xsdjg = xsdjg + Number(oldlist[i]['xj_2'])
        js = js + oldlist[i]['js_num']
        if (oldlist[i]['js_num'] == 0 ||  oldlist[i]['pp'] == 'ERROR' || oldlist[i]['ddjj'] < oldlist[i]['xsdjj']){
          console.log('经过检查 行数 ' + i + ' 有问题。')
          var oldsi = oldlist[i]
          oldsi['color'] = 'red'
          oldlist.splice(i,1,oldsi)
        }else{
          if (oldlist[i]['color'] == 'red'){
            var oldsi = oldlist[i]
            oldsi['color'] = ''
            oldlist.splice(i,1,oldsi)
          }
        }
      }
      if ((Number(i) + 1) == oldlist.length){
        that.setData({
          list_back : oldlist,
          list_num : oldlist.length
        })
        wx.showModal({
          title: '提示',
          content: '如果红色提示可能：1、件数为0。  2、品牌为错误。  3、订单价格小于销售单价格。  ',
          success (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
        
      }
      that.setData({
        xsdje:xsdjg.toFixed(2),
        jsnum:js
      })
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "制作销售单"
    })
    wx.hideHomeButton({
      success: (res) => {},
    })
    this.getPc()
    this.get10to69()
    this.getShopInformations()
    console.log(app)
    this.getSelector()
    
    this.setData({
      token: app.globalData.OyToken
    })
  },
})