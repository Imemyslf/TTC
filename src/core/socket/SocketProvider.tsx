import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token found, socket not created");
      return;
    }

    console.log("Creating socket with token");

    const newSocket = io("http://localhost:4000", {
      auth: { token },
      autoConnect: true,
    });

    newSocket.on("connect", () => {
      console.log("🔌 Socket connected:", newSocket.id);
    });

    newSocket.on("connect_error", (err) => {
      console.error("Socket auth error:", err.message);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [localStorage.getItem("token")]); // 🔥 important

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
