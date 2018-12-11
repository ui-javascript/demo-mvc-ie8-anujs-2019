/**
 *
 * @param index  离开页面的序号
 * @param nextIndex  滚动到页面的序号
 * @param direction  滚动方向的字符串 up 或者 down
 */
module.exports = function (index, direction, anchorLink) {
    console.log('离开的页面序号是' + index + ',滚动方向是' + direction + ',锚链接名称是' + anchorLink);
    switch (index) {
        case 1:
            $('.p1 .pc .box').velocity({
                marginLeft: -50,
                opacity: 1,
            }, {
                duration: 1000,
            })
            break;
    }
}