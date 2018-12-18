var app = getApp().globalData;

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    count:0
  },

  toDetail:function(e){
    let _type = e.currentTarget.dataset.type;
    let fid = "";
    let tydm = "";

    switch(_type){
      case 1:
        fid = e.currentTarget.dataset.fid;
        wx.navigateTo({
          url: "../xzxkdetail/xzxkdetail?fid=" + fid,
        })
        break;

      case 2:
        fid = e.currentTarget.dataset.fid;
        wx.navigateTo({
          url: "../xzcfdetail/xzcfdetail?fid=" + fid,
        })
        break;

      case 3:
        fid = e.currentTarget.dataset.fid;
        wx.navigateTo({
          url: "../sxbzxrdetail/sxbzxrdetail?fid=" + fid,
        })
        
        break;

      case 4:
        tydm = e.currentTarget.dataset.tydm;

        _this.toastedit.showToast('前往信用档案详情中...', "", "loading")

        let p = new Promise(function (resolve, reject) {
          wx.request({
            url: app.searchUrl,
            data: {
              searchword: tydm
            },
            success: function (res) {
              resolve(res)
            },
            fail: function (res) {
              reject(res)
            }, complete: function (res) {
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
          _this.toastedit.showToast('数据维护中，请稍后再试', 2000)
        });

        break;
    }


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var collectionList = wx.getStorageSync("key");
    if(collectionList !=undefined && collectionList.length >0){
      console.log(collectionList[0]);

      this.setData({
        collectionList:collectionList,
        count:collectionList.length
      })
    }
  },

  deleteCollection:function(e){
    var _this = this;
    var fid = e.currentTarget.dataset.fid;
    var tydm = e.currentTarget.dataset.tyshxydm
    var _type = e.currentTarget.dataset.type;
    var list = this.data.collectionList;
    var index;

    wx.showModal({
      title: '提示',
      content: '是否取消该收藏？',
      cancelText: '离开',
      confirmText: '确定',
      success(res) {
        if (res.confirm) {
          

          for (var i in list) {
            if (list[i].type == _type && (list[i].tyshxydm == tydm || list[i].fid == fid)) {
              index = i;
              break;
            }
          }

          list.splice(index, 1);
          wx.setStorageSync("key", list);
          _this.setData({
            collectionList: list,
            count:list.length
          })

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

    
    

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