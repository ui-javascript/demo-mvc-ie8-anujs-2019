const routes = {
    path: '/',
    getComponent(nextState, cb) {
        require.ensure([], require => cb(null, require('@/views/home')), 'home')
    },

    childRoutes: [
        {
            path: '/login',
            getComponent(nextState, cb) {
                require.ensure([], require => cb(null, require('@/views/login')), 'login')
            },
        },
        {
            path: '/table',
            getComponent(nextState, cb) {
                require.ensure([], require => cb(null, require('@/views/table')), 'table')
            },
        },
        {
            path: '/userInfo',
            getComponent(nextState, cb) {
                require.ensure([], require => cb(null, require('@/views/userInfo')), 'userInfo')
            },
        },
    ]
}

export default routes
