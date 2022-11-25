const express = require ('express');
// eslint-disable-next-line new-cap
const router = express.Router ();

const urlShortener = require ('../services/urlShortener');
const Logger = require ('../utilities/logger').Logger;

const log = new Logger ('router.js');

router.get ('/:alias', async (req, res) => {
    const prefix = 'GET request';
    try {
        log.debug (prefix, `alias: ${req.params.alias}`);
        if (!req.params.alias) {
            throw new Error ('Invalid request');
        }
        res.redirect (`${await urlShortener.getUrl (req.params.alias)}`);
    } catch (error) {
        log.error (prefix, error.toString ());
        res.status (404).send ({
            error: error.message
        });
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
        log.error (prefix, error.toString ());
        res.status (409).send ({
            error: error.message,
            alias: data.alias || ''
        });
    }
});

module.exports = router;
