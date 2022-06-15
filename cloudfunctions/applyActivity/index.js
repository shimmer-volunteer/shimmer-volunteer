// 云函数入口文件
const cloud = require('wx-server-sdk')

const app = cloud.init()
const db = cloud.database();
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const {OPENID } = cloud.getWXContext(),

  const resVolunteer = await db.collection("volunteer").where({
      openId: OPENID, //使用 _id 还是 id 呢？
    })
    .get()

  if (resVolunteer.data.length == 0) {
    console.log("not register in volunteer: ", OPENID)
    return -1; // 未找到该用户，无法报名
  }
 const {realname , phoneNumber, email} = resVolunteer.data[0]
  console.log("event: ", event)
  const { actId } = event
  if(! actId){
    console.log("lack necessary data");
    return -2; //缺少必要数据
  }

  const resAct = await db.collection('activity').where({
    _id : actId,
  }).get()

  if(resAct.data.length < 1){
    console.log("get Act Data Fail, OPENID: ", OPENID, ", actId: ", actId);
    return -3; //未找到活动数据
  }

  if(resAct.data[0].alreadyRescruit >= resAct.data[0].actRecruiment){
    console.log("already complete Rescruit, OPENID: ", OPENID);
    return -4; //已经完成招募
  }

  // TODO 如果该活动需要审核，需要切换状态为审核中
  /*
  if(resAct.data[0].investigateUrl){
    resAct.data[0]
  }*/

  //数据入库
  db.collection("activity").where({
    _id : actId,
  }).update({
    applyVolunteer: _.push([{
      openId : OPENID,
      realname : realname,
      phoneNumber : phoneNumber, 
      // TODO  看还需要什么信息
    }]),
  _updateAt : db.serverDate(),
  _updateBy : OPENID,
  })
  db.collection("volunteer").where({
    openId : OPENID,
  }).update({
    attenedAct : _.push([actId]) ,
    _updateAt : db.serverDate(),
    _updateBy : OPENID,
  })

}