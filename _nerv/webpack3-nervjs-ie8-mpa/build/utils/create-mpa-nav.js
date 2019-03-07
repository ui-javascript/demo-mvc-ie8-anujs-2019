// 注意这个是node.js的工具 不是utils.js
// 参考自 https://github.com/Fi2zz/webpack-multipages-template
const util = require('util');
const chalk = require('chalk');
const fs = require('fs');


function html(entries, devPort, env) {
  // var entries = options.entries || {};
  // var devPort = options.devPort;
  // var env = options.env;
  
  console.log(chalk.yellow(`  [${env}]    ----------------`));
  // console.log(chalk.yellow(`  [${env}]    ${env.toUpperCase()} config file path`));
  console.log(chalk.yellow(`  [${env}]    ` + __dirname));
  console.log(chalk.yellow(`  [${env}]    Working Modules:`));
  console.log(chalk.yellow(`  [${env}]    \n   ${util.inspect(entries)}`));
  console.log(chalk.yellow(`  [${env}]    ----------------\n`));

  let html = `<table class="table table-bordered table-hover table-striped">

      <tr>
          <th colspan="3"><mark>(导航, Node.js自动生成)</mark></th>
      </tr>
       
      <tr>
        <th>所属模块</th>
        <th>视图文件</th>
        <th>浏览地址</th>
      </tr>
   `


  for (let i in entries) {
    // console.log('导航 -> ' + JSON.stringify(entries[p]))
    let entry = entries[i]
    let url = `http://localhost:${devPort}/${entry.module}/${entry.filenameTitle}.html`;
    html += `
        <tr> 
            <td>${entry.module}</td> 
            <td>${entry.filenameTitle}.${entry.filenameExt}</td>
            <td>
              <a href="${url}">${url}</a>
           </td>
        </tr>
      `
  }
 
  
  html += `</table>`;
    

  return `<!DOCTYPE html>
  <html>
        <head>
            <meta charset="utf-8">
            <title>Project</title>
            <link href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
        </head>
        
        <body>
            <div id="app">
            ${html}
            </div>
        </body>
    </html>`
}

// 创建根
function createMpaNav(entries, devPort, env) {
  // 创建入口文件
  fs.writeFile('./src/views/index.js', "// index.html, index.js自动生成,\n// 放过这两个孩子吧~~", (err, entries) => {
    if (err) {
      console.log(err);
    }
    console.log(chalk.green('> Write "index.js" is done'))
  });
  
  // 创建入口视图
  fs.writeFile('./src/views/index.html', html(entries, devPort, env), function (err, entries) {
    if (err) {
      console.log(err);
    }
    console.log(chalk.green('> Write "index.html" is done'))
  });
}

module.exports = createMpaNav;
