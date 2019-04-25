let Mock = require('mockjs');
let Random = Mock.Random;
Random.extend({
    constellation: function(date) {
        var constellations = ["法人", "自然人"]
        return this.pick(constellations)
    }
})

var data = Mock.mock({
    'code': 0,
    'data': {
        'list|1-100': [{
            // 属性 id 是一个自增数，起始值为 1，每次增 1
            'key|+1': 10000,
            'custName': Mock.Random.csentence(5, 10),
            "ID": Math.random() * 10000000 + Random.word(2),
            "custType": Mock.Random.constellation(),
            "progress": Math.floor(Math.random() * (100 - 0) + 0)
        }]
    },
    'message': '操作成功',
    'systemDate': new Date().getTime()
});
/*"key": "1004",
        "custName": "北京四号公司",
        "ID": "11252412524156AS",
        "custType": "法人",
        "progress": 0 */
module.exports.data = data;