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
    classtime: ''
  },
  bindPickerChange: function (e) {

    this.setData({
      index: e.detail.value
    }, () => {
      this.getTotal(this);
    })
  },

  timebindPickerChange: function (e) {
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
  onLoad: function (options) {
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
  
  },
  toaddress: function () {
    wx.navigateTo({
      url: '../address/address',
    })
  },
  toselecttime: function () {
    wx.navigateTo({
      url: '../chooseTime/chooseTime',
    })
  }
})