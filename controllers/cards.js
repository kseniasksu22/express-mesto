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
      res.send({ message: "Вы удалили каточку" });
    })
    .catch(() => {
      res.status(500).send({ error: "Ошибка сервера" });
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
      res.send({ likes: card });
    })
    .catch(() => {
      res.status(500).send({ error: "Ошибка сервера" });
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
      res.send({ likes: card });
    })
    .catch(() => {
      res.status(500).send({ error: "Ошибка сервера" });
    });
};

module.exports = { getCards, createCard, deleteCard, likeCard, dislikeCard };
