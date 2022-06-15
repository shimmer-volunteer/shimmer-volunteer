// 云函数入口文件
const cloud = require('wx-server-sdk')

const app = cloud.init()
const db = cloud.database();
const {OPENID} = cloud.getWXContext()

// 云函数入口函数
exports.main = async (event, context) => {
  const {charityId, actId, updateData } = event

  const resCharity = await db.collection("charity").where({
      _id: charityId, //使用 _id 还是 id 呢？
    })
    .count()

  if (resCharity.total == 0) {
    console.log("not found this charity: ", charityId)
    return -1; // 未找到该用组织机构，无法修改活动
  }
 
  console.log("event: ", event)
 const obj = {
   _updateAt : db.serverDate(),
   _updateBy : OPENID,
 }
 
 const data = {...updateData, ...obj}
 await db.collection('activity').where({
    _id : actId,
  }).update(data)
  
  return 0;
}