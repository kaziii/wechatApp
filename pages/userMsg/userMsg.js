// pages/userMsg/userMsg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    listKeyMap: {
      nickName: {name:'姓名'},
      language: {name:'语言'},
      city: {name:'城市'},
      province: {name:'省份'},
      country: {name:'国家'},
      phone: { name: '电话', Placeholder: '未认证电话', active: 'Certificationsms'},
      email: { name: "邮箱", Placeholder: '未认证邮箱', active: 'Certificationeamail'},
      class: {name:'年级'},
      Subject: {name:'科目'}
    }
  },
  Certificationsms: function (e) {

    wx.navigateTo({
      url: '../certPhone/certPhone',
    })
  },
  Certificationeamail: function (e) {
    wx.navigateTo({
      url: '../certEmail/certEmail',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var App = getApp();
    const unionId = App.globalData.unionId;

    wx.request({
      url: 'http://localhost:3000/login/getUser',
      method: 'GET',
      data: {
        openId: unionId
      },
      success: rsp => {
        let item = rsp.data;

        delete item.avatarUrl;
        delete item.unionId;
        delete item.emailCode;
        delete item.emailDate;
        delete item.emailIslive;

        this.setData({
          userInfo: item
        })
      }
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