
import { io } from 'socket.io-client';
let socket=null;
//import.meta.env.VITE_SOCKET_URL
export const initSocket = () => {
  if (!socket) {
    socket = io(import.meta.env.VITE_SOCKET_URL,{
      withCredentials: true,
      autoConnect: true,
      transports: ['websocket'],
    });
  }
  return socket;
};

export const getSocket = () => socket;
