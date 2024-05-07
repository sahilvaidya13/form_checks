const Sequelize = require("sequelize");
require("dotenv").config();
// Define the connection parameters
const sequelize = new Sequelize(
  "visa_app",
  process.env.USER,
  process.env.PASS,
  {
    host: process.env.HOST,

    port: 24239,
    dialect: "mysql",
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Connection to the database has been established successfully."
    );
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
