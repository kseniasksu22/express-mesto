const router = require("express").Router();
const { getCards, createCard, deleteCard } = require("../controllers/cards.js");

router.get("/cards", getCards);
router.post("/cards", createCard);
router.delete("/cards", deleteCard);

module.exports = router;
