// 云函数入口文件
const cloud = require('wx-server-sdk')
const app = cloud.init()
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const res = await db.collection("volunteer").where(
    {
      openId: OPENID,
    })
    .get()
  return res
}