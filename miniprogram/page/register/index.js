// map.js
Page({
  data: {
    value: '',
    show: false,
    selectCountryShow: false,
    userInfo: {}, //不需要
    hasUserInfo: false,
    hasPhoneNumber: false,
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
    job: '',
    interests: '',
    country: '',
    columns: ['中国', '中国香港', '中国澳门', '中国台湾', '外国人'],
    cardTypeArr: ['内地居民身份证', '香港居民身份证', '澳门居民身份证', '台湾居民身份证', '护照'],
    realnameErrorMsg: '',



  },
  onReady: function (e) {

  },
  onLoad: function () {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },

  selectCountry(e) {
    this.setData({
      selectCountryShow: true
    })
  },

  realnameInput(e) {
    const value = e.detail
    if (value.length > 0) {
      this.setData({
        realnameErrorMsg: ''
      })
    }
   
  },

  onConfirm(event) {
    const { picker, value, index } = event.detail;
    const cardType = this.data.cardTypeArr[index]
    this.setData({
      country: value,
      cardType,
      selectCountryShow: false
    })
  },

  onCancel() {
    this.setData({
      selectCountryShow: false
    })
  },

  getUserProfile(e) {
    // 推荐使用 wx.getUserProfile 获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于用户资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log('res', res)
        const {
          avatarUrl,
          nickName,
          language
        } = res.userInfo

        this.setData({
          userInfo: res.userInfo,
          avatarUrl,
          nickName,
          language,
          hasUserInfo: true
        })
      }
    })
  },
  register() {
    // 注册
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
      job,
      interests,
      country,
    } = this.data
    const data = {
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
      job,
      interests,
      country,

    }

    if (!cardId || !cardType || !nickName || !realname || !password || !phoneNumber || !email) {
      if (!realname) {
        this.setData({
          realnameErrorMsg: '请输入真实姓名'
        })
      }
      wx.showToast({
        title: '请输入必填信息',
        icon: 'error',
        duration: 2000
      })
      return;
    }

    console.log('data', data)

    wx.cloud.callFunction({
      name: 'insertVolunteer',
      data
    }).then(res => {
      console.log('res', res)
      if (res.result === null) {
        wx.showToast({
          title: '注册成功',
          icon: 'success',
          duration: 2000
        })
        // wx.navigateBack({
        //   delta: 1
        // })
        wx.reLaunch({
          url: `../my/index`,

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
      const { phoneNumber } = res.result.phoneInfo
      this.setData({
        phoneNumber, hasPhoneNumber: true
      })
    })
  },

})