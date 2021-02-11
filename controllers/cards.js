const path = require("path");
const getDataFromFile = require("../helpers/files");

const cardsDataPath = path.join(__dirname, "..", "data", "cards.json");

const getCards = (req, res) => {
  return getDataFromFile(cardsDataPath)
    .then((data) => res.status(200).send(data))
    .catch((error) => res.status(500).send({ message: error.message }));
};

module.exports = getCards;
