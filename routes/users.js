const router = require("express").Router();
const {
  getUsers,
  getuser,
  createUser,
  updateUserInfo,
  updateUserAvatar,
} = require("../controllers/users.js");

router.get("/users", getUsers);
router.get("/users/:id", getuser);
router.post("/users", createUser);
router.patch("/users/me", updateUserInfo);
router.patch("/users/me/avatar", updateUserAvatar);
module.exports = router;
