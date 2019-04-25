const shell = require('shelljs');
const path = require('path');
const del = require('del');

// let arr = del.sync([path.join(__dirname + '/../dist/**')]);
// console.log('正在删除目录');

shell.exec('node ./build/server.js --env=build', { async: true }, (code, stdout, stderr) => {});
shell.exec('webpack --config ./build/webpack.conf.prod.react --watch', { async: true }, (code, stdout, stderr) => {});
