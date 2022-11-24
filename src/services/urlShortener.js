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

    const getUrl = async (alias) => (await mysqlQueries.getUrl (alias))[0]['url'];

    const saveUrl = async (alias, url) => {
        if (isUrlValid (alias)) {
            if (alias === undefined) {
                if (await mysqlQueries.isUrlExists (url)) {
                    alias = (await mysqlQueries.getAlias (url))[0]['alias'];     
                }
                else {
                    alias = await generateAlias ();
                    await mysqlQueries.saveUrl (alias, url);
                }
                return alias;
            }
        }
    };

    return {getUrl, saveUrl};
}

module.exports = urlShortener ();