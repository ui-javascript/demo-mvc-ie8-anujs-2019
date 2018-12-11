const base = require('../config/base');

module.exports = ((entry) => {
    let All = {};

    if (base.mainJS) {
        const path = require('path');

        const files = require('../config/files');

        All = Object.assign(entry, {
            'Main': [path.resolve(files.jsPath, 'main.js')],
        });
    }

    return base.mainJS ? All : entry;
})({
    'Common': [
        'utils',
        'css',
    ]
});