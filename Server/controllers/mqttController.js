

module.exports = (clientMQTT) =>{
    clientMQTT.on('connect', function() { 
        console.log('Connected')
        clientMQTT.subscribe('hello/world', function() {
          clientMQTT.on('message', function(topic, message, packet) {
            console.log("Received '" + message + "' on '" + topic + "'");
          });
        });
      
        clientMQTT.publish('tnt1513516', 'my message', function() {
          console.log("Message is published");
          
        });
      });
      clientMQTT.on("error",function(error){ 
        console.log("Can't connect"+error);
      })
      
    
}
