var express = require('express');
var path = require('path');
var mqtt = require("mqtt");
var bodyParser = require('body-parser');
var passport = require("passport");
var morgan = require('morgan');
var cors = require('cors');
//Mongoose
const mongoose = require('mongoose');
var socketio = require("socket.io"); 

//Require
require('dotenv').config();
require("./config/passport")


var app = express();
var authRouter = require('./routers/auth.router');
var projectRouter = require('./api/routers/project.router');
var {checkAccoutAdmin ,createAccoutAdmin} = require("./config/accoutAdmin")
var options = require("./config/mqttBroker")

// Create the http server 
const server = require('http').createServer(app); 

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
  console.log("Database connection")
  let checkAccout=checkAccoutAdmin();
  checkAccout.then(function(result) {
     if(result){
       createAccoutAdmin();
     }
 })
});
mongoose.Promise = global.Promise;
  
// Create the Socket IO server on  
var io = socketio(server); 

//Connect Cloud MQTT
var client = mqtt.connect(process.env.MQTT_SERVER,options);

require("./controllers/mqttController")(client);
require("./controllers/socketIO_Controller")(io);

app.use('/profile', authRouter)
app.use('/api/manage', passport.authenticate('jwt', { session: false }),projectRouter)
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


module.exports = { app: app, server: server }; 