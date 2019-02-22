const Mock = require('mockjs');

Mock.mock('test.ajax', {
  'code|1': 'success',
  'data|1-10': [
    {
      'id|+1': 1,
      email: '@EMAIL',
    },
  ],
});

Mock.mock('role.list', {
  entity: [
    {
      id: 1,
      name: '管理员',
      system: 0,
      enable: 1,
      bak: '这是管理员',
    },
    {
      id: 2,
      name: '角色1',
      system: 1,
      enable: 1,
      bak: '这是角色1',
    },
  ],
  code: 200,
  message: '成功',
});
