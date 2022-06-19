const cloud = require("wx-server-sdk");
const app = cloud.init()
// 1. 获取数据库引用
const cloud_db = cloud.database()
const _ = cloud_db.command

exports.main = async (event, context) => {

    // 获取当前登录用户
    let { OPENID } = cloud.getWXContext()
    console.log('OPENID', OPENID)
    const { pageSize = 10, pageNum = 1 } = event;
    const condition =await getSearchConditions(event);
    console.log('condition', condition)
    const res = await cloud_db.collection('activity')
        .where(condition)
        .skip((pageNum - 1) * pageSize)
        .limit(pageSize).get()
    return res
}

/**
 * 获得搜索条件
 * @param params
 */
async function getSearchConditions(params) {
    const condition = {
        isDelete: false,
    };
    if (params._ids) {
        condition._id = _.in(params._ids);
    }
    if (params.notId) {
        condition._id = _.neq(params.notId);
    }

    if (params.name) {
        condition.name = {
            $regex: `.*${params.name}.*`,
            $options: 'i',
        };
    }
    if (params.type) {
        condition.type = {
            $regex: `.*${params.type}.*`,
            $options: 'i',
        };
        console.log('condition.type', condition.type)
    }

    if (params.tags && params.tags.length > 0) {
        condition.tags = _.in([params.tags[0]]);
        for (let i = 1; i < params.tags.length; i += 1) {
            condition.tags = condition.tags.and(_.in([params.tags[i]]));
        }
    }
    return condition;
}