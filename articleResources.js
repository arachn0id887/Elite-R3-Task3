const mongoose = require("mongoose");

const articleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the name of the article. "],
    },

    info: {
      type: String,
      required: [true, "Please enter information about the article."],
    },

    posted_by: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const article = mongoose.model("article", articleSchema);
module.exports = article;
