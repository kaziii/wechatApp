Page({
  data: {
    logs: [],
    grade: '高一',
    accessUserInfo: false
  },
  chooseMsg: function () {
    wx.navigateTo({
      url: '../userMsg/userMsg'
    })
  },
  enterOrder: function () {
    wx.navigateTo({
      url: '../order/order',
    })
  },
  onShow: function () {
    //页面显示
    var App = getApp();

    this.setData({ 
      accessUserInfo: App.globalData.accessUserInfo
     })
  }
})
