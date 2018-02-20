# Sequelize and MySQL


## Project initialization

### 1. install MySQL

### 2. install sequelize
```
npm install --save sequelize
npm install --save-dev sequelize-cli
```

### 3. Initialize sequelize
```
node_modules/.bin/sequelize init
```

### 4. Create database
```
node_modules/.bin/sequelize db:create
```

### 5. Create tables
Run file [createTables.js](./createTables.js)
```
node ./createTables.js
```
