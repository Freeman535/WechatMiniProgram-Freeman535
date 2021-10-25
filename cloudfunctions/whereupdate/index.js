const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 使用了 async await 语法

const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  try {
    return await db.collection('pi').where({
      code10: _.eq(event.code10)
    })
    .update({
      data: {
        kc: _.set(event.number)
      },
    })
  } catch(e) {
    console.error(e)
  }
}
