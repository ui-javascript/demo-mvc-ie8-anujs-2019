const base = require('../config/base'),
    files = require('../config/files'),
    path = require('path');
module.exports = {
    alias: {
        'static': path.resolve(files.staticPath),
        'utils': path.resolve(files.appPath, 'utils/index.js'),
        'css': path.resolve(files.cssPath, 'index.' + base.cssType)
    },
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.json']
};