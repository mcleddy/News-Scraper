//scraping dependencies
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models")

module.exports = function (app) {

    //post route
    app.post("/api/scrape", function (req, res) {
        axios.get("https://www.rockpapershotgun.com/").then(function (res) {
            var $ = cheerio.load(response.data);
            //get article elements
            $("article.item").each(function (i, element) {
                let title = $(element).find('.item-info').find('.title').find('a').text();
                let summary = $(element).find('.item-info').find('.teaser').find('a').text();
                let link = $(element).find('.item-info').find('.title').children().attr("href");
                let photo = $(element).find('.item-image').find('.imagewrap').find('img').attr("src");
                let data = $(element).find('.item-info').find('.teaser').find('a').find('time').attr("datetime");

                let result = {
                    title: title,
                    summary: summary,
                    link: link,
                    photo: photo,
                    date: date
                }

                //make new article
                db.Article.create(result)
                    .then(function (dbArticle) {
                        console.log(dbArticle);
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            });
            res.send("Scrape is done");
        });
    });
    //route for getting articles
    app.get("/api/all", function (req, res) {
        db.Article.find({
            $query: {
                saved: false
            }
        }).sort({
            date: -1
        })
            .then(function (response) {
                res.json(response.length)
            })
    });

    //route for getting all articles from the database
    app.get("/api/articles", function(req, res){
        db.Article.find({})
        .then(function(dbArticle){
            res.json(dbArticle);
        })
        .catch(function(err){
            res.json(err)
        });
    });
    //route for getting a specific article by id
    app.get("/api/articles/:id", function(req, res){
        db.Article.findOne({_id: req.params.id})
        .populate("note")
        .then(function(dbArticle){
            res.json(dbArticle);
        })
        .catch(function(err){
            res.json(err);
        });
    });

    //route for saving and updating comment
    app.post("/api/articles/:id", function(req, res){
        db.Note.create(req.body)
        .then(function(dbNote){
            return db.Article.findOneAndUpdate({_id: req.params.id}, {note: dbNote._id}, {new: true});
        })
        .then(function(dbArticle){
            res,json(dbArticle);
        })
        .catch(function(err){
            res.json(err);
        });
    });

    //save article
    app.put("/api/save/article/:id", (req, res)=> {
        let articleId= req.params.id;
        db.Article.findOneAndUpdate({
            _id: articleId
        }, {
            $set: {
                saved: true
            }
        }).then(function (result){
            res.json(result)
        })
    });

    //delete article
    app.put("/api/delete/article/:id", (req, res)=> {
        let articleId= req.params.id;
        db.Article.findOneAndUpdate({
            _id: articleId
        }, {
            $set: {
                saved: false
            }
        }).then(function (result){
            res.json(result)
        })
    });

    //route to find a comment
    app.get("/api/notes/:id", (req, res)=>{
        let articleId=req.params.id;
        db.Article.findOne({
            _id: articleId
        })
        .populate('note')
        .then((result)=> {
            console.log("api result" +result );
            res.json(result)
        })
    });

    //route for making new comments
    app.post("/api/create/notes/:id", (req, res)=> {
        db.Note.create(req.body)
        .then(function(dbNote){
            return db.Article.findOneAndUpdate({
                _id: req.params.id
            }, {
                note: dbNote._id
            }, {
                new: true
            });
        }).then(function (result){
            res.json(result);
        }).catch(function (err){
            res.json(err);
        });
    })
    //delete
    app.delete("/api/reduce", (req, res)=> {
        db.Article.find({
            $query: {
                saved: false
            }
        }).sort({
            date: -1
        })
        .then((found)=> {
            console.log(found.length);
            let countLength = found.length;
            let overflow = countLength - 20;
            console.log(overflow);
            let overflowArray =[];

            for (var i=0; i< (overflow); i++){
                overflowArray.push(found[20 + i]._id);
                console.log(overflowArray)
            }
            db.Article.remove({
                _id: {
                    $in: overflowArray
                }
            }, (error, result)=>{
                result["length"]= countLength;
                console.log(result);
                res.json(result)
            })
        });
    })
    //delete Article document from database
    app.get("/api/clear", function(req, res){
        db.Article.remove()
            .then(function (){
                res.json("documents removed")
            })
    });

} 