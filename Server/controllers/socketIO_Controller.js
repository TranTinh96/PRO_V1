module.exports = (io)=>{
    io.on('connection', function(socket) {
        console.log("Connect socket succes !")
        socket.on('message', function(message) {
            socket.emit('ditConsumer',message.value);
            console.log('from console',message.value);
        });
    });
}