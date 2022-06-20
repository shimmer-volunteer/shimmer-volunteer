// map.js
Page({
  data: {
    value: '',
    show: false,
    activityDetail: {},

  },
  onReady: function (e) {

  },
  onLoad: function (options) {
    console.log(options)
    const {id} = options;

    wx.cloud.callFunction({
      name: 'getActivityDetail',
      data: {
        _id:id
      }
    }).then(res => {
      const data = res.result.data;
      console.log('[ data ] >', data)
      this.setData({
        activityDetail: data[0]
      })
    })

  },


})