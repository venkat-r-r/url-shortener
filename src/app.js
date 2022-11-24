const express = require ('express');

const config = require ('./data/config').serverConfig;
const router = require ('./router/router');
const Logger = require ('./utilities/logger').Logger;

const log = new Logger ('app.js');
const app = express ();
app.use(express.json());

app.use ('', router);

const server = app.listen (config.port, config.hostname, async () => {
    const prefix = 'app.listen ()';
    const address = server.address ();
    baseUrl = `http://${address.address}:${address.port}`;
    log.info (prefix, `App listening at ${baseUrl}`);
});