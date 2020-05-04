const express = require("express");
const articleRouter = require("./routes/articles");

// connect mongodb
const mongoose = require("mongoose");
const Article = require("./models/articlesModel");
const methodOverride = require("method-override");

const app = express();

//connect mongodb
mongoose.connect("mongodb://localhost/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// reader layout
app.set("view engine", "ejs"); // đang ở folder view

//schema
app.use(express.urlencoded({ extended: false })); // not for parsing application/x-www-form-urlencoded
// instal method-overid use delete, put
app.use(methodOverride("_method"));

// trang index show list blog : vào trang index
app.get("/", async (req, res) => {
  //   res.send("Helll");
  // render het tat cả index (trong views), hiện đang ở folder views
  // const arrArticles = [
  //   {
  //     title: "Test Article",
  //     createAt: new Date(),
  //     description: "Test description",
  //   },
  //   {
  //     title: "Test Article 2",
  //     createAt: new Date(),
  //     description: "Test description 2",
  //   },
  //   {
  //     title: "Test Article 3",
  //     createAt: new Date(),
  //     description: "Test description 3",
  //   },
  // ];
  // desc: lớn -> nhỏ  asc: nhỏ->lớn
  const arrArticles = await Article.find().sort({ createAt: "desc" });
  // index.js trong folder articles
  res.render("articles/index", { articles: arrArticles });
});

// get apis
app.use("/articles", articleRouter);

app.listen(5000);
