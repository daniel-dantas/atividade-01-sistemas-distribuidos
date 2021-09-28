

const connectSockets = (io) => {

    let messages = [];

    io.on('connection', socket => {
        socket.emit("previousMessages", messages);
    
        socket.on("sendMessage", data => {
            messages.push(data);
            socket.broadcast.emit('receivedMessage', data);
        });
    })
}

module.exports = {
    connectSockets
}
