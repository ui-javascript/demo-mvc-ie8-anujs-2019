let fs = require('fs');
module.exports = function (req, res) {
    res.writeHead(200, {
        "Content-Type": "application/json:charset=utf-8"
    });
    // let file = JSON.parse(fs.readFileSync('./sql/data.json', { encoding: 'utf-8' }));
    let data = require('../mock/todolist');
    res.end(JSON.stringify({ data: data.data, time: new Date() }));
}