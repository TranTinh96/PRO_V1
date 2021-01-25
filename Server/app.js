const express = require('express');
const path = require('path');
const mqtt = require("mqtt");
const bodyParser = require('body-parser');
const passport = require("passport");
const morgan = require('morgan');
const cors = require('cors');

const mongoose = require('mongoose');

const socketio = require("socket.io"); 

require('dotenv').config();
require("./config/passport")

var app = express();
var authRouter = require('./routers/auth.router');
var projectRouter = require('./api/routers/project.router');
var cabinRouter = require('./api/routers/cabin.router')
var {checkAccoutAdmin ,createAccoutAdmin} = require("./config/accoutAdmin")
var options = require("./config/mqttBroker")

const server = require('http').createServer(app); 

app.use(express.json());
app.use(morgan("dev"))
app.use(cors())
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize());



//mongoose.connect(process.env.MongoDB_URL|| 'mongodb://localhost/ProjectID', 
mongoose.connect(process.env.MongoDB_URL_LOCAL, 
{ 
  useNewUrlParser: true,
  useUnifiedTopology: true
},
 function (err, db) {
  if (err) throw err;
  let checkAccout=checkAccoutAdmin();
  checkAccout.then(function(result) {
     if(result){
       createAccoutAdmin();
     }
 })
});


//Connect Cloud MQTT
var clientMQTT = mqtt.connect(process.env.MQTT_SERVER,options);
var io = socketio(server); 
var Project = require("./api/models/project.model");
var func  = require("./middlewares/func.Middleware")

Project.getAllProject((err,project)=>{
  if(err){

  }else{
    if( !func.checkNull(project)){
      for (let i = 0; i < project.length; i++) {
       var arrayProject = project[i].tokenProject
  
       require("./config/mqttConnect")(clientMQTT ,arrayProject);
      }
    }
  }
})

require("./controllers/mqttController")(clientMQTT );

  
// Create the Socket IO server on  

require("./controllers/socketIO_Controller")(io ,clientMQTT);




app.use('/profile', authRouter)

app.use('/api/manage', passport.authenticate('jwt', { session: false }),projectRouter)
app.use('/api/cabin', passport.authenticate('jwt', { session: false }),cabinRouter)


app.get('/*', async (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


module.exports = { app: app, server: server }; 