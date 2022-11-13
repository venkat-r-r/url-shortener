const express = require ('express');

const UrlShortener = require ('./handler').UrlShortener;
const {hostname, port} = require ('./data/config');

const app = express ();
app.use(express.json()) 

const urlShortener = new UrlShortener ();

app.get ('/', (req, res) => res.sendFile ('./views/home.html', {root: __dirname}));

app.get ('/:alias', (req, res) => {
    try {
        const url = urlShortener.getUrl (req.params.alias);
        res.redirect (url);
    }
    catch (error) {
        res.sendFile ('./views/invalid.html', {root: __dirname})
    }
});

app.post ('/', (req, res) => {
    const data = req.body;
    try {
        const alias = urlShortener.saveUrl (data);
        res.status (201).send ({
            alias,
            shortUrl: `${baseUrl}/${alias}`
        });
    }
    catch (error) {
        res.status (409).send ({
            error: error.message,
            alias: data.alias || ''
        });
    }
});

const server = app.listen (port, hostname, () => {
    const address = server.address ();
    baseUrl = `http://${address.address}:${address.port}`;
    console.log ('[base url]', baseUrl);
});