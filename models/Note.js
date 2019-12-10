
var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new noteSchema object
var NoteSchema = new Schema({
  // The headline is the article associate with the note
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
var Note=mongoose.model("Note",  NoteSchema);

module.exports=Note;