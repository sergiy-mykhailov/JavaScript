# Sequelize

## Project initialization

### 1. install database (MySQL, PostgreSQL...)

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

### 5. Drop database
```
node_modules/.bin/sequelize db:drop
```

### 6. Migrations
```
node_modules/.bin/sequelize db:migrate
```

### 7. Seeders
```
node_modules/.bin/sequelize db:seed:all
```

### 8. Examples
#### 8.1 Create tables
Run file [createTables.js](./createTables.js)
```
node ./createTables.js
```
