// toast/toast.js
Component({
  /**
   * 组件的属性列表
   */

  options: {
    multipleSlots: true 
  },  

  properties: {
    toastText: {           
      type: String,
      value: '内容'
    },
    
    icon: {
      type: String,
      value: ""
    }  
      
  },

  /**
   * 组件的初始数据
   */
  data: {
    toastShow: false,  
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showToast(text, time, icon)  {
      var src = "";

      if (icon == 'loading') {
        src = "../images/loading.gif"
      }


      this.setData({
        toastShow:  !this.data.toastShow,
        toastText:  text,
        icon: src
      })

      var  that  =  this

      if (time != undefined && time != '') {
        setTimeout(function () {
          that.setData({
            toastShow: false
          })
        }, time)
      }


    },

    hideToast() {
      this.setData({
        toastShow: false
      })
    }


    }  

  
})
