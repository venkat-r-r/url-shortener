const executeQuery = require ('./mysqlUtility').executeQuery;

function MySqlQueries () {

    const isAliasExists = async (alias) => 
        (await executeQuery (`SELECT count(*) from urls WHERE alias = '${alias}'`))[0]['count(*)'] > 0;
        
    const getAlias = async (url) => 
            (await executeQuery (`SELECT alias from urls WHERE url = '${url}'`));

    const isUrlExists = async (url) => 
        (await executeQuery (`SELECT count(*) from urls WHERE url = '${url}'`))[0]['count(*)'] > 0;

    const getUrl = async (alias) => 
        (await executeQuery (`SELECT url from urls WHERE alias = '${alias}'`));


    const saveUrl = async (alias, url) => 
        (await executeQuery (`INSERT INTO urls (alias, url) values ('${alias}', '${url}')`));

    return {getAlias, getUrl, saveUrl, isAliasExists, isUrlExists};
}


module.exports = MySqlQueries ();