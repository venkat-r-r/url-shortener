const executeQuery = require ('./helpers').executeQuery;

/**
 * @description consists of various functions to retrieve data from and insert data to database
 * @return {*}
 */
function mySqlQueries() {

    /**
     * @description check if given alias exists in our database
     * @param {string} [alias]
     * @return {boolean}
     */
    const isAliasExists = async (alias) =>
        (await executeQuery (`SELECT count(*) from urls WHERE alias = '${alias}'`))[0]['count(*)'] > 0;

    /**
     * @description retrieve the alias for given URL
     * @param {string} [url]
     * @return {*} rows
     */
    const getAlias = async (url) =>
        (await executeQuery (`SELECT alias from urls WHERE url = '${url}'`));

    /**
     * @description check if given URL exists in our database
     * @param {string} [url]
     * @return {boolean}
     */
    const isUrlExists = async (url) =>
        (await executeQuery (`SELECT count(*) from urls WHERE url = '${url}'`))[0]['count(*)'] > 0;

    /**
     * @description retrieve the URL for given alias
     * @param {string} [alias]
     * @return {*} rows
     */
    const getUrl = async (alias) =>
        (await executeQuery (`SELECT url from urls WHERE alias = '${alias}'`));

    /**
     * @description insert row (alias and url) to database
     * @param {string} [alias]
     * @param {string} [url]
     */
    const saveUrl = async (alias, url) =>
        (await executeQuery (`INSERT INTO urls (alias, url) values ('${alias}', '${url}')`));

    return {getAlias, getUrl, saveUrl, isAliasExists, isUrlExists};
}

module.exports = mySqlQueries ();
