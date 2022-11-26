# url-shortener
shorten long URLs

## Development environment setup
- run `npm install`
- create .dev_env file in root directory
- add below env variables with your values
  ```
  #dev environment
  environment="dev"

  # server
  HOSTNAME="localhost"
  PORT="8080"

  # database
  DB_HOSTNAME="127.0.0.1"
  DB_PORT="3306"
  DB_USER="username"
  DB_PASSWORD="password"
  DB_NAME="url_shortener"

  #logger
  LOG_LEVEL="debug" or "info" or whatever way you want
  ```
- start the server with below command
  ```
  npm run start:dev
  ```
## consume the API
- GET /alias => redirects to url which is mapped to given alias
- POST / => maps the url to alias if provided or generates a random short string and returns the alias
  ```
  body: {
    alias: "short string", (optional)
    url: "long url"
  }
  ```
