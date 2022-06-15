// map.js
Page({
  data: {
    value: '',
    show: false,
    charityDetail: {},

  },
  onReady: function (e) {

  },
  onLoad: function (options) {
    console.log(options)
    const {id} = options;

    wx.cloud.callFunction({
      name: 'getCharityDetail',
      data: {
        _id:id
      }
    }).then(res => {
      const data = res.result.data;
      console.log('[ data ] >', data)
      this.setData({
        charityDetail: data[0]
      })
    })

  },


})