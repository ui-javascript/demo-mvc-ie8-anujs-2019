let fs = require('fs');
module.exports = function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    fs.readFile('./pages/index.html', 'utf-8', function (err, data) {
        if (err) {
            throw err;
        }
        res.end(data);
    });
}