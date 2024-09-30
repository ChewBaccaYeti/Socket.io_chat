import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import {
  Container,
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
} from '@mui/material';

export default function Chat() {
  const port = 'http://localhost:4000';
  const [socket] = useState(() => io(port)); // Подключение к WebSocket-серверу
  const [users, setUsers] = useState({});
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState('Anonymous');
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('user', (data) => {
      setUsers(data);
    });

    socket.on('message', (message) => {
      setMessages((prevMessage) => [message, ...prevMessage.slice(0, 9)]); // restriction from 10 messages only
    });
    // Отписываемся от событий при размонтировании компонента
    return () => {
      socket.off('user');
      socket.off('message');
    };
  }, [socket]);

  // Функция отправки сообщения
  const sendMessage = () => {
    if (message.trim() && name.trim()) {
      socket.emit('message', { name, message }); // Отправка сообщения на сервер
      setMessage(''); // Очистка поля ввода сообщения
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <Container maxWidth="lg" style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Chat
      </Typography>
      <Box display="flex">
        <Box flex={1} mr={2}>
          <Typography variant="h6">Users in chat</Typography>
          <Paper style={{ maxHeight: 300, overflow: 'auto' }}>
            <List>
              {Object.values(users).map((user, index) => (
                <ListItem key={index}>
                  <ListItemText primary={user} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
        <Box flex={2}>
          <Box mb={2} display="flex" alignItems="center">
            <TextField
              label="Your nickname"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ marginRight: '1rem' }}
            />
            <TextField
              label="Enter your message"
              variant="outlined"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              style={{ flexGrow: 1, marginRight: '1rem' }}
            />
            <Button variant="contained" color="primary" onClick={sendMessage}>
              Send
            </Button>
          </Box>
          <Box>
            {messages.map((msg, index) => (
              <Box key={index} mb={2}>
                <Typography variant="body1" color="primary">
                  {msg.name}
                </Typography>
                <Typography variant="body2">{msg.message}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <script src="/socket.io/socket.io.js"></script>
    </Container>
  );
}
