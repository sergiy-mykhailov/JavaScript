
const db = require('./models');

db.sequelize.sync({ force: true }).then(
  () => {
    console.log('Tables created successfully!!!!');
    process.exit(0);
  },
  (err) => {
    console.error('Something went wrong :(', err);
    process.exit(-1);
  }
);
