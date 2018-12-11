// var FullPage = require('./views/FullPage.san');
var Hello = require('./views/Hello.san');
var Hi = require('./views/Hi.san');
var sanRouter = require('san-router');
var router = sanRouter.router;
var Link = sanRouter.Link;

router.add({
    rule: '/',
    Component: Hello,
    target: '#app',
});
router.add({
    rule: '/hi',
    Component: Hi,
    target: '#app'
})
router.start();
