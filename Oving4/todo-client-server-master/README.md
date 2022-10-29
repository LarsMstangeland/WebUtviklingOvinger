# Client - server example

## Create databases

Create two databases `username_todo_dev` and `username_todo_test`. For detailed instructions see
https://innsida.ntnu.no/wiki/-/wiki/Norsk/Bruke+MySQL+ved+NTNU.

In both databases, create a `Tasks` table:

```sql
CREATE TABLE Tasks (
  id INT NOT NULL AUTO_INCREMENT,
  title TEXT NOT NULL,
  done BOOL DEFAULT false,
  PRIMARY KEY(id)
);
```

## Setup database connections

You need to create two configuration files that will contain the database connection details. These
files should not be uploaded to your git repository, and they have therefore been added to
`.gitignore`. The connection details may vary, but example content of the two configuration files
are as follows:

`server/config.ts`:

```ts
process.env.MYSQL_HOST = 'mysql.stud.ntnu.no';
process.env.MYSQL_USER = 'username_todo';
process.env.MYSQL_PASSWORD = 'username_todo';
process.env.MYSQL_DATABASE = 'username_todo_dev';
```

`server/test/config.ts`:

```ts
process.env.MYSQL_HOST = 'mysql.stud.ntnu.no';
process.env.MYSQL_USER = 'username_todo';
process.env.MYSQL_PASSWORD = 'username_todo';
process.env.MYSQL_DATABASE = 'username_todo_test';
```

These environment variables will be used in the `server/src/mysql-pool.ts` file.

## Start server

Install dependencies and start server:

```sh
cd server
npm install
npm start
```

### Run server tests:

```sh
npm test
```

## Bundle client files to be served through server

Install dependencies and bundle client files:

```sh
cd client
npm install
npm start
```
