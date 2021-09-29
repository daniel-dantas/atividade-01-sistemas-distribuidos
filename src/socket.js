const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const connectSockets = async (io) => {
    await client.connect();
    const db = client.db('myProject');
    const collection = db.collection('messages');

    io.on('connection', async (socket) => {
        let messages = await collection.find().sort({ time: 1 }).toArray();
        socket.emit("previousMessages", messages);
    
        socket.on("sendMessage", async (data) => {
            await collection.insertOne({ ...data });
            socket.broadcast.emit('receivedMessage', data);
        });
    })
}

module.exports = {
    connectSockets
}
