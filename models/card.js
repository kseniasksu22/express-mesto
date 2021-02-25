const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return /(http|https):\/\//.test(link);
      },
    },
  },
  likes: [
    {
      default: [],
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  createdAt: {
    type: Date,
  },
});

module.exports = mongoose.model("card", cardSchema);
