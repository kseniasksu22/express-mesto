const User = require("../models/user");

const getUsers = (req, res) => {
  User.find({})
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send({ message: "Ошибка сервера" });
    });
};

const getuser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: "Ресурс не найден" });
        return;
      }
      res.status(200).send(user);
    })
    .catch((error) => {
      if (error.name === "CastError") {
        res.status(400).send({ message: "Некорректные данные" });
      } else {
        res.status(500).send({ message: "Ошибка сервера" });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.send({ name: user.name, about: user.about, avatar });
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        res.status(400).send({ message: "Некорректные данные" });
      } else {
        res.status(500).send({ error: "Ошибка сервера" });
      }
    });
};

const updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  console.log(req.body);
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      console.log(user);
      res.send({ data: user });
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        res.status(400).send({ message: "Введите от 2 до 40 символов" });
      } else if (error.name === "NotFound") {
        res.status(404).send({ message: "Ресурс не найден" });
      } else {
        res.status(500).send({ error: "Ошибка сервера" });
      }
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        res.status(400).send({ message: "Некорректный URL" });
      } else if (error.name === "NotFound") {
        res.status(404).send({ message: "Ресурс не найден" });
      } else {
        res.status(500).send({ error: "Ошибка сервера" });
      }
    });
};

module.exports = {
  getUsers,
  getuser,
  createUser,
  updateUserInfo,
  updateUserAvatar,
};
