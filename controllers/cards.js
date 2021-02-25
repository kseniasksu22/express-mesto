const cardModel = require("../models/card");

const getCards = (req, res) => {
  cardModel
    .find({})
    .populate("creator")
    .then((cards) => res.status(200).send(cards))
    .catch(() => {
      res.status(500).send({ error: "Ошибка сервера" });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  cardModel
    .create({ name, link, creator: req.user._id })
    .then((cards) => {
      res.status(200).send({ data: cards });
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        res.status(400).send({ message: "Некорректный Url" });
      } else {
        res.status(500).send({ error: "Ошибка сервера" });
      }
    });
};

const deleteCard = (req, res) => {
  cardModel
    .findByIdAndDelete(req.user._id)
    .then(() => {
      res.status(200).send({ message: "Вы удалили каточку" });
    })
    .catch(() => {
      res.status(500).send({ error: "Ошибка сервера" });
    });
};

module.exports = { getCards, createCard, deleteCard };
