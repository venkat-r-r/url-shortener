const express = require ('express');
const router = express.Router ();

const urlShortener = require ('../services/handler');

router.get ('/', (_, res) => res.sendFile ( './views/home.html', {root: __dirname}));

router.get ('/:alias', async (req, res) => {
    try {
        console.log ('alias:', req.params.alias);
        res.redirect (`${await urlShortener.getUrl (req.params.alias)}`);
    }
    catch (error) {
        console.error (JSON.stringify (error, null, 2));
        res.sendFile ('./views/invalid.html', {root: __dirname})
    }
});

router.post ('/', async (req, res) => {
    const data = req.body;
    try {
        const alias = await urlShortener.saveUrl (data);
        res.status (201).send ({
            alias
        });
    }
    catch (error) {
        console.error (JSON.stringify (error, null, 2));
        res.status (409).send ({
            error: error.message,
            alias: data.alias || ''
        });
    }
});

module.exports = router;
