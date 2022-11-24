const { getUrl } = require('../db/mysqlQueries');
const mysqlQueries = require ('../db/mysqlQueries');

function urlShortener () {

    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

    const isUrlValid = (url) => !!pattern.test (url);

    const generateAlias = async () => {
        let alias;
        do {
            alias = Math.random().toString(36).slice (3);
        } while (await mysqlQueries.isAliasExists (alias));
        return alias;
    };

    const getUrl = async (alias) => {
        if (await mysqlQueries.isAliasExists (alias)){
            return (await mysqlQueries.getUrl (alias))[0]['url'];
        }
        throw `Alias [${alias}] does not exist`;
    };

    const saveUrl = async (alias, url) => {
        if (isUrlValid (url)) {
            if (alias === undefined) {
                if (await mysqlQueries.isUrlExists (url)) {
                    alias = (await mysqlQueries.getAlias (url))[0]['alias'];
                    return alias;
                }
                else {
                    alias = await generateAlias ();
                }
            }
            else {
                if (await mysqlQueries.isAliasExists (alias)) {
                    throw  new Error (`Alias [${alias}] unavailable`);
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