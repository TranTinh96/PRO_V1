
var Project = require("../api/models/project.model");;
var cabinAlarm = require("../api/models/cabinAlarms.model");
var cabinRelay = require("../api/models/cabinRelay.model");

var middlewareAlarm = require("../api/middlewares/alarm.Middleware");
var func = require("../middlewares/func.Middleware");


module.exports = (io,clientMQTT) => {
    io.on('connection', socket => {

        clientMQTT.on("message", function (topic, message, packet) {
            if (topic) {
              Project.getByTokenProject(topic, (err, project) => {
                if (!err && !func.checkNull(project)) {
                  var payload = message.toString();
                  io.sockets.emit(topic,payload )
                }
          });
        }
    });
    })
}
        

