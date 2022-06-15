// map.js
Page({
  data: {
    value: '',
    show: false,
    scale: 12,
    location: {
      latitude: 22.53332,
      longitude: 113.93041,
    },
    charityDetail: {
    },
    markers: [],
    resourceList: [],

    controls: [{
      id: 1,
      iconPath: '/image/location-control.png',
      position: {
        left: 0,
        top: 10,
        width: 40,
        height: 40
      },
      clickable: true
    }]
  },
  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文 
    // this.mapCtx = wx.createMapContext('myMap')

    const mapCtx = wx.createMapContext('map', this);
    mapCtx.initMarkerCluster({
      gridSize: 30
    });
  },
  onLoad: function () {
    console.log('地图定位！')
    let that = this
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: (res) => {
        let latitude = res.latitude;
        let longitude = res.longitude;
        this.setData({
          'location.longitude': longitude,
          'location.latitude': latitude,
        })

        wx.cloud.callFunction({
          name: 'getNearPoint',
          data: {
            "longitude": longitude,
            "latitude": latitude,
            "minDistance": 0,
            "maxDistance": 500000
          }
        }).then(res => {
          const data = res.result.data;
          this.resourceList = data;
          let markers = []
          for (let item of data) {
            let marker = this.createMarker(item);
            markers.push(marker);
          }
          this.setData({
            markers
          })

        })


      }
    });
  },
  gotoDetail(e) {
    const id = e.currentTarget.id;
    wx.navigateTo({
      url: `../orgdetail/index?id=${id}`,
    });
  },

  regionchange(e) {
    console.log(e.type)
  },
  onClose() {
    this.setData({ show: false });
  },

  markertap(e) {
    const index = this.resourceList.findIndex((item) => item.id == e.markerId);
    const charityDetail = this.resourceList[index];
    console.log('charityDetail', charityDetail)
    this.setData({
      show: true,
      charityDetail
    })

  },
  controltap(e) {
    console.log(e.controlId)
    this.moveToLocation()
  },

  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  createMarker(point) {
    let longitude = point.location.coordinates[0];
    let latitude = point.location.coordinates[1];
    let marker = {
      iconPath: "/image/location.png",
      id: point.id || 0,
      name: point.name || '',
      latitude: latitude,
      longitude: longitude,
      joinCluster: true,
      width: 26,
      height: 26
    };
    return marker;
  },
  onShareAppMessage() { },

})