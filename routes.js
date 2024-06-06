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
  res.render("create");
});
router.post("/article/create", (req, res) => {
  res.redirect("index");
  console.log(req.body);
});
router.get("/article/:id", (req, res) => {
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
    const art = await art.findByIdAndDelete(id);
  } catch (error) {
    res.status(404);
  }
});

module.exports = router;
