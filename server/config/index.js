/* eslint-disable global-require */
const env = process.env.NODE_ENV || 'development';
let localConfig;
try {
  localConfig = require('./local.config');
} catch (err) {
  console.log('Local config not found', err);
}
let config = {

  development: {
    port: '6800',
    secret: 'usersecret',
    url: 'http://localhost:6800',
    payrollSiteAddress: 'http://localhost:3000',
    hashType: 'md5',
    hashKey: 'fusion',
    username: 'postgres',
    password: 'postgres',
    database: 'database_name',
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false
  },
  production: {
    port: process.env.PORT || '6800',
    secret: 'usersecret',
    url: 'http://www.employee.co.ke',
    payrollSiteAddress: 'http://www.employee.co.ke',
    siteAddress: 'http://www.employee.co.ke',
    hashType: 'md5',
    hashKey: 'fusion',
    databaseConfig: {
      username: 'fusion',
      password: 'fusion',
      databaseName: 'payrollsite',
      host: '127.0.0.1',
      dialect: 'postgres',
      logging: false
    }
  }
};

if (localConfig) {
  config = Object.assign(config, localConfig);
}


module.exports = config[env];
