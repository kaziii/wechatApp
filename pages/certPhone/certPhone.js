function isPhoneNum(str) {
  return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str)
}
let wait = 60;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    countdown: '发送验证码'
  },
  setPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  countdownFunc: function () {
    var that = this;
    wait--;
    if(wait == 0) {
      this.setData({
        countdown: '发送验证码'
      },() => {
        wait = 60;
      })
    } else {
      this.setData({
        countdown: wait
      }, ()=> {
        setTimeout(function () {
          that.countdownFunc();
        },1000)
      })
    }
  },
  sendSms: function () {
    var that = this;
    if(!isPhoneNum(this.data.phone)) {
      wx.showToast({
        title: '手机号错误',
        icon: 'none',
        duration: 2000,
        complete: function () {
          that.setData({
            phone: ''
          })
        }
      })
    } else {
      this.countdownFunc();
      console.error('正确')
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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