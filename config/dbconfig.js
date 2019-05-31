var dbconfigJson  = require('./dbconfig.json');

//mysql db config
module.exports = () => {

  return {
    local: {
      host     : dbconfigJson.local.host,
      user     : dbconfigJson.local.user,
      password : dbconfigJson.local.password,
      port     : dbconfigJson.local.port,
      database : dbconfigJson.local.database,
      multipleStatements: true
    },
    server: {
      host     : dbconfigJson.server.host,
      user     : dbconfigJson.server.user,
      password : dbconfigJson.server.password,
      port     : dbconfigJson.server.port,
      database : dbconfigJson.server.database,
      multipleStatements: true
    },
    real: {
      host     : dbconfigJson.real.host,
      user     : dbconfigJson.real.user,
      password : dbconfigJson.real.password,
      port     : dbconfigJson.real.port,
      database : dbconfigJson.real.database,
      multipleStatements: true
    }
  };
};
