const express = require("express");
const route = express.Router();

const Author = require("../models/authors");

route.get("/", async (req, res) => {
  const searchOptions = {};
  if (req.query.name !== null && req.query.name)
    searchOptions.name = req.query.name;
  try {
    const authors = await Author.find(searchOptions);
    res.render("authors/index", { authors, searchOptions });
  } catch (error) {
    res.redirect("/");
  }
});

route.get("/new", (req, res) => {
  res.render("authors/new", { author: {} });
});

route.post("/new", async (req, res) => {
  const name = req.body.name;

  try {
    const newAuthor = new Author({ name });
    await newAuthor.save();
    // res.redirect(`authors/${newAuthor._id}`)
    res.redirect("/");
  } catch (error) {
    res.render("authors/new", { author: {}, errorMessage: error.message });
  }
});

module.exports = route;
