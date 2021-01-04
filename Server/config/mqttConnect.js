
module.exports = (clientMQTT, _idProject) => {
  clientMQTT.on("connect", function () {
    //* Check null Array Project
      clientMQTT.subscribe(_idProject, function () {
      });
  });
  clientMQTT.on("error", function (error) {
    console.log("Can't connect" + error);
  });
};
