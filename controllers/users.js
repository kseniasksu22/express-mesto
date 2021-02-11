const path = require("path");
const getDataFromFile = require("../helpers/files");

const usersDataPath = path.join(__dirname, "..", "data", "users.json");

const getUsers = (req, res) => {
  return getDataFromFile(usersDataPath)
    .then((data) => res.status(200).send(data))
    .catch((error) => res.status(500).send({ message: error.message }));
};

const getuser = (req, res) => {
  return getDataFromFile(usersDataPath)
    .then((users) => users.find((user) => user._id === req.params.id))
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: "Нет пользователя с таким id" });
      }
      res.status(200).send(user);
    })
    .catch((error) => res.status(500).send({ message: error.message }));
};
module.exports = { getUsers, getuser };
