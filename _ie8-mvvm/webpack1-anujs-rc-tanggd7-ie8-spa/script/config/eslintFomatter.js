const chalk = require('chalk');
const table = require('text-table');

const creatMessage = message => [
  `   Line ${message.line || 0}:`,
  message.message.replace(/\.$/, ''),
  chalk.underline(
    message.fatal || message.severity === 2
      ? chalk.red(message.ruleId || '')
      : chalk.yellow(message.ruleId || '')
  ),
];

// 获取错误信息表格
const getMessages = creatMeg => result =>
  table(result.messages.map(creatMeg), {
    align: ['l', 'l', 'l'],
  });

const eslintFomatter = results => results.map(getMessages(creatMessage));

module.exports = eslintFomatter;
