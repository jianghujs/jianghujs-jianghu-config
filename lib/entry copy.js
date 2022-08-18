'use strict';

const yargs = require('yargs');
const path = require('path');
const fs = require('fs');
const argv = yargs.parse(process.argv || []);
const { command } = argv;
const inquirer = require('inquirer');


// 1: 用户选择 使用 config.local.js / config.prod.js
async function promptEnv() {
    const answer = await inquirer.prompt({
        name: 'env',
        type: 'list',
        message: '请选择你要运行的环境',
        choices: ['local', 'prod'],
        pageSize: 100,
    });
    const env = answer.env;
    const configFilePath = path.join(__dirname, `config/config.${env}.js`);
    if (!fs.existsSync(configFilePath)) {
        throw new Error("[jianghu] config file not exist, config file: " + configFilePath)
    }
    return env;
}

// 2: 根据 command 调用lib/cmd 下指定的脚本
promptEnv();


// switch (action) {
//     case 'jianghuConfigImportData':
//         break;
//     default:
//         console.error("[jianghu] error: unsupport command;", { action, env } )
//         break;
// }
// console.log(argv);
