var PROCES = proces.env ;
var options = {
    port: PROCES.MQTT_PORT ,
    host: 'mqtt://'+PROCES.MQTT_SERVER,
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: PROCES.MQTT_USER,
    password: PROCES.MQTT_PASSWORD,
    keepalive: 60,
    reconnectPeriod: 1000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clean: true,
    encoding: 'utf8'
};

module.exports = options;
