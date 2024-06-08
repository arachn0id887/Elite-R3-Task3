const express = require("express");
const router = express.Router();
const Article = require("./model.js");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/article", async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: "desc" });
    res.render("all", { articles: articles });
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});

router.get("/article/create", (req, res) => {
  res.render("create", { article: new Article() });
});

router.post("/article/create", async (req, res) => {
  let article = new Article({
    name: req.body.name,
    info: req.body.info,
    posted_by: req.body.posted_by,
  });
  try {
    article = await article.save();
    res.redirect(`/article/${article.id}`);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});

router.get("/article/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (article == null) res.redirect("/");
  res.render("byID", { article: article });
});

router.get("/article/:id", async (req, res) => {
  try {
    const articleId = req.params.id;
    const article = await Article.findById(articleId);
    if (!article) {
      res.send("Article does not exist.");
    }
    res.render("byID", { article: article });
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});

router.get("/article/:id/update", async (req, res) => {
  const articleId = req.params.id;
  const article = await Article.findById(articleId);
  if (!article) {
    res.send("Article does not exist.");
  }
  res.render("update", { article: article });
});

router.put("/article/:id/update", async (req, res) => {
  const articleId = req.params.id;
  var article = await Article.findByIdAndUpdate(articleId, req.body);
  article.name = req.body.name;
  article.info = req.body.info;
  article.posted_by = req.body.posted_by;
  article.id = articleId;
  if (!article) {
    return res.status(404).send("Article does not exist.");
  }
  const updatedArticle = await Article.findById(articleId);
  try {
    article = await article.save(updatedArticle);
    res.redirect("/article");
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});

router.get("/article/:id/delete", async (req, res) => {
  const articleId = req.params.id;
  const article = await Article.findById(articleId);
  if (!article) {
    res.status(404).send("Article does not exist.");
  }
  res.render("delete", { article: article });
});

router.delete("/article/:id/delete", async (req, res) => {
  try {
    const articleId = req.params.id;
    const article = await Article.findByIdAndDelete(articleId);
    if (!article) {
      return res.send("Article does not exist.");
    } else {
      res.redirect("/article");
    }
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});

module.exports = router;
