module.exports = (client) =>{
    client.on('connect', function() { 
        console.log('Connected')
        client.subscribe('hello/world', function() {
          client.on('message', function(topic, message, packet) {
            console.log("Received '" + message + "' on '" + topic + "'");
          });
        });
      
        client.publish('tnt1513516', 'my message', function() {
          console.log("Message is published");
          client.end(); 
        });
      });
      client.on("error",function(error){ 
        console.log("Can't connect"+error);
      })
      
    
}
