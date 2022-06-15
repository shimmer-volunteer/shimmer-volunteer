// 云函数入口文件
const cloud = require('wx-server-sdk')

const app = cloud.init()
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID, UNIONID} = cloud.getWXContext()

  const res1 = await db.collection("volunteer").where(
    {
      openId: OPENID,
    })
    .count()

  if (res1.total != 0) {
    console.log("res1.total: ", res1.total)
    return -1; // 该用户已被注册
  }
 
  //conseole.log("res1: ", res1)
  console.log("event: ", event)

  const {
    cardType,
    cardId,
    realname,
    email,
    password,
    phoneNumber,
    avatarUrl,
    nickName,
    gender,
    language,
  } = event
  if(! cardId || ! cardType || ! nickName || ! realname || ! password  || ! phoneNumber || ! email){
    console.log("lack necessary data");
    return -2;
  }
  const obj = {
    openId: OPENID,
    score : 0,
    isDelete : false,
    unionId : UNIONID,
    attenedAct : [], //已参加的活动
    _createAt: db.serverDate(),
    _updateAt: db.serverDate(),
    _createBy: OPENID,
    _updateBy: OPENID,
  }
  const data = { ...event, ...obj }
  console.log("data: ", data)


  db.collection('volunteer').add({
    // data 字段表示需新增的 JSON 数据
    data: data,
    success: function(res) {
      console.log(res)
      return 0;
    }
  })
  

}