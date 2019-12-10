var mongoose=require("mongoose");

//create schema
var Schema=mongoose.Schema;

var ArticleSchema= new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    date: {
        type: Date
    },
    saved: {
        type: Boolean,
        default: false
    }
});

var Article=mongoose.model("Article", ArticleSchema);

//export model
module.exports = Article;