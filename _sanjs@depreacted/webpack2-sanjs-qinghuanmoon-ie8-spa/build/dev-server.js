const base = require('./config/base'),
    files = require('./config/files'),
    webpackConfig = require('./webpack.dev'),
    express = require('express'),
    webpack = require('webpack');
const history = require('connect-history-api-fallback');

const app = express();
app.use(history());

// Apply gzip compression
// const compress      = require('compression')
// app.use(compress());

/** -----------------------------------
 * Apply Webpack HMR Middleware
 * */
if (process.env.NODE_ENV === 'development') {
    const compiler = webpack(webpackConfig);


    app.use(require('webpack-dev-middleware')(compiler, {
        publicPath: files.cdnPath,
        quiet: true,
        stats: {colors: true}
    }));

    app.use(require('webpack-hot-middleware')(compiler));

    app.use('/', express.static(files.buildPath));


    app.use('/', express.static(files.staticPath));


    app.listen(base.devPort, () => {
        console.log(`open localhost:${base.devPort}`);
    });
}
else {
    console.log(
        `Server not being run of live development mode,
      Please use the NODE_ENV=development mode to run`
    );
}

module.exports = app;
