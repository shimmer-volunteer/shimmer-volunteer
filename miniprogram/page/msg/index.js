
Page({
  data: {
    value: '',
    show: false,
    org: {
    },
    active: 0,
    tagList: [
      {
        name: "全部消息",
      },
      {
        name: "申请中",
      },
      {
        name: "沟通中",
      },

    ],
    imageURL: "/image/location.png",
    resourceList: [],

  },
  onReady: function (e) {

  },
  onLoad: function () {
    wx.cloud.callFunction({
      name: 'getMsg',
      data: {
      }
    }).then(res => {
      const data = res.result.data;
      this.setData({
        resourceList: data
      })
    })
  },

  gotoDetail(e) {
    const id = e.currentTarget.id;
    wx.navigateTo({
      url: `../orgdetail/index?id=${id}`,
    });
  },
  onShareAppMessage() { },




})