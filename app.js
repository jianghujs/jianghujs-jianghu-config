'use strict';

// const syncJianghuConfigDataToDB = require('./app/common/syncJianghuConfigDataToDB');

class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  // 所有配置已经加载完毕，用于自定义 Loader 挂载。
  // async didLoad() {
  //   const { jianghuKnex, logger } = this.app;
  //   const { baseDir, jiangHuConfig } = this.app.config;
  //   const { jianghuConfigDataIgnoreIdList } = jiangHuConfig
  //   await syncJianghuConfigDataToDB.syncToDB({ jianghuKnex, logger, baseDir, jianghuConfigDataIgnoreIdList }) 
  // }
  
}

module.exports = AppBootHook;

