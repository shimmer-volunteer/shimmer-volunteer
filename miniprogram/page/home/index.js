
import { areaList } from '@vant/area-data';

Page({

  data: {
    areaList,
    searchValue: '',
    show: false,
    org: {
    },
    active: 0,
    tagList: [
      {
        name: "全部",
      },
      {
        name: "教育",
      },
      {
        name: "环境",
      },
      {
        name: "防灾减灾",
      },
      {
        name: "应急救援",
      },

      {
        name: "老年人",
      },
    ],
    params: {
      type: ''
    },
    type: '',
    imageURL: "/image/location.png",
    resourceList: [],

    background: ['home_banner', ''],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 4000,
    duration: 500

  },
  // observers: {
  //   'type': function() {
  //     // 每次 setData 都触发
  //     this.getCharity();
  //     console.log('observers');
  //   },
  // },
  onReady: function (e) {

  },
  onLoad: function () {
    this.getCharity();
  },

  getCharity() {
    wx.cloud.callFunction({
      name: 'getCharity',
      data: this.data.params
    }).then(res => {
      const data = res.result.data;
      this.setData({
        resourceList: data
      })
    })

  },

  areaConfirm(e) {
    console.log('e', e)
  },
  onChange(e) {
    this.setData({
      searchValue: e.detail,
    });
  },
  onSearch() {
    console.log('this.data.searchValue', this.data.searchValue)
    const name = this.data.searchValue;
    this.setData({
      'params.name': name
    })
    this.getCharity();
  },
  typeChange(e) {
    const title = e.detail.title;
    const type = title === '全部' ? '' : title;
    this.setData({
      type,
      'params.type': type
    })
    this.getCharity();
  },

  gotoDetail(e) {
    const id = e.currentTarget.id;
    wx.navigateTo({
      url: `../orgdetail/index?id=${id}`,
    });
  },
  onShareAppMessage() { },




})