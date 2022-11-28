const mysqlQueries = require ('../db/sqlQueries');

/**
 * @description function to retrieve and store urls
 * @return {*}
 */
function urlShortener() {

    // RegExp object represents 'URL' pattern
    const urlPattern = new RegExp (
        '^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$', // fragment locator
        'i' // case insensitive
    );

    // RegExp object represents 'alias' pattern
    const aliasPattern = new RegExp ('[a-zA-Z0-9]{5, 8}', i);

    /**
     * @description check if the provided string is url or not
     * @param {string} [url] string representing URL
     * @return {boolean}
     */
    const isUrlValid = (url) => !!urlPattern.test (url);

    /**
     * @description check if the provided string is alias or not
     * @param {string} [alias] string representing alias
     * @return {boolean}
     */
    const isAliasValid = (alias) => !!aliasPattern.test (alias);

    /**
     * @description Generate a unique alias
     * @return {string} alias
     */
    const generateAlias = async () => {
        let alias;
        do {
            alias = Math.random ().toString (36).slice (3);
        } while (await mysqlQueries.isAliasExists (alias));
        return alias;
    };

    /**
     * @description retrieve url for given alias
     * @param {string} [alias] alias for which URL was mapped
     * @return {string} url if alias exists
     */
    const getUrl = async (alias) => {
        if (!isAliasValid (alias)) {
            throw Error (`Invalid alias [${alias}] received`);
        }
        if (await mysqlQueries.isAliasExists (alias)) {
            return (await mysqlQueries.getUrl (alias))[0]['url'];
        }
        throw Error (`Alias [${alias}] does not exist`);
    };

    /**
     * @description store URL and alias
     * @param {string} [url] actual URL to map with given alias
     * @param {string} [alias] small string to represent the long URL (optional)
     * @return {string} either generated or specified alias
     */
    const saveUrl = async (url, alias) => {
        if (isUrlValid (url)) {
            if (alias === undefined) {
                if (await mysqlQueries.isUrlExists (url)) {
                    alias = (await mysqlQueries.getAlias (url))[0]['alias'];
                    return alias;
                } else {
                    alias = generateAlias ();
                }
            } else {
                if (isAliasValid (alias)) {
                    throw Error (`Invalid alias [${alias}] received`);
                }
                if (await mysqlQueries.isAliasExists (alias)) {
                    throw new Error (`Alias [${alias}] unavailable`);
                }
            }
            await mysqlQueries.saveUrl (alias, url);
            return alias;
        }
        throw new Error (`URL [${url}] invalid`);
    };

    return {getUrl, saveUrl};
}

module.exports = urlShortener ();
