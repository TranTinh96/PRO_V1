var options = {
    port: process.env.MQTT_PORT ,
    clientId: 'Client_01',
    username: process.env.MQTT_USER,
    password: process.env.MQTT_PASSWORD,
    connectTimeout: 30 * 1000,
    keepalive: 60,
    reconnectPeriod: 1000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clean: true,
    encoding: 'utf8',
    
};

module.exports = options;
