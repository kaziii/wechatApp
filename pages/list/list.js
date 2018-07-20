Page({
  data: {
    animate: 'myfirst',
    yesorno: 'none',
    flag: true,
    test: 'test1',
    teacherList: [],
    schoolMap: {
      juniorhighschool: '初中',
      highschool: '高中',
      primaryschool:'小学'
    }
  },
  tapMainMenu: function (e) {
    //		获取当前显示的一级菜单标识
    var index = parseInt(e.currentTarget.dataset.index);
    // 生成数组，全为hidden的，只对当前的进行显示
    var newSubMenuDisplay = initSubMenuDisplay();
    //		如果目前是显示则隐藏，反之亦反之。同时要隐藏其他的菜单
    if (this.data.subMenuDisplay[index] == 'hidden') {
      newSubMenuDisplay[index] = 'show';
    } else {
      newSubMenuDisplay[index] = 'hidden';
    }
    // 设置为新的数组
    this.setData({
      subMenuDisplay: newSubMenuDisplay
    });
  },

  fabiao: function () {

    this.setData({
      yesorno: 'block'
    })

    this.setData({
      test: 'test1'
    })

    this.setData({
      flag: false
    })

  },
  laqi: function () {

    this.setData({
      test: 'test2',
    })
    this.setData({
      flag: true
    })
  },
  onLoad: function(option) {
    const { selectClass, subject } = option;
    
    wx.getLocation({
      type: 'gcj02',
      success: res => {

        const {latitude,longitude} = res;

        wx.request({
          url: 'http://localhost:3000/teacher',
          method: 'GET',
          data: {
            latitude: latitude,
            longitude: longitude
          },
          success: response => {
            this.setData({
              teacherList: response.data
            })
          }
        })
      },
    })
  }
});