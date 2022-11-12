require ('dotenv').config ();

module.exports = {
    hostname: process.env.hostname,
    port: process.env.port,
    dbHost: process.env.db_hostname,
    dbPort: process.env.db_port,
    dbUser: process.env.db_user,
    dbPassword: process.env.db_password,
    dbName: process.env.db_name
};