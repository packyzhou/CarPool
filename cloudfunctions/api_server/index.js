const login = require('./login/index')
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log("云函数入口 >>> " + event.type)
  switch (event.type) {
    case 'login':
      return await login.main(event, context);
  }
  // const wxContext = cloud.getWXContext()

  // return {
  // 	event,
  // 	openid: wxContext.OPENID,
  // 	appid: wxContext.APPID,
  // 	unionid: wxContext.UNIONID,
  // }
}