const mysqlConnection = require ('./connection');

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
        try {
            const result = await runQuery (mysqlConnection, sqlQuery).then ((results) => results);
            return result;
        } catch (err) {
            console.log (JSON.stringify (err, null, 2));
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
