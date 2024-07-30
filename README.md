# Enigma backend server

- Backend: enigma-api.webledger.in
- Frontend: enigma.webledger.in

## Pre-requisites/tech stack

- nodejs-v18.x
- npm v10.x
- MySQL 8.x/Postgres 14.x
- Express-v4.19 => running on aws lambda using serverless-http-v3.2.0

## Env

```sh
HOST=127.0.0.1
PORT=3000
NODE_ENV=development
APP_URL=http://${HOST}:${PORT}

CACHE_VIEWS=false


DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_DATABASE=enigma_database
DB_LOG=true

SESSION_DRIVER=cookie
HASH_DRIVER=bcrypt
```
