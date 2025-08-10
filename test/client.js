const axios = require('axios');

class ApiClient {
  constructor(baseUrl) {
    this.client = axios.create({
      baseURL: baseUrl,
      timeout: 5000
    });
  }

  async get(path) {
    try {
      const res = await this.client.get(path);
      return {status: res.status, data:res.data};
    } catch (err) {
      this.handleError(err);
    }
  }

  async post(path, body) {
    try {
      const res = await this.client.post(path, body);
      return {status: res.status, data:res.data};
    } catch (err) {
      this.handleError(err);
    }
  }

  async delete(path) {
    try {
      const res = await this.client.delete(path);
      return {status: res.status, data:res.data};
    } catch (err) {
      this.handleError(err);
    }
  }

  handleError(err) {
    if (err.response) {
      console.error(`HTTP ${err.response.status}:`, err.response.data);
    } else {
      console.error(`Error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = ApiClient;
