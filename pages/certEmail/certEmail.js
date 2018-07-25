function isEmail (str) {
  return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(str);
}
let wait = 300;
// pages/certEmail/certEmail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    email: '',
    countdown: '发送验证邮件' 
  },
  setemail: function (e) {
    this.setData({
      email: e.detail.value
    })
  },
  countdownFunc: function () {
    var that = this;
    wait--;
    if (wait == 0) {
      this.setData({
        countdown: '发送验证邮件'
      }, () => {
        wait = 300;
      })
    } else {
      this.setData({
        countdown: wait
      }, () => {
        setTimeout(function () {
          that.countdownFunc();
        }, 1000)
      })
    }
  },
  getuser: function () {
    var that = this;
    wx.request({
      url: 'http://localhost:3000/login/getUser',
      data: {
        openId: getApp().globalData.unionId
      },
      success: function (response) {

        if (!response.emailIslive) {
          setTimeout(() => {
            that.getuser();
          }, 10000)
        } else {
          wx.navigateBack();
        }
      }
    })

  },
  sendemail: function (e) {
    const email = this.data.email;
    let App = getApp();
    let that = this;

    if (!isEmail(email)) {
      wx.showToast({
        title: '邮箱地址错误',
        icon: 'none',
        duration: 2000,
        complete: function () {
          that.setData({
            email: ''
          })
        }
      })
    } else {
      wx.request({
        url: 'http://localhost:3000/certEamil',
        data: {
          openId: App.globalData.unionId,
          email: that.data.email
        },
        success: rsp => {
          that.countdownFunc();
          that.getuser();
        }
      })
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