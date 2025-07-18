import express from 'express';
import http from 'http';
import cors from 'cors';
import { initSocket } from './socket/socket.js';
import connectDB from './lib/db.js';
const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// MongoDB connection
connectDB();

// Initialize socket.io
initSocket(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
