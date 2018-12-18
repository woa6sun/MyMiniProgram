Page({

  /**
   * 页面的初始数据
   */
  data: {

    tableData: [{ //模拟动态获取到的后台数据：数组对象格式
      id: 0,
      name: 'table-th-cell'
    },
    {
      id: 1,
      name: 'table-th-cell'
    },
    {
      id: 2,
      name: 'table-th-cell'
    },
    {
      id: 3,
      name: 'table-tr111-cell'
    },
    {
      id: 4,
      name: 'table-tr111-cell'
    },
    {
      id: 5,
      name: 'table-tr111-cell'
    },
    {
      id: 6,
      name: 'table-tr2-cell'
    },
    {
      id: 7,
      name: 'table-tr2-cell'
    },
    {
      id: 8,
      name: 'table-tr2-cell'
    },

    ],
    threeArray: '', //模拟将后台获取到的数组对象数据按照一行3个的单元数据的格式切割成新的数组对象（简单的说：比如获取到数组是9个元素，切分成，3个元素一组的子数组）

    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let threeArray = [];
    // 使用for循环将原数据切分成新的数组
    for (let i = 0, len = that.data.tableData.length; i < len; i += 3) {
      threeArray.push(that.data.tableData.slice(i, i + 3));
    }
    console.log(threeArray);
    that.setData({
      threeArray: threeArray
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