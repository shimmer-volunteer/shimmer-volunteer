// 云函数入口文件
const cloud = require('wx-server-sdk')

const app = cloud.init()
const db = cloud.database();
const {OPENID} = cloud.getWXContext()

// 云函数入口函数
exports.main = async (event, context) => {
  const {charityId } = event

  const resCharity = await db.collection("charity").where({
      _id: charityId, //使用 _id 还是 id 呢？
    })
    .get()

  if (resCharity.data.length == 0) {
    console.log("not found this charity: ", charityId)
    return -1; // 未找到该用组织机构，无法发布活动
  }
 
  //conseole.log("res1: ", res1)
  console.log("event: ", event)
 
  const {
    actName,
    actTime,
    actCommand,  //招募要求
    actRecruiment, // 招募人数
    actContent,   //活动内容
    investigateUrl, //用于审查资料问卷填写二维码， 由组织机构决定是否需要,非必填
  } = event
  //actManager 和 actPhone 为活动负责人姓名 以及联系方式,需要新加
  if(! actTime || ! actName || ! actDemand || ! actRecruiment || ! actContent || !actManager || ! actPhone){
    console.log("lack necessary data");
    return -2; //缺少必要数据
  }
  const obj = {
    isDelete : false,
    //alreadyRescruit : 0, //已招募人数
    actStatus : 0, //活动状态,  0： 招募中 ， 1：已招满
    //charityName: resCharity.data[0].name,
    applyVolunteer : [], //报名的志愿者
    _createAt: db.serverDate(),
    _updateAt: db.serverDate(),
    _createBy: OPENID,
    _updateBy: OPENID,
  }

  const data = { ...event, ...obj }
  console.log("data: ", data)

  const resAct = await db.collection('activity').add({
    // data 字段表示需新增的 JSON 数据
    data: data,
    success: function(res) {
      console.log(res)
      return 0;
    }
  })
  
  // TODO 添加到团体组织数据库中
  /*
  db.collection("charity").where({
    _id: charityId, //使用 _id 还是 id 呢？
  })
  .update({
    data : {
      publishedAct : [resAct._id],
    }
  })
  */
}