var options = {
    port: process.env.MQTT_PORT,
    host: process.env.MQTT_SERVER,
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: process.env.MQTT_USER,
    password: process.env.MQTT_PASSWORD,
    keepalive: 60,
    reconnectPeriod: 1000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clean: true,
    encoding: 'utf8'
  };

module.exports = options;
