const express = require ('express');
// eslint-disable-next-line new-cap
const router = express.Router ();

const urlShortener = require ('../services/urlShortener');
const Logger = require ('../utilities/logger').Logger;

const log = new Logger ('router.js');

router.get ('/', (_, res) => res.sendFile ( './views/home.html', {root: __dirname}));

router.get ('/:alias', async (req, res) => {
    const prefix = 'GET request';
    try {
        log.debug (prefix, `alias: ${req.params.alias}`);
        res.redirect (`${await urlShortener.getUrl (req.params.alias)}`);
    } catch (error) {
        log.error (prefix, JSON.stringify (error, null, 2));
        res.sendFile ('./views/invalid.html', {root: __dirname});
    }
});

router.post ('/', async (req, res) => {
    const data = req.body;
    const prefix = 'POST request';
    log.debug (prefix, `body: ${JSON.stringify (data, null, 2)}`);
    try {
        const alias = await urlShortener.saveUrl (data.url, data.alias);
        res.status (201).send ({
            alias
        });
    } catch (error) {
        log.error (prefix, error.message);
        res.status (409).send ({
            error: error.message,
            alias: data.alias || ''
        });
    }
});

module.exports = router;
