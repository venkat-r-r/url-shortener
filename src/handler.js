class UrlShortener {

    constructor () {
        this.urls = {};
    }

    #generateUniqueAlias = function () {
        let alias;
        do {
            alias = Math.random().toString(36).slice (3);
        } while (this.#isAvailable (alias));
        return alias;
    }
    
    #isAvailable = function (alias) {
        return this.urls.hasOwnProperty (alias);
    }

    #isValidURL (str) {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(str);
    }

    getUrl = function (req, res) {
        const alias = req.params.alias;
        if (this.#isAvailable (alias)) {
            res.status (200).send ({
                alias,
                url: `${this.urls [alias]}`
            });
        }
        else {
            res.status (404).send ({
                alias,
                message: `URL does not exist`
            });
        }
    }

    saveUrl = function (req, res) {
        const url = req.body.url;
        if (!this.#isValidURL (url)) {
            res.status (400).send ({
                url,
                message: 'Invalid URL received'
            });
            return;
        }
        const alias = req.body.alias || this.#generateUniqueAlias ();
        if (this.#isAvailable (alias)) {
            res.status (409).send ({
                message: `[${alias}] is not available`
            });
        }
        else {
            // save URL
            this.urls [alias] = url;

            res.status (201).send ({
                alias,
                shortUrl: `${baseUrl}/${alias}`
            });
        }

    }

}

module.exports.UrlShortener = UrlShortener;