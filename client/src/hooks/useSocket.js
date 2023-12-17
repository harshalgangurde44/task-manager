import { useEffect, useState } from "react";
import socketio from "socket.io-client";

const BACKEND_URL = process.env.REACT_APP_API_PATH;

export const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = socketio.connect(BACKEND_URL);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return socket;
};
