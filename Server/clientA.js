// tạo biến mqtt sử dụng các chức năng của module mqtt
var mqtt = require('mqtt');
// tạo option sử dụng thuộc tính connect để kết nối đến broket MQTT 
var options = {
    port: 15572,
    host: 'mqtt://hairdresser.cloudmqtt.com',
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: 'qiiwyeiv',
    password: 'X4hvcjgbyUit',
    keepalive: 60,
    reconnectPeriod: 1000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clean: true,
    encoding: 'utf8'
};
var client = mqtt.connect('mqtt://hairdresser.cloudmqtt.com', options);

// function có chức năng subscribe 1 topic nếu đã kết nối thành công đến broker
client.on('connect', function() {
    console.log('Client A connected')
    // client subcribe topic /client-a/sub
    client.subscribe('/client-a/sub')
})
// function có chức năng gửi 1 gói tin đễn đến topic đã đăng kí
client.on('message', function(topic, message) {
    // in ra màn hình console 1 message ở định dạng string
    console.log(message.toString())
    // publish gói tin 'Hello from client A' đến topic /client-b/sub
    client.publish('/client-b/sub', 'Hello from client A')
    // đóng kết nối của client
    client.end()
})
console.log('Client A started')