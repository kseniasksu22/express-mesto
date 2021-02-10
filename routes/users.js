const router = require("express").Router();

const { getUsers, getuser } = require("../controllers/users.js");

router.get("/users", getUsers);

router.get("/users/:id", getuser);

module.exports = router;
