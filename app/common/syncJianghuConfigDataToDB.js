'use strict';

const fs = require('fs');
const path = require('path');

module.exports.syncToDB = async ({ jianghuKnex, logger, baseDir, jianghuConfigDataIgnoreIdList }) => {
    logger.info('[syncJianghuConfigDataToDB.js] start ');
    const startTime = new Date().getTime();
    // Tip: _constant_ui 不做数据同步
    for (const tableName of ['_constant', '_page', '_resource', '_test_case', '_ui']) {
        const filePath = path.join(baseDir, `/config/jianghuConfigData/${tableName}.json`)
        const ignoreIdList = jianghuConfigDataIgnoreIdList[tableName] || [];
        if (fs.existsSync(filePath)) {
          const tableData = require(filePath);
          const records = tableData.RECORDS.filter(record => ignoreIdList.indexOf(record.id) === -1);
          await jianghuKnex(tableName).whereNotIn('id', ignoreIdList).delete();
          await jianghuKnex(tableName).insert(records);
        }
    }
    const endTime = new Date().getTime();
    logger.info('[syncJianghuConfigDataToDB.js] end ', { useTime: `${endTime - startTime}/ms` });
};