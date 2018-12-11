var afterload = require('./afterLoad')
var onleave = require('./onLeave')
var afterrender = require('./afterRender')
var afterslideload = require('./afterSlideLoad')
var onslideleave = require('./onSlideLeave')

module.exports = {
    //    内容是否垂直居中
    verticalCentered: false,
    //    字体是否随着窗口缩放
    resize: false,
    //    滚动速度
    scrollingSpeed: 700,
    //    绑定菜单
    menu: '#menu',
    //    是否显示导航
    navigation: false,
    //    滑块导航
    slidesNavigation: false,
    //    滚动到底部是否滚回顶部
    loopBottom: true,
    //    滚动到顶部是否滚回底部
    loopBottom: true,
    //    左右滑块是否循环滚动
    loopBottom: true,
    //    是否使用插件的滚动方式, false 会出现系统自带滚动条搜
    autoScrolling: true,
    //    内容超过满屏后是否显示滚动条
    scrollOverflow: false,
    //    与顶部的距离
    paddingTop: 0,
    //    与底部的距离
    paddingBottom: 0,
//    滚动条
    scrollBar: true,
//    滚动到某一屏后的回调
    afterLoad: afterload,
//    离开某一屏前的回调
    onLeave: onleave,
//    页面初始化成功的回调函数,只生效一次
    afterRender: afterrender,
//    滚动到某一个滑块后的回调
    afterSlideLoad: afterslideload,
//    某一滑块滑动前的回调
    onSlideLeave: onslideleave,

}

