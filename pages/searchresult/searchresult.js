var app = getApp().globalData;
var orgTop = app.info.windowHeight - 120;
var orgLeft = app.info.windowWidth - 90;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    //四大模块显示
    isIdentityInfo:true,
    isRegChange:true,
    isShareHolder:true,
    isOtherInfo:true,

    //其他信息中七大模块显示
    isXzxk:true,
    isXzcf:true,
    isGrade:true,
    isHonor:true,
    isJudgement:true,
    isOweTax:true,
    isOther:true,
    //判断企业或事业单位（组织机构）
    isEnterprise:true,

    top: orgTop + 'px',
    left: orgLeft + 'px',
    showmenus: true,

    isCollected:""
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

  //悬浮按钮子菜单显示
  showMenu: function (e) {
    let flag = !this.data.showmenus;
    this.setData({
      showmenus: flag
    })

  },

  //收藏操作
  collection:function(){
    var _this = this

    if(!_this.data.isCollected){
      var storageList = wx.getStorageSync('key')
      
        var obj = new Object();
        obj.type = 4;
        obj.tyshxydm = _this.data.model.tyshxydm;
        obj.name = _this.data.model.name;
        obj.time = getApp().getTime();

        if(storageList.length<20){
          storageList.unshift(obj);
        }else{
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
      
    }else{
      wx.showModal({
        title: '提示',
        content: '是否取消收藏？',
        cancelText:'离开',
        confirmText:'确定',
        success(res) {
          if (res.confirm) {
            var list = wx.getStorageSync('key');
            var index;
            for(var i in list){
              if (list[i].type == 4 && list[i].tyshxydm == _this.data.model.tyshxydm){
                  index = i;
                  break;
              }
            }

            list.splice(index, 1); 
            wx.setStorageSync('key', list);

            _this.setData({
              isCollected:false
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
    var detail = getApp().globalData.searchDetail; 

    var obj = {}
    if (detail.qybaseinfo != undefined){
      obj = detail.qybaseinfo
    }else {
      this.setData({
        isEnterprise: false,
        isShareHolder: false
      })

      obj = detail.shzzbaseinfo
      if (detail.sydwbaseinfo != undefined){
        obj = detail.sydwbaseinfo
      } else if (detail.shzzbaseinfo != undefined){
        obj = detail.shzzbaseinfo
      }
       

    }

    var flag = getApp().isCollected(4, detail.model.tyshxydm);


    this.setData({
      ObjectInfo:detail,
      model:detail.model,
      baseInfo: obj,
      regInfo:detail.timeMap,
      xzxk:detail.xzxk,
      xzcf:detail.xzcf,
      djpd:detail.djpd,
      ryxx:detail.ryxx,
      sfcd:detail.sfcd,
      qsqf:detail.qsqf,
      qtxx:detail.qtxx,
      isCollected:flag
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
    
  },

 hideOrShow:function(e){
  var id =  e.currentTarget.id;
  switch(id){
    case "identityInfo":
      if(this.data.isIdentityInfo){
        this.setData({
          isIdentityInfo:false
        })
      }else{
        this.setData({
          isIdentityInfo: true
        })
      }
    break;
    case "regChange":
      if (this.data.isRegChange) {
        this.setData({
          isRegChange: false
        })
      } else {
        this.setData({
          isRegChange: true
        })
      }
      break;
    case "shareholder":
      if (this.data.isShareHolder) {
        this.setData({
          isShareHolder: false
        })
      } else {
        this.setData({
          isShareHolder: true
        })
      }
      break;
    case "otherInfo":
      if (this.data.isOtherInfo) {
        this.setData({
          isOtherInfo: false
        })
      } else {
        this.setData({
          isOtherInfo: true
        })
      }
      break;
  }
 },

  classHideOrShow:function(e){
    var id = e.currentTarget.id;
    switch (id) {
      case "isXzxk":
        if (this.data.isXzxk) {
          this.setData({
            isXzxk: false
          })
        } else {
          this.setData({
            isXzxk: true
          })
        }
        break;
      case "isXzcf":
        if (this.data.isXzcf) {
          this.setData({
            isXzcf: false
          })
        } else {
          this.setData({
            isXzcf: true
          })
        }
        break;
      case "isGrade":
        if (this.data.isGrade) {
          this.setData({
            isGrade: false
          })
        } else {
          this.setData({
            isGrade: true
          })
        }
        break;
      case "isHonor":
        if (this.data.isHonor) {
          this.setData({
            isHonor: false
          })
        } else {
          this.setData({
            isHonor: true
          })
        }
        break;
      case "isJudgement":
        if (this.data.isJudgement) {
          this.setData({
            isJudgement: false
          })
        } else {
          this.setData({
            isJudgement: true
          })
        }
        break;
      case "isOweTax":
        if (this.data.isOweTax) {
          this.setData({
            isOweTax: false
          })
        } else {
          this.setData({
            isOweTax: true
          })
        }
        break;
      case "isOther":
        if (this.data.isOther) {
          this.setData({
            isOther: false
          })
        } else {
          this.setData({
            isOther: true
          })
        }
        break;
    }


  },


    download:function(e){
      var fid = e.currentTarget.dataset.id;
      var _this = this;
      var fileName = _this.data.model.name; 
      var contentmessage = "苹果手机只支持在线预览，";
      
      _this.toastedit.showToast('信用档案下载中...', '', "loading");

      var aa = wx.getFileSystemManager();
      wx.downloadFile({
        url: app.downloadUrl+fid,
        
        success: function (res) {
          var filePath = res.tempFilePath;
          console.log("文件路径为：")
          console.log(filePath);
          
          
         
          wx.saveFile({
            tempFilePath: filePath,
            success:function(res){
              console.log("保存成功");
              console.log(res.savedFilePath)
              var savePath = res.savedFilePath;
              console.log(wx.env.USER_DATA_PATH);

              const sysInfo = wx.getSystemInfoSync();
              var reviewPath = savePath;

              
              _this.toastedit.hideToast();

              if(sysInfo.platform != 'ios'){
                contentmessage = "下载完成，";
                var path = wx.env.USER_DATA_PATH + '/' + fileName +'.pdf';

                aa.renameSync(
                  savePath, path
                );
                reviewPath = path;
                console.log("预览路径："+reviewPath)
              }
              

              


              wx.showModal({
                title: '提示',
                content: contentmessage+'是否打开文件预览？',
                confirmText:'打开',
                success(res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                    wx.openDocument({
                      filePath: reviewPath,
                      fileType: "pdf",
                      success: function (res) {
                        console.log(reviewPath);
                        console.log("打开成功");
                      }
                    })

                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
              
            }
          })

         
         
        },
        fail:function(res){},
        complete:function(res){}
      })
     }



});