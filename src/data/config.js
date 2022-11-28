if (process.env.NODE_ENV?.toLowerCase () !== 'production') {
    require ('dotenv').config ({path: `${process.cwd ()}/.dev_env`, override: true});
}

module.exports = {
    dbConfig: {
        host: process.env.DB_HOSTNAME,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    serverConfig: {
        hostname: process.env.HOSTNAME,
        port: process.env.PORT
    },
    logger: {
        logLevel: process.env.LOG_LEVEL
    }
};

const log = new (require ('../utilities/logger').Logger) ('config.js');
console.log (process.cwd ());
log.info ('NODE_ENV', `Started in '${process.env.environment}' environment in [${process.env.LOG_LEVEL}] mode`);
