// pages/querylist/querylist.js
var app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  toDetail:function(e){
    var _this = this;

    var id = e.currentTarget.dataset.id;
    _this.toastedit.showToast('前往信用档案详情中...', '', "loading");

    let p = new Promise(function(resolve,reject){
      wx.request({
        url: app.searchUrl,
        data:{
          searchword:id
        },
        success:function(res){
            resolve(res);
        },
        fail:function(res){
            reject(res);
        },
        complete:function(res){
          _this.toastedit.hideToast();
        }

      })
    });

    p.then(function(value){
      if (value.statusCode == 200){
        getApp().globalData.searchDetail = value.data.datas
        wx.navigateTo({
          url: '../searchresult/searchresult',
        })
      }else{
        _this.toastedit.showToast('数据维护中，请稍后再试', 2000)
      }

    }).catch(function (err) {
      console.log(err);
      _this.toastedit.showToast('数据维护中，请稍后再试', 2000)
    });



  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var searchResultList = getApp().globalData.searchResultList;
    var totalCount = getApp().globalData.totalCount;
    this.setData({
      list:searchResultList,
      totalCount:totalCount
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
