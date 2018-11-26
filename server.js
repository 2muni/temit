const server = require('http').Server();

const Redis = require('ioredis');
const redis = new Redis();

const io = require('socket.io')(server)

redis.psubscribe('*');

redis.on('pmessage', (pattern, channel, message) => {
    message = JSON.parse(message);

    console.log(message);
    io.emit(channel + ':' + message.event, message.data)
});

server.listen(3000);

console.log('Server started');

