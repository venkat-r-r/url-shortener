require ('dotenv').config ();

module.exports = {
    dbConfig : {
        host: process.env.db_hostname,
        port: process.env.db_port,
        user: process.env.db_user,
        password: process.env.db_password,
        database: process.env.db_name
    },
    serverConfig: {
        hostname: process.env.hostname,
        port: process.env.port
    },
    logger: {
        logLevel: process.env.log_level
    }
};