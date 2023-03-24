const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/wikiDB", {
    useNewUrlParser: true,
});

const articleSchema = {
    title: String,
    content: String,
};

const Article = mongoose.model("Article", articleSchema);

//Request targeting all articles
app.route("/articles")
    .get(function (req, res) {
        Article.find()
            .then((foundArticles) => {
                res.send(foundArticles);
            })
            .catch((err) => {
                console.log(err);
            });
    })
    .post(function (req, res) {
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content,
        });

        newArticle.save((err) => {
            if (!err) {
                res.send("Successfully added a new article.");
            } else {
                res.send(err);
            }
        });
    })
    .delete(function (req, res) {
        Article.deleteMany()
            .then(() => {
                res.send("Successfully deleted all articles.");
            })
            .catch((err) => {
                res.send(err);
            });
    });

//Request targeting a specific article
app.route("/articles/:articleTitle")
    .get(function (req, res) {
        Article.findOne({ title: req.params.articleTitle })
            .then((foundArticle) => {
                if (foundArticle) {
                    res.send(foundArticle);
                } else {
                    res.send("No articles matching that title was found.");
                }
            })
            .catch((err) => {
                res.send(err);
            });
    })
    .put(function (req, res) {
        Article.findOneAndUpdate(
            { title: req.params.articleTitle },
            { title: req.body.title, content: req.body.content },
            { overwrite: true }
        )
            .then(() => {
                res.send("Successfully updated article.");
            })
            .catch((err) => {
                console.log(err);
            });
    })
    .patch(function (req, res) {
        Article.findOneAndUpdate(
            { title: req.params.articleTitle },
            { $set: req.body }
        )
            .then(() => {
                res.send("Successfully updated article.");
            })
            .catch((err) => {
                console.log(err);
            });
    })
    .delete(function (req, res) {
        Article.findOneAndDelete({ title: req.params.articleTitle })
            .then(() => {
                res.send("Successfully deleted the corresponding article.");
            })
            .catch((err) => {
                console.log(err);
            });
    });

app.listen(3000, function () {
    console.log("Server started on port 3000");
});
