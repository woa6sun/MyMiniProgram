// pages/xzcfDetail/xzcfDetail.js
var app = getApp().globalData;
var orgTop = app.info.windowHeight - 120;
var orgLeft = app.info.windowWidth - 90;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    errMsg:"",
    detail:{},
    top: orgTop + 'px',
    left: orgLeft + 'px',
    showmenus: true,
    isCollected: ""
  },

  //移动悬浮图标
  setTouchMove: function (e) {
    //此处clientY与clientX为拖动悬浮窗超过设定的大小会返回默认显示位置
    if (e.touches[0].clientX < app.info.screenWidth && e.touches[0].clientY < app.info.screenHeight && e.touches[0].clientX > 0 && e.touches[0].clientY > 0) {
      this.setData({
        left: (e.touches[0].clientX - 30) + 'px',
        top: (e.touches[0].clientY - 30) + 'px'
      })
    } else {
      this.setData({
        top: orgTop + 'px',//默认显示位置 left距离
        left: orgLeft + 'px'//默认显示位置 top距离
      })
    }
  },

  //跳转信用档案
  toSearchResult: function () {
    var _this = this;

    _this.toastedit.showToast('跳转信用档案详情中...', '', "loading");

    var searchword = _this.data.detail.cfXdrMc;

    let p = new Promise(function (resolve, reject) {
      wx.request({
        url: app.searchUrl,
        data: {
          flag: "1",
          searchword: searchword
        },
        success: function (res) {
          resolve(res);
        }, fail: function (res) {
          reject("失败");
        },complete:function(res){
          _this.toastedit.hideToast();
        }
      })
    })

    p.then(function (value) {
      if (value.statusCode != 200) {
        _this.toastedit.showToast('数据维护中，请稍后再试', 2000);
        return;
      }

      if (value.data.redirectType == '3') {
        wx.redirectTo({
          url: '../noresulttip/noresulttip',
        })
      } else if (value.data.redirectType == '1') {

        getApp().globalData.searchDetail = value.data.datas;
        wx.navigateTo({
          url: '../searchresult/searchresult',
        })

      }

    }).catch(function (err) {
      console.log(err);
      _this.setData({
        errMsg: "数据维护中，请稍后再试"
      })
    });

  },

  //悬浮按钮子菜单显示
  showMenu: function (e) {
    let flag = !this.data.showmenus;
    this.setData({
      showmenus: flag
    })

  },

  //收藏操作
  collection: function () {
    var _this = this

    if (!_this.data.isCollected) {
      var storageList = wx.getStorageSync('key')

      var obj = new Object();
      obj.type = 2;
      obj.fid = _this.data.detail.id;
      obj.name = _this.data.detail.cfXdrMc;
      obj.time = getApp().getTime();

      if (storageList.length < 20) {
        storageList.unshift(obj);
      } else {
        storageList.pop();
        storageList.unshift(obj);
      }

      wx.setStorageSync("key", storageList);


      _this.setData({
        isCollected: true
      })

      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        duration: 2000
      })

    } else {
      wx.showModal({
        title: '提示',
        content: '是否取消收藏？',
        cancelText: '离开',
        confirmText: '确定',
        success(res) {
          if (res.confirm) {
            var list = wx.getStorageSync('key');
            var index;
            for (var i in list) {
              if (list[i].type == 1 && list[i].fid == _this.data.detail.fid) {
                index = i;
                break;
              }
            }

            list.splice(index, 1);
            wx.setStorageSync('key', list);

            _this.setData({
              isCollected: false
            })

            wx.showToast({
              title: '已取消',
              duration: 2000
            })


          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    let fid = options.fid;
    let p = new Promise(function (resolve, reject) {
      wx.request({
        url: app.detailUrl,
        data: {
          type: "2",
          fid: fid
        },
        success: function (res) {
          resolve(res);
        }, fail: function (res) {
          reject("失败");
        }
      })
    })

    p.then(function (value) {
      let a = value.data;
      let flag = getApp().isCollected(2, a.id);

      _this.setData({
        detail: a,
        isCollected:flag,
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
