class UrlShortener {

    constructor () {
        this.urls = {};
    }

    #generateUniqueAlias = function () {
        let alias;
        do {
            alias = Math.random().toString(36).slice (3);
        } while (this.urls.hasOwnProperty (alias));
        return alias;
    }
    
    #validateAlias = function (alias) {
        if (this.urls.hasOwnProperty (alias)) {
            throw new Error (`[${alias}] is not available`);
        }
        return alias;
    }

    #validateUrl (str) {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        if (!pattern.test(str)) {
            throw new Error ('Invalid URL received');
        }
    }

    getUrl = function (alias) {
        if (this.urls.hasOwnProperty (alias)) {
            return this.urls [alias]
        }
        throw new Error ('URL does not exist');
    }

    saveUrl = function (data) {
        const url = data.url;
        let alias = data.alias;

        this.#validateUrl (url);
        if (alias) {
            this.#validateAlias (alias);
        }
        else {
            alias = this.#generateUniqueAlias ();
        }
        
        // save URL
        this.urls [alias] = url;

        return alias;
    }

}

module.exports.UrlShortener = UrlShortener;