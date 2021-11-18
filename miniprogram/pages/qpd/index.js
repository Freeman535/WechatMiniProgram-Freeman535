// pages/qpd/index.js
const db = wx.cloud.database()
const app = getApp()
const utils = require('../../utils/utils.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    useProgess:false,
    cateItems: [],
    curNav: 1,
    curIndex: 0,
    showMDText:'',
    isShowModal:false,
    inputVal:'',
    inputType:'text',

  },
  getKcUpTime(){
    const db = wx.cloud.database()
    const _ = db.command
    var that = this
    db.collection('pi').where({
      _id:'f4ef47fd616e1df301aa74852f21cee1'
    })
    .get({
      success:function(res){
        // console.log(res)
        var d = (new Date(res.data[0]['Date']))
        var youWant = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        that.setData({
          mes_date:String(youWant)
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      fdarray:app.globalData.OyFDH,
      dis_picker:false
    })
    this.getKcUpTime()
    wx.setNavigationBarTitle({
      title: "全品单"
    })
    wx.hideHomeButton({
      success: (res) => {},
    })
    wx.showLoading({
      title: '正在初始...',
      mask: true
    })
    this.onloadpi()

  },

  viewList(e){
    // console.log((e.currentTarget.dataset.index1), (e.currentTarget.dataset.index2), (e.currentTarget.dataset.index3))
    var temp = this.data.cateItems[e.currentTarget.dataset.index1]['children'][e.currentTarget.dataset.index2]['children_2'][e.currentTarget.dataset.index3]['children_3']
    

    if(this.data.dis_picker == true){
          //console.log(temp)
      wx.navigateTo({
        url: 'viewList/index?model=' + JSON.stringify(temp) + '&tjjh=' + JSON.stringify(this.data.tjjh) + '&tjbz=' + JSON.stringify(this.data.tjbz),
      })
    }else{
      wx.navigateTo({
        url: 'viewList/index?model=' + JSON.stringify(temp) + '&tjjh=&tjbz=',
      })
    }
    
  },
  searchbin(){
    this.setData({
      isShowModal:true,
      inputVal:''
      
    })
  },
  customBindInput(e){
    //console.log(e.detail)
    this.setData({
      inputVal: e.detail
    })
  },
  confirm(){
    var inp = this.data.inputVal
    this.setData({
      isShowModal:false
    })
    if ( inp != ''){

      wx.showToast({
        title: 'Searching...',
        icon: 'loading',
        mask: true
      })
      
      

  
      var items = this.data.cateItems
      var searchResult = []
      for (var a in items){
        for (var b in items[a]['children']){
          for (var c in items[a]['children'][b]['children_2']){
            for (var d in items[a]['children'][b]['children_2'][c]['children_3']){
  
              if(items[a]['children'][b]['children_2'][c]['children_3'][d]['code69'].indexOf(inp) != -1 || items[a]['children'][b]['children_2'][c]['children_3'][d]['name'].indexOf(inp) != -1 ){
                searchResult.push(items[a]['children'][b]['children_2'][c]['children_3'][d])
              }
     
            }
          }
        }
      }
      wx.hideToast()
      console.log(searchResult)
      if( searchResult.length <= 0){
        wx.showModal({
          title: '提示',
          content: '查无此结果',
          showCancel: false,
          success (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
        
        
      }else{
        if(this.data.dis_picker == true){
          //console.log(temp)
      wx.navigateTo({
        url: 'viewList/index?model=' + JSON.stringify(searchResult) + '&tjjh=' + JSON.stringify(this.data.tjjh) + '&tjbz=' + JSON.stringify(this.data.tjbz),
      })
    }else{
      wx.navigateTo({
        url: 'viewList/index?model=' + JSON.stringify(searchResult) + '&tjjh=&tjbz=',
      })
    }
      }

    }


  },
  cancle(){
    // 取消键
    this.setData({
      isShowModal: false,
      inputVal:''
    })
  },

  // 选择门店
  checkStore(e){
    var that = this
    console.log(e)
    var tempShow = this.data.fdarray[e.detail.value]['FDBH']
    this.setData({
      showMDText: tempShow,
      fdbh_in:e.detail.value,
      dis_picker:true,
      useProgess:true
    })
    utils.anaKc(tempShow).then(res => {
      that.setData({
        tjjh : res[1],
        tjbz : res[0]
      })
      var templ = that.data.cateItems
      for( var a in templ){ // 2ji
        for( var b in templ[a]['children']){ //3ji
          for (var c in templ[a]['children'][b]['children_2']){ //4ji
            templ[a]['children'][b]['children_2'][c]['progess'] = 0
            var tempnum = 0
            for (var d in templ[a]['children'][b]['children_2'][c]['children_3']){
              if (that.data.tjbz.hasOwnProperty(templ[a]['children'][b]['children_2'][c]['children_3'][d]['code69'])){
                if(that.data.tjbz[templ[a]['children'][b]['children_2'][c]['children_3'][d]['code69']].indexOf('无库存') == -1){
                  templ[a]['children'][b]['children_2'][c]['progess'] = ( (tempnum + 1)/templ[a]['children'][b]['children_2'][c]['children_3'].length) * 100
                  tempnum = tempnum + 1
                }
              }
            }
          }
        }
      }
      that.setData({
        cateItems: templ
      })
    })


  },

  
  //事件处理函数  
  switchRightTab: function (e) {
    // 获取item项的id，和数组的下标值  
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index  
    this.setData({
      curNav: id,
      curIndex: index
    })
  },

  onloadpi(){
    var that = this
    wx.cloud.callFunction({
      name: 'getAll',
      data: {
        name: 'pi'
      },
      success(res){
        var arr = res.result.data
        var tempAllList = []
        var templb1 = []
        var templb2 = []
        var templb3 = []
        var tempcode = []

        for (var i in arr){
          if(templb1.indexOf(arr[i]['lb2']) != -1 ){
            // 存在类别2
            if(templb2.indexOf(arr[i]['lb3']) != -1){
              // 存在类别3
              if (templb3.indexOf(String(arr[i]['lb3'] + arr[i]['lb4'])) != -1){
                // 存在类别4
                if (tempcode.indexOf(arr[i]['code69']) != -1 && arr[i]['kc'] > 0){
                  // 存在条码 且 库存大于0
                  for (var h in tempAllList){
                    if (tempAllList[h]['cate_name'] == arr[i]['lb2']){
                      for( var j in tempAllList[h]['children']){
                        if (tempAllList[h]['children'][j]['cate_2_name'] == arr[i]['lb3']){
                          for (var k in tempAllList[h]['children'][j]['children_2']){
                            if (tempAllList[h]['children'][j]['children_2'][k]['cate_3_name'] == arr[i]['lb4']){
                              for( var l in tempAllList[h]['children'][j]['children_2'][k]['children_3']){
                                if(tempAllList[h]['children'][j]['children_2'][k]['children_3'][l]['name'] == arr[i]['name']){
                                  tempAllList[h]['children'][j]['children_2'][k]['children_3'][l]['kc'] = arr[i]['kc'] + tempAllList[h]['children'][j]['children_2'][k]['children_3'][l]['kc']
                                  break
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }



                }else{
                  for (var e in tempAllList){
                    if (tempAllList[e]['cate_name'] == arr[i]['lb2']){
                      for( var f in tempAllList[e]['children']){
                        if (tempAllList[e]['children'][f]['cate_2_name'] == arr[i]['lb3']){
                          for (var g in tempAllList[e]['children'][f]['children_2']){
                            if (tempAllList[e]['children'][f]['children_2'][g]['cate_3_name'] == arr[i]['lb4']){
                              tempAllList[e]['children'][f]['children_2'][g]['children_3'].push({
                                child_id : tempAllList[e]['children'][f]['children_2'][g]['children_3'].length + 1,
                                name:arr[i]['name'],
                                bid: arr[i]['bid'],
                                code69: arr[i]['code69'],
                                gg1: arr[i]['gg1'],
                                kc: arr[i]['kc'],
                                pic_address: arr[i]['pic_address'],
                                sale:arr[i]['sale']
                              })
                              tempcode.push(arr[i]['code69'])
                              break
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }else{
                for(var c in tempAllList){
                  if (tempAllList[c]['cate_name'] == arr[i]['lb2']){
                    for (var d in tempAllList[c]['children']){
                      if (tempAllList[c]['children'][d]['cate_2_name'] == arr[i]['lb3']){
                        tempAllList[c]['children'][d]['children_2'].push({
                          cate_3_id: tempAllList[c]['children'][d]['children_2'].length + 1,
                          cate_3_name: arr[i]['lb4'],
                          ishaveChild:true,
                          children_3: [{
                            child_id : 1,
                            name:arr[i]['name'],
                            bid: arr[i]['bid'],
                            code69: arr[i]['code69'],
                            gg1: arr[i]['gg1'],
                            kc: arr[i]['kc'],
                            pic_address: arr[i]['pic_address'],
                            sale:arr[i]['sale']
                          }]
                        }) // ---------
                        templb3.push(String(arr[i]['lb3']+arr[i]['lb4']))
                        tempcode.push(arr[i]['code69'])
                        break

                      }
                    }
                  }
                }
              }
            }else{
              for (var b in tempAllList){
                if (tempAllList[b]['cate_name'] == arr[i]['lb2']){
                  tempAllList[b]['children'].push({
                    cate_2_id: tempAllList[b]['children'].length + 1,
                    cate_2_name: arr[i]['lb3'],
                    ishaveChild:true,
                    children_2 :[{
                      cate_3_id: 1,
                      cate_3_name: arr[i]['lb4'],
                      ishaveChild:true,
                      children_3: [{
                        child_id : 1,
                        name:arr[i]['name'],
                        bid: arr[i]['bid'],
                        code69: arr[i]['code69'],
                        gg1: arr[i]['gg1'],
                        kc: arr[i]['kc'],
                        pic_address: arr[i]['pic_address'],
                        sale:arr[i]['sale']
                      }]
                    }]
                  })
                  templb2.push(arr[i]['lb3'])
                  templb3.push(arr[i]['lb4'])
                  tempcode.push(arr[i]['code69'])
                  break
                }
              }
            }
          }else if(arr[i]['_id'] != 'f4ef47fd616e1df301aa74852f21cee1'){
            tempAllList.push({
              cate_id: tempAllList.length + 1,
              cate_name: arr[i]['lb2'],
              ishaveChild:true,
              children:[{
                cate_2_id: 1,
                cate_2_name: arr[i]['lb3'],
                ishaveChild:true,
                children_2 :[{
                  cate_3_id: 1,
                  cate_3_name: arr[i]['lb4'],
                  ishaveChild:true,
                  children_3: [{
                    child_id : 1,
                    name:arr[i]['name'],
                    bid: arr[i]['bid'],
                    code69: arr[i]['code69'],
                    gg1: arr[i]['gg1'],
                    kc: arr[i]['kc'],
                    pic_address: arr[i]['pic_address'],
                    sale:arr[i]['sale']
                  }]
                }]
              }]
            })
            templb1.push(arr[i]['lb2'])
            templb2.push(arr[i]['lb3'])
            templb3.push(arr[i]['lb4'])
            tempcode.push(arr[i]['code69'])
          }
        }
        that.setData({
          cateItems: tempAllList
        })
        wx.hideLoading({})
        console.log(res)

        // that.setData({
        //   array: res.result.data
        // })
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