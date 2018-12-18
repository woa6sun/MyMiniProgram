//app.js
var urls = require("./data/page-data.js")
var utils = require("./utils/util.js")

App({
  globalData:{
      searchResultList:[],
      totalCount:"",
      searchDetail:{},
      searchUrl:"",
      loadListUrl:"",
      initListUrl:"",
      detailUrl:"",
      downloadUrl:"",
      info:wx.getSystemInfoSync()
  },
  onLaunch: function () {
    //wx.clearStorageSync();
    var storageList = wx.getStorageSync('key')
    if (storageList == undefined || storageList == "") {
      storageList = []
      wx.setStorageSync("key", storageList);
    }

    this.globalData.searchUrl = urls.searchUrl
    this.globalData.initListUrl = urls.initListUrl
    this.globalData.loadListUrl = urls.loadListUrl
    this.globalData.detailUrl = urls.detailUrl
    this.globalData.downloadUrl = urls.downloadUrl
  },

  isCollected:function(_type,_symbol){
    var flag = false;
    var list = wx.getStorageSync('key');

    for (var i in list) {
      if (list[i].type == _type && (list[i].fid == _symbol || list[i].tyshxydm)) {
          flag = true;
          return flag;
        }
    }

    return flag;

  } ,

  getTime:function(){
    return utils.formatDateTime();
  }

  


})
