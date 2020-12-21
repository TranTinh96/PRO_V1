exports.options = {
    port: 8083,
    host: 'mqtt://broker.emqx.io',
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: 'tnt1513516',
    password: 'tnt1513516',
    keepalive: 60,
    reconnectPeriod: 1000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clean: true,
    encoding: 'utf8'
  };