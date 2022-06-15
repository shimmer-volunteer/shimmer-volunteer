const cloud = require("wx-server-sdk");
const app = cloud.init()
// 1. 获取数据库引用
const cloud_db = cloud.database()
exports.main = async (event, context) => {

    // 获取当前登录用户
    let { OPENID} = cloud.getWXContext()
    console.log('OPENID', OPENID)
    const { longitude, latitude, minDistance, maxDistance } = event;
    const _ = cloud_db.command
    const res = await cloud_db.collection('charity')
        .where({
            location: _.geoNear({
                geometry: cloud_db.Geo.Point(longitude, latitude),
                minDistance: minDistance,
                maxDistance: maxDistance,
            })
        }).get()
    return res
}

