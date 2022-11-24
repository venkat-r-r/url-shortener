const executeQuery = require ('./mysqlUtility').executeQuery;

function MySqlQueries () {

    const isAliasExists = async (alias) => 
        (await executeQuery (`SELECT count(*) from urls WHERE alias = '${alias}'`))[0]['count(*)'] > 0;

    const getUrl = async (alias) => 
        (await executeQuery (`SELECT url from urls WHERE alias = '${alias}'`));

    const saveUrl = async (alias, url) => 
        (await executeQuery (`INSERT INTO urls (alias, url) values ('${alias}', '${url}')`));

    return {getUrl, saveUrl, isAliasExists};
}


module.exports = MySqlQueries ();