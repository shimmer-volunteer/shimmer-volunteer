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
      // { icon: 'award-o', title: '发布活动', url: '/page/createActivity/index' },
      // { icon: 'award-o', title: '我的认证', url: '/page/createActivity/index' },
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

  getUserProfile(e) {
    // 推荐使用 wx.getUserProfile 获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log('res', res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },

  getPhoneNumberCode(e) {
    const code = e.detail.code
    this.getPhoneNumber(code)
  },
  getPhoneNumber(code) {
    wx.cloud.callFunction({
      name: 'openapi',
      data: {
        action: 'getcellphone',
        code
      }
    }).then(res => {
      console.log('res: ', res)
      const { phoneNumber } = res.result.phoneInfo
      console.log('phoneNumber: ', phoneNumber)
      this.setData({
        phoneNumber, hasPhoneNumber: true
      })
    })
  },
  onShareAppMessage() { },


})