var moment = require('../../utils/moment');
// orders.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: true,
    selected1: false,
    selected2: false,
    selected3: false,
    selected4: false,
    orderList: [],
    typeMap: {
      notConfirmation: '待确认',
      cancel: '取消',
      ing: '进行中'
    }
  },
  selected: function (e) {
    this.setData({
      selected1: false,
      selected2: false,
      selected3: false,
      selected4: false,
      selected: true
    })
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected2: false,
      selected3: false,
      selected4: false,
      selected1: true
    })
  },
  selected2: function (e) {
    this.setData({
      selected: false,
      selected2: true,
      selected3: false,
      selected4: false,
      selected1: false
    })
  },
  selected3: function (e) {
    this.setData({
      selected: false,
      selected2: false,
      selected3: true,
      selected4: false,
      selected1: false
    })
  },
  selected4: function (e) {
    this.setData({
      selected: false,
      selected2: false,
      selected3: false,
      selected4: true,
      selected1: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (cb1, cb2) {

    var App = getApp();
    console.log(App.globalData)
    wx.request({
      url: 'http://localhost:3000/order/all',
      method:'GET',
      data: {
        userId: App.globalData.unionId
      },
      success: response => {

        this.setData({
          orderList: response.data
        }, () => {
          if(cb1 && cb2) {
            cb1();
            cb2();
          }
        })
      }
    })
  },

  submit: function (e) {
    const orderId = e.target.dataset.id

    wx.request({
      url: `http://localhost:3000/order/${orderId}`,
      data: {
        orderType: 'ing'
      },
      method: 'POST',
      success: rsp => {
        console.log(rsp)
        if(rsp.data.success) {
          this.onLoad();
        }
      }
    })
  },

  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载

    this.onLoad(wx.hideNavigationBarLoading(),wx.stopPullDownRefresh)
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