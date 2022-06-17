// map.js
Page({
  data: {
    value: '',
    show: false,
    userInfo: {},
    hasUserInfo: false,
    hasPhoneNumber: false,
    hasRegister: false,
    canIUseGetUserProfile: false,
    phoneNumber: '',
    cardType: '',
    cardId: '',
    realname: '',
    nickName: '',
    email: '',
    password: '',
    avatarUrl: '',
    gender: '',
    language: '',
    cellList: [
      { icon: 'award-o', title: '个人资料', url: '/page/createActivity/index' },
      { icon: 'award-o', title: '公益数据', url: '/page/createActivity/index' },
      { icon: 'award-o', title: '我的申请', url: '/page/createActivity/index' },
      { icon: 'award-o', title: '志愿者证书', url: '/page/createActivity/index' },
      { icon: 'award-o', title: '捐赠证书', url: '/page/createActivity/index' },
      { icon: 'award-o', title: '捐赠数据', url: '/page/createActivity/index' },
      { icon: 'award-o', title: '活动足迹', url: '/page/createActivity/index' },
    ],
    cellList1: [
      { icon: 'award-o', title: '我要反馈', url: '', fun: 'opentxc' },

    ],
    donationList: [
      { unit: '元', title: '总捐赠金额', value: 0 },
      { unit: '小时', title: '服务时长', value: 0 },
    ]


  },
  onReady: function (e) {

  },
  onLoad: function () {

    wx.cloud.callFunction({
      name: 'login',
      data: {

      }
    }).then(res => {
      const { data } = res.result
      if (data.length === 0) {
        wx.navigateTo({
          url: `../register/index`,
        });
        return
      }
      const {
        cardType,
        cardId,
        realname,
        email,
        password,
        avatarUrl,
        nickName,
        gender,
        language,
        phoneNumber,
      } = data[0]
      this.setData({
        cardType,
        cardId,
        realname,
        email,
        password,
        avatarUrl,
        nickName,
        gender,
        language,
        phoneNumber,
      })

    })

  },

  createActivity() {

  },
  opentxc(e) {
    wx.openEmbeddedMiniProgram({
      appId: "wx8abaf00ee8c3202e",
      extraData: {
        id: "413347",
        // 自定义参数，具体参考文档 https://txc.qq.com/helper/configCustomParameter
        customData: {
          // clientInfo: `iPhone OS 10.3.1 / 3.2.0.43 / 0`,
          // customInfo,
          // netType,
          // os,
          // osVersion,
        }
      }
    })
  },

  onShareAppMessage() { },


})