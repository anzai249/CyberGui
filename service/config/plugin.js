'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  mysql: {
    enable: true,
    package: 'egg-mysql'
  },
  sqlite: {
    enable: true,
    package: 'egg-database-sqlite'
  }
};