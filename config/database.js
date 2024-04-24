// this page sets up(initialize) a connection to a PostgreSQL database using Sequelize
// which is an ORM for Node.js, in other words is some drive/package that allows us to interact with db

const Sequelize = require('sequelize');
sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });