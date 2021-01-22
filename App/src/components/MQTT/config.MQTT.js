module.exports={
        host : "wss://hairdresser.cloudmqtt.com",
        options : {
            port: 35572,
            host: "wss://hairdresser.cloudmqtt.com",
            username: "qiiwyeiv",
            password: "X4hvcjgbyUit",
            clientId: "mqttjs_" + Math.random().toString(16).substr(2, 8),
            keepalive: 60,
            protocolId: "MQIsdp",
            protocolVersion: 3.1,
            clean: true,
            reconnectPeriod: 10000,
            connectTimeout: 30 * 1000,
            will: {
              topic: 'WillMsg',
              payload: 'Connection Closed abnormally..!',
              qos: 2,
              retain: false
            },
            rejectUnauthorized: false,
          }         
} 