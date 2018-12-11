const Koa = require('koa');
const koaStatic = require('koa-static');
const path = require('path');
const app = new Koa();
const argv = require('yargs').argv;

const server = app.listen(9527);
const dist = argv.env === 'dev' ? 'dist' : 'dist';

// 处理路径
function resolve(dir) {
    return path.join(__dirname, '../', dir)
}

app.use(koaStatic(resolve(dist)));
