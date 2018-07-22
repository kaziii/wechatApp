Page({
  data: {
    items: [
      { name: 'Monday', value: '周一'},
      { name: 'Tuesday', value: '周二'},
      { name: 'Wednesday', value: '周三' },
      { name: 'Thursday', value: '周四' },
      { name: 'Friday', value: '周五' },
      { name: 'Saturday', value: '周六' },
      { name: 'Sunday', value: '周日' },
    ],
    weekMap: {
      Monday: '周一',
      Tuesday:'周二',
      Wednesday: '周三',
      Thursday: '周四',
      Friday: '周五',
      Saturday: '周六',
      Sunday: '周日'
    },
    chooseWeek: []
  },
  checkboxChange: function (e) {
    
    let chooseWeek = e.detail.value;

    chooseWeek = chooseWeek.map((list) => {
      let item = {key: list, value: '请选择时间'};

      list = item;

      return list;
    })

    this.setData({
      chooseWeek: chooseWeek
    })
  },
  bindTimeChange: function(e) {
    var that = this;
    let newchooseWeek = that.data.chooseWeek;
    let key = e.target.dataset.item.key;

    newchooseWeek = newchooseWeek.map((list) => {

        if(list.key == key) {
          list.value = e.detail.value;
        }
        return list;
    })

    that.setData({
      chooseWeek: newchooseWeek
    })
  },
  submit: function () {
    var that = this;
    var chooseWeek = that.data.chooseWeek;
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    prevPage.setData({
      chooseWeek: chooseWeek
    }, () => {
      wx.navigateBack({
        delta: 1
      })
    })
  }
})