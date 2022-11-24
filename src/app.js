const express = require ('express');

const config = require ('./data/config').serverConfig;
const router = require ('./router/router');


const app = express ();
app.use(express.json());

app.use ('', router);

const server = app.listen (config.port, config.hostname, async () => {
    const address = server.address ();
    baseUrl = `http://${address.address}:${address.port}`;
    console.log ('App listening at', baseUrl);
});