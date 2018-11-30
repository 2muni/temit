const express = require('express');

const app = express();
const server = app.listen(3000);

const Redis = require('ioredis');
const redis = new Redis();

const io = require('socket.io')(server, {
  path: '/socket/chat/socket.io/'
})

redis.psubscribe('*');

redis.on('pmessage', (pattern, channel, message) => {
    message = JSON.parse(message);

    console.log(message);
    io.emit(channel + ':' + message.event, message.data)
});

console.log('Server started');

