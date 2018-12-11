/**
 *
 * @param anchorLink  锚链接名称
 * @param index  页面序号
 * @param slideIndex  滑块序号
 * @param direction  滑动方向 left 和 right
 */
module.exports = function (anchorLink, index, slideIndex, direction) {
    console.log('锚链接名称是' + anchorLink + ',页面序号是' + index + ',滑块序号是' + slideIndex + ',滑动方向是' + direction)
}