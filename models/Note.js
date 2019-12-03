
var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new commentSchema object
// This is similar to a Sequelize model
var commentSchema = new Schema({
  // The headline is the article associate with the comment
  _articleId: {
    type: Schema.Types.ObjectId,
    ref: "Article"
  },
  _articleTitle: {
  	type: String
  }, 
  title: {
  	type: String
  }, 
  body: {
    type: String
  }
});
var comment=mongoose.model("comment", commentSchema);

module.exports=comment;