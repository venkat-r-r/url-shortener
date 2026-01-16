const poolPromise = require ('./connection');
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
            const pool = await poolPromise;
            const [result] = await pool.query(sqlQuery);
            log.debug(prefix, `query '${sqlQuery}' result:\n${JSON.stringify(result, null, 2)}`);
            return result;
        } catch (err) {
            log.error(prefix, err.toString());
            return null;
        }
    };

    return {executeQuery};
}

module.exports = mySqlHelpers ();
