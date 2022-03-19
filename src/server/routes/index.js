module.exports = (app) => {
  require("./users")(app);
  require("./posts")(app);
  app.use((req, res) => res.status(404).send("404, Route not  found!"));
};
