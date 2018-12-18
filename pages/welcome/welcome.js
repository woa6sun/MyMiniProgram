
var queryKeyWords = ["广东省", "广东", "广州市", "广州", "有限公司", "有限责任公司", "深圳市", "深圳", "珠海市", "珠海", "惠州市", "惠州", "韶关市", "韶关", "汕头市", "汕头", "河源市", "河源", "梅州市", "梅州", "汕尾市", "汕尾", "东莞市", "东莞", "中山市", "中山", "江门市", "江门", "佛山市", "佛山", "阳江市", "阳江", "湛江市", "湛江", "茂名市", "茂名", "肇庆市", "肇庆", "清远市", "清远", "潮州市", "潮州", "公司"];

var app = getApp().globalData;
var orgTop = app.info.windowHeight - 120;
var orgLeft = app.info.windowWidth - 90;

Page({

  /**
   * 页面的初始数据
   */
  data:{
    
      curHdIndex: 0,

      xzxkCount:0,
      xzcfCount:0,
      sxbzxrCount:0,

      message:"查看更多信息，请前往信用广东网（www.gdcredit.gov.cn)",
      errMsg:"",

      searchword:"",

      isShow:true,
      text:"请输入查询条件",
      top: orgTop+'px',
      left: orgLeft+'px'
  },

  //跳转我的收藏列表
  toMyCollection:function(e){
    wx.navigateTo({
      url: '../mystorage/mystorage',
    })
  },


  //移动悬浮图标
  setTouchMove:function(e){
    //此处clientY与clientX为拖动悬浮窗超过设定的大小会返回默认显示位置
    if (e.touches[0].clientX < app.info.screenWidth && e.touches[0].clientY < app.info.screenHeight && e.touches[0].clientX > 0 && e.touches[0].clientY > 0) {
      this.setData({
        left: (e.touches[0].clientX-30)+'px',
        top: (e.touches[0].clientY-30)+'px'
      })
    } else {
      this.setData({
        top: orgTop + 'px',//默认显示位置 left距离
        left: orgLeft + 'px'//默认显示位置 top距离
      })
    }
  },

  //导航列表切换
  tab: function (e) {
    var dataId = e.currentTarget.id;
   
    
    this.setData({
      curHdIndex:dataId,
    })
  },  

  change:function(e){
    console.log(e);
    
    this.setData({
      curHdIndex: e.detail.current
    });

  },
  
  //获取查询框的值
  getValue:function(e){
     let word = e.detail.value;
     console.log(word);
     this.setData({
       searchword:word
     })

  },

  //点击查询功能
  search:function(){
    var _this = this;
    let searchword = _this.data.searchword;
   

    if(searchword == ''){
      _this.toastedit.showToast('请输入查询条件', 2000)
       return false;
    }

    for (let i = 0;i<queryKeyWords.length;i++){
      if(queryKeyWords[i] == searchword){
        _this.toastedit.showToast(searchword+'不能单独为查询条件！', 2000)
        return false;
      }
    }



    wx.showLoading({
      title:"查询中",
      mask:true
    })

     let p = new Promise(function(resolve,reject){
        wx.request({
          url: app.searchUrl,
          data:{
            searchword:searchword
          },
          success:function(res){
              resolve(res)
          },
          fail:function(res){
              reject(res)
          },complete:function(res){
            wx.hideLoading()
          }
        })
     })

    p.then(function(value){
      if (value.statusCode != 200){
        _this.toastedit.showToast('数据维护中，请稍后再试', 2000);
        return;
      }

      if (value.data.redirectType == '3'){
        wx.redirectTo({
          url: '../noresulttip/noresulttip',
        })
      }else if(value.data.redirectType == '2'){
        getApp().globalData.searchResultList = value.data.searchResultList;
        getApp().globalData.totalCount = value.data.totalCount;
        wx.navigateTo({
          url: '../querylist/querylist',
        })
      }else if(value.data.redirectType == '1'){
        
        getApp().globalData.searchDetail = value.data.datas;
        wx.navigateTo({
          url: '../searchresult/searchresult',
        })
       
      }

    }).catch(function (err) {
      console.log(err);
      _this.toastedit.showToast('数据维护中，请稍后再试', 2000)
    });


  },

  //跳转详情
  toDetail:function(e){
      let fid = e.currentTarget.dataset.fid;
      let _type = e.currentTarget.dataset.type;
      let url = "";

      switch(_type){
        case "1":
          url = "../xzxkdetail/xzxkdetail?fid="+fid
        break;

        case "2":
          url = "../xzcfdetail/xzcfdetail?fid="+fid
        break;

        case "3":
          url = "../sxbzxrdetail/sxbzxrdetail?fid="+fid
        break;

      }

    wx.navigateTo({
      url:url,
    })

  },
  
  // 上拉加载更多
  loadMore:function(){
   var _this = this;

    let a = _this.data.curHdIndex;
    switch(a){
        case 0:
        let count = _this.data.xzxkCount;
          count+=5;
          if(count<=50){
            wx.showLoading({
              title: '加载中',
              mask:true
            })
            let arr = [];
            
            let p = new Promise(function(resolve,reject){
              wx.request({
                url: app.loadListUrl,
                data:{
                    type:"1",
                    xzxkCount:count
                },
                success: function (res) {
                  resolve(res);
                }, fail: function (res) {
                  reject("失败");
                }
            })
            })

            p.then(function (value) {
              arr = value.data;

              _this.setData({
                xzxkdatas: arr,
                xzxkCount: count,
              })

              setTimeout(function () {
                wx.hideLoading();
              }, 1000)
             

            }).catch(function (err) {
              console.log(err);
            });

            

          }

          break;
        case 1:
        let count1 = _this.data.xzcfCount;
        count1 += 5;
        if (count1 <= 50) {
          wx.showLoading({
            title: '加载中',
            mask: true
          })
         let arr1 = []

          let p1 = new Promise(function (resolve, reject) {
            wx.request({
              url: app.loadListUrl,
              data: {
                type: "2",
                xzcfCount: count1
              },
              success: function (res) {
                resolve(res);
              }, fail: function (res) {
                reject("失败");
              }
            })
          })

          p1.then(function (value) {
            arr1 = value.data;

            _this.setData({
              xzcfdatas: arr1,
              xzcfCount: count1,
            })

            setTimeout(function () {
              wx.hideLoading();
            }, 1000)


          }).catch(function (err) {
            console.log(err);
          });



         
        } 

          break;
        case 2:
        let count2 = _this.data.sxbzxrCount;
        count2 += 5;
        if (count2 <= 50) {
          wx.showLoading({
            title: '加载中',
            mask: true
          })
          let arr2 = [];
          let p2 = new Promise(function (resolve, reject) {
            wx.request({
              url: app.loadListUrl,
              data: {
                type: "3",
                sxbzxrCount: count2
              },
              success: function (res) {
                resolve(res);
              }, fail: function (res) {
                reject("失败");
              }
            })
          })

          p2.then(function (value) {
            arr2 = value.data;

            _this.setData({
              sxbzxrdatas: arr2,
              sxbzxrCount: count2,
            })

            setTimeout(function () {
              wx.hideLoading();
            }, 1000)


          }).catch(function (err) {
            console.log(err);
          });

        } 


          break;    


    }
    


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var _this = this;

    let a = [];

    let b = [];

    let c = [];

    let p = new Promise(function(resolve,reject){
        wx.request({
          url: app.initListUrl,
          success:function(res){
            resolve(res);
          },fail:function(res){
              reject("失败");
          }
        })

    })

    p.then(function(value){
      console.log(value.data);
      a = value.data.xzxkDatas;
      b = value.data.xzcfDatas;
      c = value.data.sxbzxrDatas;

      _this.setData({
        xzxkdatas: a,
        xzcfdatas: b,
        sxbzxrdatas: c,
        xzxkCount: a.length,
        xzcfCount: b.length,
        sxbzxrCount: c.length,
      })

    }).catch(function (err) {
        console.log(err);
        _this.setData({
          errMsg:"数据维护中，请稍后再试"
        })
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.toastedit = this.selectComponent("#toastedit")
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