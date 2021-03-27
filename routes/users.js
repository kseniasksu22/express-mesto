const router = require("express").Router();
const {
  getUsers,
  getuser,
  updateUserInfo,
  updateUserAvatar,
  login,
  getCurrentUser,

} = require("../controllers/users.js");
const { userInfoValidalidator, avatarValidator } = require("../middlewares/validator");

router.get("/users", getUsers);
router.get("/users/:userId", getuser);
router.get("/users/me", getCurrentUser);
router.patch("/users/me", userInfoValidalidator, updateUserInfo);
router.patch("/users/me/avatar", avatarValidator, updateUserAvatar);
router.post("/signin", login);

module.exports = router;
