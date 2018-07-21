//app.js
App({
  onLaunch: function () {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userLocation']){
          wx.authorize({
            scope: 'scope.userLocation'
          })
        }
        if (res.authSetting['scope.userInfo']) {

          wx.login({
            success: loginMsg => {
              wx.getUserInfo({
                lang: "zh_CN",
                success : userinfo => {
                  this.globalData.accessUserInfo = true;
                  const data = {
                    wecahtCode: loginMsg.code,
                    encryptedData: userinfo.encryptedData,
                    iv: userinfo.iv
                  }
                  wx.request({
                    url: 'http://localhost:3000/login',
                    method: 'POST',
                    data: data,
                    success: response => {
                      this.globalData.unionId = response.data.unionId;
                      console.log(response)
                    }
                  })
                }
              })
            }
          })
        } else {
          this.globalData.accessUserInfo = false;
        }
      }
    })
  },
  userInfoReadyCallback: function (msg) {
    console.log(msg)
  },
  globalData: {
    userInfo: null, //object
    city: '选择城市', //string
    accessUserInfo: false,
    unionId: ''
  }
})