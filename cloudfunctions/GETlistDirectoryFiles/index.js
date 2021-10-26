const cloud = require('wx-server-sdk')
const CloudBase = require('@cloudbase/manager-node')
/* 初始化 */
cloud.init()
const {
  storage
} = new CloudBase()
exports.main = async (event, context) => {
  /* 
  listDirectoryFiles(cloudPath: string): Promise列出文件夹下所有文件的名称
  downloadDirectory(options): Promise下载文件夹
  listCollections(options: object): object来获取所有集合的名称，然后使用export(collectionName: string, file: object, options: object): object接口来导出所有记录到指定的json或csv文件里。
  */
  const res = await storage.listDirectoryFiles(event.address)
  console.log(res)
  return {
    data: res,
  }
}