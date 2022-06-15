// map.js
Page({
  data: {
    value: '',
    show: false,
    selectCountryShow: false,

    actName: '',
    actTime: '',
    actDemand: '',  //招募要求
    actRecruiment: 0, // 招募人数
    actContent: '',   //活动内容
    actManager : '',
    actPhone : '',
    investigateUrl: '', //用于审查资料问卷填写二维码， 由组织机构决定是否需要,非必填
    columns: ['中国', '中国香港', '中国澳门', '中国台湾', '外国人'],
    cardTypeArr: ['内地居民身份证', '香港居民身份证', '澳门居民身份证', '台湾居民身份证', '护照'],
    actNameErrorMsg: '',



  },
  onReady: function (e) {

  },
  onLoad: function () {

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
        actNameErrorMsg: ''
      })
    }

  },

  createActivity() {

    const {
      actName,
      actTime,
      actDemand,  //招募要求
      actManager,
      actPhone,
      actRecruiment, // 招募人数
      actContent,   //活动内容
      investigateUrl, //用于审查资料问卷填写二维码， 由组织机构决定是否需要,非必填
    } = this.data

    const data = {
      charityId: '128f646562a09f9800fcdd1b48b7f073',
      actName,
      actTime,
      actCommand,  //招募要求
      actManager ,
      actPhone,
      actRecruiment, // 招募人数
      actContent,   //活动内容
      investigateUrl, //用于审查资料问卷填写二维码， 由组织机构决定是否需要,非必填

    }

    if (!actTime || !actName || !actCommand || !actRecruiment || !actContent ) {
      console.log("lack necessary data");
      if (!actName) {
        this.setData({
          actNameErrorMsg: '请输入活动名称'
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
      name: 'createActivity',
      data
    }).then(res => {
      console.log('res', res)
      if (res.result === null) {
        wx.showToast({
          title: '创建成功',
          icon: 'success',
          duration: 2000
        })
        wx.reLaunch({
          url: `../my/index`,

        })
      }
    })

  },



})