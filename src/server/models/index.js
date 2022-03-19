const dbConfig = require("../config/config");
const { createClient } = require("redis");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USERNAME,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
    operatorsAliases: false,
  }
);

const REDIS_PORT = process.env.REDIS_PORT || 6379;
const redisClient = createClient({
  port: REDIS_PORT,
  legacyMode: true,
});
redisClient.connect();
redisClient.on("connect", () => {
  console.log(`Connected to Redis on port ${REDIS_PORT}.`);
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.redisClient = redisClient;

db.users = require("./users")(sequelize, Sequelize);

module.exports = db;
