const express = require("express");
const Article = require("../models/articlesModel");
const router = express.Router();

router.get("/new", (req, res) => {
  // res.send("In a articles");
  res.render("articles/new", { articles: new Article() });
});

router.get("/edit/:id", async (req, res) => {
  const objArticle = await Article.findById(req.params.id);
  res.render("articles/edit", { articles: objArticle });
});

// router.get("/:id", async (req, res) => { // luc dau dung id
router.get("/:slug", async (req, res) => {
  // res.send(req.params.id);
  // const objArticle = await Article.findById(req.params.id); //id: tim id trong mang do
  const objArticle = await Article.findOne({ slug: req.params.slug });
  if (objArticle === null) res.redirect("/");
  res.render("articles/show", { articles: objArticle });
});

//create
router.post(
  "/",
  async (req, res, next) => {
    // let objArticle = new Article({
    //   title: req.body.title,
    //   description: req.body.description,
    //   markdown: req.body.markdown,
    // });
    // try {
    //   objArticle = await objArticle.save();
    //   // res.redirect(`/articles/${objArticle.id}`); // luc dau dung id
    //   res.redirect(`/articles/${objArticle.slug}`);
    // } catch (error) {
    //   console.log(error);
    //   res.render("articles/new", {
    //     articles: objArticle,
    //   });
    // }
    req.articles = new Article();
    next();
  },
  onSaveArticleRedirect("new")
);

//delete
router.delete("/:id", async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

//update

router.put(
  "/:id",
  async (req, res, next) => {
    req.articles = await Article.findById(req.params.id);
    next();
  },
  onSaveArticleRedirect("edit")
);

function onSaveArticleRedirect(path) {
  return async (req, res) => {
    let objArticle = req.articles;
    objArticle.title = req.body.title;
    objArticle.description = req.body.description;
    objArticle.markdown = req.body.markdown;
    try {
      objArticle = await objArticle.save();
      // res.redirect(`/articles/${objArticle.id}`); // luc dau dung id
      res.redirect(`/articles/${objArticle.slug}`);
    } catch (error) {
      console.log(error);
      res.render(`articles/new/${path}`, {
        articles: objArticle,
      });
    }
  };
}

module.exports = router;
