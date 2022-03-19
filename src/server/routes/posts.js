const router = require("express").Router();
const { getAll } = require("../controllers/posts");

module.exports = (app) => {
  router.route("/").get(getAll);
  app.use("/posts", router);
};
