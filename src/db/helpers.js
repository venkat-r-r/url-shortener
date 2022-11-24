const mysqlConnection = require ('./connection');

function MySqlHelpers () {

    const executeQuery = async (sqlQuery) => {
        try {
            const result = await runQuery (mysqlConnection, sqlQuery).then (results => results);
            return result;
        }
        catch (err) {
            console.log (JSON.stringify (err, null, 2));
            return null;
        }
    };

    const runQuery = async (conn, sqlQuery) => {
        return new Promise ((resolve, reject) => {
            conn.query (sqlQuery, (err, result) => {
                if (err) {
                    reject (err);
                }
                else {
                    resolve (result);
                }
            });
        })
    };

    return {executeQuery};
}

module.exports = MySqlHelpers ();