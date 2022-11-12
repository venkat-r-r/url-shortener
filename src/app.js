const express = require ('express');

const conn = require ('./mysql').conn;
const UrlShortener = require ('./handler').UrlShortener;
const {hostname, port} = require ('./data/config');

const app = express ();
app.use(express.json()) 

const urlShortener = new UrlShortener ();

conn.connect((err)=> {
    if (err) throw err;
    console.log('Connected to Database');
});

app.get ('/:alias', (req, res) => urlShortener.getUrl (req, res));

app.post ('/', (req, res) => urlShortener.saveUrl (req, res));

const server = app.listen (port, hostname, () => {
    const address = server.address ();
    baseUrl = `http://${address.address}:${address.port}`;
    console.log ('[base url]', baseUrl);
});