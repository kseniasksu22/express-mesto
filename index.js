const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;
const path = require("path");
const parser = require("body-parser");
const usersRouter = require("./routes/users.js");
const cardsRouter = require("./routes/cards.js");

mongoose
  .connect("mongodb://localhost:27017/mestodb", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("database loooooooooool");
  });
app.use(express.static(path.join(__dirname, "public")));
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    _id: "60365e2ef06d774e0c6c2728",
  };

  next();
});
app.use("/", usersRouter);

app.use("/", cardsRouter);

app.use((req, res) => {
  res.status(404).send({ message: "Запрашиваемый ресурс не найден" });
});

app.listen(PORT, () => {
  console.log(`app listen on ${PORT}`);
});
