const cloud = require("wx-server-sdk");
const app = cloud.init()
// 1. 获取数据库引用
const cloud_db = cloud.database()
const _ = cloud_db.command

exports.main = async (event, context) => {

    // 获取当前登录用户
    const { OPENID } = cloud.getWXContext()
    console.log('OPENID', OPENID)
    const { _id } = event;
    const res = await cloud_db.collection('charity')
        .where({ _id })
        .limit(1).get()
    return res
}

