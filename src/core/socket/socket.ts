import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found");
  }

  socket = io("http://localhost:4000", {
    auth: {
      token,
    },
  });

  return socket;
};

export const getSocket = () => socket;