const ApiClient = require('./client');
const { expect } = require ('chai');
const api = new ApiClient('http://localhost:3000');

let alias;
describe('URL Shortener API', function () {

    it('should create a new alias', async function () {
        const res = await api.post('/', { url: 'https://google.com' });
        expect (res.status).to.equal (201);
        alias = res.data.alias;
    });

    it('should get the alias', async function () {
        const res = await api.get(`/${alias}`);
        expect (res.status).to.equal (200);
    });

    it('should delete the alias', async function () {
        const res = await api.delete(`/${alias}`);
        expect (res.status).to.equal (204);
    });
});
