# Todo REST API 2.0 with tests

A simple Todo REST API including unit tests.

### Instructions

1. Clone the project:

```
git clone https://gitlab.com/ntnu-dcst2002/todo-api-v2-with-tests.git
```

2. Install dependencies with npm:

```
cd todo-api-v2-with-tests
npm install
```
3. Create two MySQL-databases: one for the *dev* environment and one for the *test* environment.
3. Add the Tasks-table to both databases:

```sql
CREATE TABLE IF NOT EXISTS Tasks (
  id INTEGER NOT NULL,
  title TEXT NOT NULL,
  done BOOLEAN,
  PRIMARY KEY (id));
```

5. Create a database configuration file for the *dev* environment called "config.js" in the root directory:

```javascript
process.env.MYSQL_HOST = '...';
process.env.MYSQL_USER= '...';
process.env.MYSQL_PASSWORD = '...';
process.env.MYSQL_DATABASE = '...';
```

6. Similarly, create a *test* database configuration file called "config.js" in the "test" directory. 

7. Use the following command to run the API:

```
npm run start
```

8. Use the following command to execute the unit tests:

```
npm run test
```