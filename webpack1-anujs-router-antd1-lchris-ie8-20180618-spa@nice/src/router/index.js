const routes = [
  {
    path: '/',
    getComponent(nextState, cb) {
      require.ensure([], require => cb(null, require('@/layouts/UserLayout')), 'home')
    },
    childRoutes: [
      { path: '/', redirect: '/userInfo' },
      {
        path: '/userInfo',
        getComponent(nextState, cb) {
          require.ensure([], require => cb(null, require('@/views/userInfo')), 'userInfo')
        },
      },
    ]
  },
  {
    path: '/login',
    getComponent(nextState, cb) {
      require.ensure([], require => cb(null, require('@/views/login')), 'login')
    },
  }
]

export default routes
