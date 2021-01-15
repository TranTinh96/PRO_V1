
module.exports = (clientMQTT, _idProject) => {
  console.log("Server Connected MQTT with :  " + _idProject);
   if(clientMQTT && _idProject){
    clientMQTT.subscribe(_idProject, function () {
      
    });
   }
  clientMQTT.on("error", function (error) {
    console.log("Can't connect" + error);
  });
};
