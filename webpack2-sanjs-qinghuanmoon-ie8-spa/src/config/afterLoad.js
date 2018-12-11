/**
 *
 * @param anchorLink 锚链接名称
 * @param index 序号
 */
module.exports = function (anchorLink, index) {
    console.log('锚链接是' + anchorLink + ', 页面序号是' + index);
    switch (index) {
        case 1:
            $('.p1 .pc .box').velocity({
                marginLeft: 50,
                opacity: 0.88,
            }, {
                duration: 1000,
            })
            break;
    }
}