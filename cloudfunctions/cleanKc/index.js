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
      code10: _.neq('')
    })
    .update({
      data: {
        kc: _.set(0)
      },
    })
  } catch(e) {
    console.error(e)
  }
}
