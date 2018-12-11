const detect = require('detect-port');
const chalk = require('chalk');

/* eslint-disable no-console */
const clog = console.log;
/* eslint-enable no-console */

const choosePort = PORT =>
  detect(PORT)
    .then(
      port =>
        new Promise(resolve => {
          if (port === PORT) {
            return resolve(port);
          }
          clog(chalk.red(`端口 ${PORT} 已被占用`));
          return resolve(null);
        })
    )
    .catch(err => {
      throw new Error(err);
    });

module.exports = choosePort;
