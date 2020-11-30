var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
var passport = require("passport")
var morgan = require('morgan')
var cors = require('cors')
//Mongoose
const mongoose = require('mongoose');

//Require
require('dotenv').config();
require("./config/passport")


var app = express();
var authRouter = require('./routers/auth.router');
var projectRouter = require('./api/routers/project.router');

app.use(express.json());
app.use(morgan("dev"))
app.use(cors())
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize());


//Connect MongoDB
mongoose.connect(process.env.MongoDB_URL, { useNewUrlParser: true }, function (err, data) {
  if (err) throw err;
  console.log("Database connect")
});

app.use('/profile', authRouter)
app.use('/api/manage', passport.authenticate('jwt', { session: false }),projectRouter)

app.get("/user",(req,res)=>{
  res.json({
      name :"Tran Tinh"
  })
})

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


module.exports = app;
