const app = getApp()
Page({
  tomap() {
    wx.navigateTo({
      url: '../map/map'
    })
  },
  async tologin() {
    console.log("开始登陆.");
    wx.getUserProfile({
      desc: '登录',
      success: async (data) => {
        const res = await wx.cloud.callFunction({
          name: 'api_server',
          data: {
            type: 'login',
          }
        }).catch(err => {
          // handle error
          console.error("云函数错误：" + err)
        })
        const openInfo = res.result
        const openId = openInfo.openid;
        console.log("cloud >>> 获取open openId :" + openId)
        if (openId != undefined) {
          wx.showToast({
            title: '登录成功',
            icon: 'success'
          })
          wx.setStorage({
            key: 'openId',
            data: openId,
            success: function () {
              console.log('写入openId缓存成功');
            },
            fail: function () {
              console.log('写入openId发生错误');
            }
          });
        }
      }
    })
  },
  onShareAppMessage() {
    return {
      title: '快来使用LBS定位小工具',
      imageUrl: '../../asset/logo.png'
    }
  }
})
