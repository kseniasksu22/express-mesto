const cardModel = require("../models/card");

const getCards = (req, res) => {
  cardModel
    .find({})
    .populate("creator")
    .then((cards) => {
      res.send(cards);
    })
    .catch(() => {
      res.status(500).send({ error: "Ошибка сервера" });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  cardModel
    .create({ name, link, creator: req.user._id })
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        res.status(400).send({ message: "Некорректный Url или название" });
      } else {
        res.status(500).send({ error: "Ошибка сервера" });
      }
    });
};

const deleteCard = (req, res) => {
  cardModel
    .findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: "Kаточка не найдена" });
        return;
      }
      res.status(200).send(card);
    }).catch((error) => {
      if (error.name === "CastError") {
        res.status(400).send({ message: "Некорректные данные" });
      } else {
        res.status(500).send({ message: "Ошибка сервера" });
      }
    });
};

const likeCard = (req, res) => {
  cardModel
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: "Ресурс не найден" });
        return;
      }
      res.send({ likes: card });
    })
    .catch((error) => {
      if (error.name === "CastError") {
        res.status(400).send({ message: "Некорректные данные" });
      } else {
        res.status(500).send({ message: "Ошибка сервера" });
      }
    });
};

const dislikeCard = (req, res) => {
  cardModel
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: "Ресурс не найден" });
        return;
      }
      res.send({ likes: card });
    })
    .catch((error) => {
      if (error.name === "CastError") {
        res.status(400).send({ message: "Некорректные данные" });
      } else {
        res.status(500).send({ message: "Ошибка сервера" });
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
