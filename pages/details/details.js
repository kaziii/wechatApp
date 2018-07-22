// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {},
    schoolMap: {
      juniorhighschool: '初中',
      highschool: '高中',
      primaryschool: '小学'
    },
    array: ['28次', '29次', '30次', '31次', '32次'],
    timearray: ['2小时', '2.5小时', '3小时', '3.5小时', '4小时', '4.5小时', '5小时'],
    index: 0,
    timeindex: 0,
    totaltime: '',
    totalPrice: '',
    address: '',
    detail: '',
    classtime: '',
    chooseWeek: [],
    weekMap: {
      Monday: '周一',
      Tuesday: '周二',
      Wednesday: '周三',
      Thursday: '周四',
      Friday: '周五',
      Saturday: '周六',
      Sunday: '周日'
    },
  },
  bindPickerChange: function(e) {

    this.setData({
      index: e.detail.value
    }, () => {
      this.getTotal(this);
    })
  },

  timebindPickerChange: function(e) {
    this.setData({
      timeindex: e.detail.value
    }, () => {
      this.getTotal(this);
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getTotal: (self) => {
    const array = self.data.array;
    const index = self.data.index;
    const timearray = self.data.timearray;
    const timeindex = self.data.timeindex;

    let totaltime = parseInt(array[index]) * parseFloat(timearray[timeindex]);
    let totalPrice = self.data.item.Price * totaltime;

    self.setData({
      totaltime: totaltime,
      totalPrice: totalPrice
    })
  },
  onLoad: function(options) {
    let item = JSON.parse(options.item);
    this.setData({
      item: item
    }, () => {
      this.getTotal(this);
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  toaddress: function() {
    wx.navigateTo({
      url: '../address/address',
    })
  },
  toselecttime: function() {
    wx.navigateTo({
      url: '../chooseTime/chooseTime',
    })
  },
  postorder: function() {
    var that = this;
    wx.showModal({
      title: '确认提交订单?',
      cancelText: '我在看看',
      confirmText:'确认提交',
      content: '提交后将会以短信或邮件通知老师~',
      success: function(res) {
        if (res.confirm) {
          var app = getApp();
          const unionId = app.globalData.unionId;
          const techerId = that.data.item.unionId;
          const techerName = that.data.item.nickName;
          const address = that.data.item.address + that.data.item.detail;
          const type = 'onemore';
          const classTime = JSON.stringify(that.data.chooseWeek);
          const orderType = 'ing';

          console.log(classTime)
          wx.request({
            url: 'http://localhost:3000/order',
            method: 'POST',
            data: {
              unionId: unionId,
              techerId: techerId,
              techerName: techerName,
              type: type,
              classTime: classTime,
              orderType: orderType,
              address: address
            },
            success: function (response) {
              wx.navigateTo({
                url: '../order/order',
              })
            }
          })

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})