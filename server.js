/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
require('dotenv').config(); // Загрузка переменных окружения из .env файла
const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);
const PORT = process.env.SERVER_PORT;
const io = require('socket.io')(server, {
  cors: {
    origin: process.env.CLIENT_PORT,
    methods: ['GET', 'POST', 'PATCH'],
  },
});

// Поднятие сервера на порту, указанном в .env файле
server.listen(PORT, () => {
  console.log(`Server running in ${PORT}`);
});

app.use(cors({ origin: process.env.CLIENT_PORT })); // Подключение CORS для возможности работы с другим доменом/портом
app.use(express.static(__dirname + '/public')); // Статические файлы

const users = {};

io.sockets.on('connection', (client) => {
  const broadcast = (event, data) => {
    client.emit(event, data);
    client.broadcast.emit(event, data);
  };

  broadcast('user', users);

  client.on('message', (message) => {
    if (users[client.id] !== message.name) {
      users[client.id] = message.name;
      broadcast('user', users);
    }

    broadcast('message', message);
  });

  client.on('disconnect', () => {
    delete users[client.id];
    client.broadcast.emit('user', users);
  });
});
