'use strict';

const inquirer = require('inquirer');
const yargs = require('yargs');
const jianghuConfigImportData = require('./jianghuConfigImportData');

const commandTypes = [{
    value: 'jianghuConfigImportData',
    name: 'jianghu config - Use /config/jianghuConfigData/**.json import data to database table(_resource, _ui, _page, _constant)',
  },{
    value: 'jianghuConfigDumpData',
    name: 'jianghu config - dump table(_resource, _ui, _page, _constant) to /config/jianghuConfigData/**.json',
  }];

/**
 * 命令入口
 */
module.exports = class Entry {

  async run() {

    const argv = yargs.parse(process.argv || []);
    // 测试代码
    let { command } = argv;

    if (commandTypes.findIndex(item => item.value === command) === -1) {
      // 需要指定是 command
      const answer = await inquirer.prompt({
        name: 'command',
        type: 'list',
        message: 'Please select a commad',
        choices: commandTypes,
        pageSize: commandTypes.length,
      });
      command = answer.command;
    }

    switch (key) {
        case jianghuConfigImportData:
            await jianghuConfigImportData.run();
            break;
        default:
            throw new Error("[jianghu] unsupport command, command:" + command)
    }

    process.exit();
  }

};
