const path = require("path");
const getDataFromFile = require("../helpers/files");

const cardsDataPath = path.join(__dirname, "..", "data", "cards.json");

const getCards = (req, res) => {
  getDataFromFile(cardsDataPath)
    .then((cards) => res.status(200).send(cards))
    .catch(() => {
      res.status(500).send({ error: "Ошибка сервера" });
    });
};

module.exports = getCards;
