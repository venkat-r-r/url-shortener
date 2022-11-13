const express = require ('express');

const conn = require ('./mysql').conn;
const UrlShortener = require ('./handler').UrlShortener;
const {hostname, port} = require ('./data/config');

const app = express ();
app.use(express.json()) 

const urlShortener = new UrlShortener ();

// conn.connect((err)=> {
//     if (err) throw err;
//     console.log('Connected to Database');
// });

app.get ('/:alias', (req, res) => {
    try {
        const url = urlShortener.getUrl (req.params.alias);
        res.redirect (url);
    }
    catch (error) {
        res.status (404).send ({
            error: error.message,
            alias: req.params.alias
        });
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