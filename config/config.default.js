'use strict';

const path = require('path');
const assert = require('assert');

const { middleware, middlewareMatch } = require('@jianghujs/jianghu/config/middlewareConfig');

const jianghuPathTemp = require.resolve('@jianghujs/jianghu');
const jianghuPath = path.join(jianghuPathTemp, '../');

module.exports = appInfo => {
  assert(appInfo);

  const appId = 'jianghujs-jianghu-config';
  const uploadDir = path.join(appInfo.baseDir, 'upload');
  const downloadBasePath = `/${appId}/upload`;

  return {
    appId,
    appTitle: '江湖演示-jianghuConfig',
    appLogo: `${appId}/public/img/logo.png`,
    appType: 'single',
    appDirectoryLink: '/',
    indexPage: `/${appId}/page/studentManagement`,
    loginPage: `/${appId}/page/login`,
    helpPage: `/${appId}/page/help`,
    uploadDir,
    downloadBasePath,
    primaryColor: "#4caf50",
    primaryColorA80: "#EEF7EE",
    static: {
      maxAge: 0,
      buffer: false,
      preload: false,
      maxFiles: 0,
      dir: [
        { prefix: `/${appId}/public/`, dir: path.join(appInfo.baseDir, 'app/public') },
        { prefix: `/${appId}/public/`, dir: path.join(jianghuPath, 'app/public') },
        { prefix: `/${appId}/upload/`, dir: uploadDir },
      ],
    },
    view: {
      defaultViewEngine: 'nunjucks',
      mapping: { '.html': 'nunjucks' },
      root: [
        path.join(appInfo.baseDir, 'app/view'),
        path.join(jianghuPath, 'app/view'),
      ].join(','),
    },
    middleware,
    ...middlewareMatch,
    jianghuConfig: {
      enableHtmlErrorLogRecord: true,
      htmlErrorLogRecordInterval: 6000,
    },
    customLogger: {
      // https://www.eggjs.org/zh-CN/core/logger
      htmlLogger: {
        file: path.join(appInfo.baseDir, `logs/${appId}.html.log`),
        contextFormatter(meta) {
          return `[${meta.date}] [${meta.level}] [${meta.ctx.method}] ${meta.message}`;
        },
      },
    },
  };

};
