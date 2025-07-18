import { Server } from 'socket.io';
import { addRandomScore, createNewUser, getAllUsers } from '../services/users.services.js';

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "https://w3assignment.vercel.app",
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', async (socket) => {
    console.log(' Socket connected:', socket.id);


    const users = await getAllUsers() || [];
    socket.emit('initial-users', { users }); // consistent with frontend



    // Handle user creation
    socket.on('create-new-user', async ({ username }) => {
      const res = await createNewUser(username);
      if (res.success) {
        const users = await getAllUsers() || [];
        io.emit('update-leaderboard', { users }); //  send to all clients
      } else {
        socket.emit('error-message', { message: 'Failed to create user' });
      }
    });




    // Handle random score addition
    socket.on('add-random-point', async ({ userId }) => {
      const res = await addRandomScore(userId);
      if (res.success) {
        const users = await getAllUsers() || [];
        io.emit('update-leaderboard', { users }); //  broadcast update
      } else {
        socket.emit('error-message', { message: 'Failed to add score' });
      }
    });

    socket.on('disconnect', () => {
      console.log('❌ Socket disconnected:', socket.id);
    });
  });
};

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
};
