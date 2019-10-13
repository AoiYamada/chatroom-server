# Chatroom Server

### by Docker

```sh
docker-compose up -d
```

### Manually

```sh
npm i --no-save
npm i sequelize-cli -g
```

Edit the database config in [**_config/default.js_**](./config/default.js):
```js
// ...
  DB: {
    REDIS: {
      host: "YOUR_REDIS_HOST",
      password: "PASSWORD",
      // ...
    },
    MYSQL: {
      username: "USER",
      password: "PASSWORD",
      host: "YOUR_MYSQL_HOST",
      // ...
    },
  },
// ...
```

Create MySQL schema:

```sh
sequelize-cli db:create
sequelize-cli db:migrate
```

Start the server

```sh
npm run start
```