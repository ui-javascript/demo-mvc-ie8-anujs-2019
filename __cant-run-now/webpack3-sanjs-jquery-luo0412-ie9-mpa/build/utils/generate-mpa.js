/**
 * 根据视图来生成 pug | html
 * 会自动生成补全入口js
 */
const path = require('path')
const glob = require('glob')
const config = require('../config')

exports.getEntryDir = function () {
  // let globPath = 'src/pages/**/*.' +
  let globPath = `src/${config.moduleName}/**/*.@(${config.common.tplLang})`

  // (\/|\\\\) 这种写法是为了兼容 windows和 mac系统目录路径的不同写法
  // let pathDir = 'src(\/|\\\\)(.*?)(\/|\\\\)_tmpl' // 视图所在
  // console.log(pathDir)

  let pagesDirName = config.moduleName;
  let files = glob.sync(globPath)
  let dirname, entries = [], dir, module
  let filenameArr, filenameTitle, filenameExt

  for (let i = 0; i < files.length; i++) {

    // 获取目录名
    dirname = path.dirname(files[i])

    // 不支持二级目录
    module = dirname.split('/');
    if (module[0] === 'src') {
      module.shift();
    }
    dir = module.join("/");
    if (module[0] == pagesDirName) {
      module.shift()
    }
    module = module.join("/")

    // 原文件信息
    filenameArr = files[i].split('/')
    filenameArr = filenameArr[filenameArr.length - 1].split('.')
    filenameTitle = filenameArr[0]
    filenameExt = filenameArr[1]

    entries.push({
      template: files[i],

      // eg. 'index' + 'pug'
      filenameTitle: filenameTitle,
      filenameExt: filenameExt,

      // eg. src/pages/index
      dirname: dirname,

      // 形如 pages/index
      // dir: dirname.replace(new RegExp('^' + pathDir), '$2'),
      dir: dir,

      // 形如index
      module: module
    })

  }
  
  return entries
}

// 获取vendors
exports.getVendors = function () {
  let globPath = `src/${config.common.libraryDir}/**/*.*`
  let files = glob.sync(globPath)
  let libsArr = []
  files.forEach((v, i) => {
    libsArr.push('./' + v)
  })
  return libsArr
}

