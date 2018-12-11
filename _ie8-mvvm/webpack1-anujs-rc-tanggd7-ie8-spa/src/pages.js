/**
|--------------------------------------------------
| 异步加载模块
|--------------------------------------------------
*/
export const login = (location, callback) => {
  require.ensure(
    [],
    require => {
      callback(null, require('./components/login'));
    },
    'login'
  );
};

export const desktop = (location, callback) => {
  require.ensure(
    [],
    require => {
      callback(null, require('./components/desktop'));
    },
    'desktop'
  );
};

export const notfound = (location, callback) => {
  require.ensure(
    [],
    require => {
      callback(null, require('./components/status/not-found'));
    },
    'notFound'
  );
};
