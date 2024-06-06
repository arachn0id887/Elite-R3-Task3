const mongoose = require("mongoose");

const articleSchema = mongoose.Schema(
  {  name: {  type: String, required: true,   },
  info: {   type: String,   required: true, },
 posted_by: {  type: String,  required: true,  },
    posted_at: {  type: Date, default: Date.now(),
    },  last_updated_at: { type: Date, default: Date.now(),  },
  },
  {
    timestamps: true,
  }
);

const article = mongoose.model("article", articleSchema);
module.exports = article;
