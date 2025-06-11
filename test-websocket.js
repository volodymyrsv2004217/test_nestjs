const io = require('socket.io-client');

const socket = io('ws://localhost:3000', {
  transports: ['websocket'],
  forceNew: true,
});

socket.on('connect', () => {
  console.log('Connected to WebSocket server');
});

socket.on('balanceUpdate', (data) => {
  console.log('Received balance update:', data);
});

socket.on('disconnect', () => {
  console.log('Disconnected from WebSocket server');
});

socket.on('error', (error) => {
  console.error('WebSocket error:', error);
});

socket.on('connect_error', (error) => {
  console.error('Connection error:', error);
});
