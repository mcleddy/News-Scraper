//dependencies
var express=require("express");
var exphbs=require("express-handlebars");
var bodyParser=require("body-parser");
var logger=require("morgan");
var mongoose=require("mongoose");

var db=require("./models");

var PORT=process.env.Port || 3000;

//establish use of database
// var MONGODB_URI = process.env.MONGODB_URI 

//initialize express and express-hanldebars
var app=express();
app.use(bodyParser).urlencoded({extended: true});

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger("dev"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

//use mongo database
mongoose.Promise=Promise;
mongoose.connect(MONGODB_URI,{
});


require("./routes/index")(app)


app.listen(PORT, function() {
    console.log("running on port "+PORT);
});