const db = require("../models");
const { paginate } = require("../utils/paginate");
const { generate_otp, otp_expiration, isAfter } = require("../utils/otp");
const User = db.users;
const client = db.redisClient;
exports.getAll = (req, res) => {
  const page = +req.query.page || 1;
  const pageSize = +req.query.pageSize || 10;
  client.get("users", async (err, data) => {
    let users;
    try {
      if (data !== null) {
        users = paginate(JSON.parse(data), page, pageSize);
        return res.status(200).send({
          status: 200,
          message: "data found",
          data: users,
          page,
          pageSize,
          totalPages: Math.ceil(JSON.parse(data).length / pageSize),
          totalItems: JSON.parse(data).length,
          nextPage: `http://localhost:3000/users?page=${
            page + 1
          }&pageSize=${pageSize}`,
        });
      } else {
        let uData = await User.findAll();
        client.setex("users", 3600, JSON.stringify(uData));
        users = paginate(uData, page, pageSize);
        return res.status(200).send({
          status: 200,
          message: "data found",
          data: users,
          page,
          pageSize,
          totalPages: Math.ceil(uData.length / pageSize),
          totalItems: uData.length,
          nextPage: `http://localhost:3000/users?page=${
            page + 1
          }&pageSize=${pageSize}`,
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

exports.create = (req, res) => {
  const { name, phone_number } = req.body;
  if (!name) {
    res.status(400).send({
      message: "name can not be empty!",
    });
  }
  if (!phone_number) {
    res.status(400).send({
      message: "phone_number can not be empty!",
    });
  }
  User.findOne({ where: { phone_number } })
    .then((user) => {
      if (user)
        res.status(400).send({
          message: "Phone number already exists!",
        });
      else {
        User.create({ name, phone_number })
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the User.",
            });
          });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: err.message || "Some error occurred while finding User.",
      });
    });
};

exports.generate_OTP = (req, res) => {
  let { phone_number } = req.body;
  if (!phone_number)
    res.status(400).send({ message: "phone_number field should not empty!" });
  User.findOne({ where: { phone_number } })
    .then((user) => {
      if (user) {
        user
          .update({
            otp: generate_otp(),
            otp_expiration_date: otp_expiration(),
          })
          .then((user) => {
            res.send({ user_id: JSON.stringify(user.id) });
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                `Error while generating OTP for ${phone_number} phone number!`,
            });
          });
      } else {
        res.status(404).send({
          message: `Cannot find User for ${phone_number} phone number!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error while finding user for ${phone_number} phone number!`,
      });
    });
};

exports.verify_OTP = (req, res) => {
  const id = req.params.user_id;
  const otp = req.query.otp;
  if (!id) res.status(400).send({ message: "User id required!" });
  if (!otp) res.status(400).send({ message: "OTP code required!" });
  User.findOne({ where: { id } })
    .then((data) => {
      if (data) {
        if (data.otp === otp) {
          if (isAfter(data.otp_expiration_date))
            res.status(400).send({
              message: `OTP expired!`,
            });
          else res.send(data);
        } else {
          res.status(400).send({
            message: `OTP not matched!`,
          });
        }
      } else {
        res.status(404).send({
          message: `Cannot find User with id ${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving User with id ${id}`,
      });
    });
};
