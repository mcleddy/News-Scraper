const db=require("../models");

module.exports=function (app){
    //getting index
    app.get("/", function(req, res){
        var articleObject={}

        articleObject["articles"]=[]
        db.Article.find({$query: {saved: false}}).sort({date: -1})
        .then(function(found){
            if (found.length > 0){
                for (let i=0; i < found.length; i++){
                    console.log(found[i]);

                    newObject={
                        id: found[i]._id,
                        title: found[i].title,
                        summary: found[i].summary,
                        link: found[i].link,
                        photo: found[i].photo,
                        saved: found[i].saved,
                        comments: found[i].comments
                    }
                    articleObject.articles.push(newObject);
                    if (i==(found.length -1)) {
                        res.render("index", articleObject)
                    }
                }
            }
            else{
                res.render("index")
            }
        });
    });

    //get saved articles
    app.get("/saved", function(req, res){
        var articleObject={}

        articleObject["articles"]=[]
        db.Article.find({$query: {saved: true}}).sort({date: -1})
        .then(function(found){
            if (found.length > 0){
                for (let i=0; i < found.length; i++){
                    console.log(found[i]);

                    newObject={
                        id: found[i]._id,
                        title: found[i].title,
                        summary: found[i].summary,
                        link: found[i].link,
                        photo: found[i].photo,
                        saved: found[i].saved,
                        comments: found[i].comments
                    }
                    articleObject.articles.push(newObject);
                    if (i==(found.length -1)) {
                        res.render("index", articleObject)
                    }
                }
            }
            else{
                res.render("saved")
            }
        });
    });



}