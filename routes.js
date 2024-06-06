const express = require("express");
const router = express.Router();
const article = require("./articleResources");
router.use(express.static("style.css"));
router.get("/", (req, res) => {
  res.render("index");
});
router.get("/article", (req, res) => {
  res.render("articles");
});
router.get("/article/create", (req, res) => {
  res.render("create", { article: new article() });
});

router.post("/article/create", async (req, res) => {
  res.redirect("index");
  console.log(req.body);
  try {
    article = await article.save();
    res.redirect(`/article/${article.id}`);
  } catch (err) {
    console.log(err);
  }
});

router.get("/article/:id", async (req, res) => {
  await article.findById(req.params.id);
  res.render("get");
});
router.get("/article/:id/update", (req, res) => {
  res.render("update");
});
router.post("/article/:id/update", (req, res) => {
  res.redirect("index");
  window.alert("You have updated the article successfully.");
  console.log(req.body);
});
router.get("/article/:id/delete", (req, res) => {
  res.render("delete");
});
router.post("/article/:id/delete", (req, res) => {
  res.redirect("index");
  window.alert("You have deleted the article successfully.");
  console.log(req.body);
});
router.delete("/article/:id/delete", async (req, res) => {
  try {
    const { id } = req.params;
    await art.findByIdAndDelete(id);
  } catch (err) {
    res.status(404);
    console.log(err)
  }
  res.redirect("index");
});
article.name = req.body.name;
article.info = req.body.info;
article.posted_by = req.body.posted_by;
article.posted_at = new Date();
article.last_updated_at = new Date();

module.exports = router;
