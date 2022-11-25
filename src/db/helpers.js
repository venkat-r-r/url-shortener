const mysqlConnection = require ('./connection');
const Logger = require ('../utilities/logger').Logger;

const log = new Logger ('helper.js');

/**
 * @description helper functions to execute any sql query
 * @return {*}
 */
function mySqlHelpers() {

    /**
     * @description execute given query
     * @param {string} [sqlQuery] SQL query to execute
     * @return {*}
     */
    const executeQuery = async (sqlQuery) => {
        const prefix = 'executeQuery';
        try {
            const result = await runQuery (mysqlConnection, sqlQuery).then ((results) => results);
            log.debug (prefix, `query '${sqlQuery}' result:\n${JSON.stringify (result, null, 2)}`);
            return result;
        } catch (err) {
            log.error (prefix, err.toString ());
            return null;
        }
    };

    /**
     * @description helper function for above function (executeQuery)
     * @param {*} [conn] MySql connection object
     * @param {string} [sqlQuery] SQL query to execute
     * @return {Promise}
     */
    const runQuery = async (conn, sqlQuery) => {
        return new Promise ((resolve, reject) => {
            conn.query (sqlQuery, (err, result) => {
                if (err) {
                    reject (err);
                } else {
                    resolve (result);
                }
            });
        });
    };

    return {executeQuery};
}

module.exports = mySqlHelpers ();
