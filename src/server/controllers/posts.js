const db = require("../models");
const axios = require("axios");
const client = db.redisClient;
exports.getAll = async (req, res) => {
  client.get("posts", async (err, data) => {
    try {
      if (data !== null) {
        return res.status(200).send({
          status: 200,
          message: "data found",
          data: JSON.parse(data),
        });
      } else {
        const { data } = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        client.setex("posts", 3600, JSON.stringify(data));
        return res.status(200).send({
          status: 200,
          message: "data found",
          data: JSON.parse(data),
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        message: "Unable to find data",
        errors: error,
        status: 400,
      });
    }
  });
};
