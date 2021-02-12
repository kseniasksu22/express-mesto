const path = require("path");
const getDataFromFile = require("../helpers/files");

const usersDataPath = path.join(__dirname, "..", "data", "users.json");

const getUsers = (req, res) => {
  return getDataFromFile(usersDataPath)
    .then((data) => res.status(200).send(data))
    .catch(() => {
      res.status(500).send({ message: "Ошибка сервера" });
    });
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
    .catch(() => {
      res.status(500).send({ error: "Ошибка сервера" });
    });
};
module.exports = { getUsers, getuser };
